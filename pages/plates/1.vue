<template>
  <v-row>
    <v-col>
      <div id="svg12" ></div>
    </v-col>
    <v-col>
      <v-color-picker
        v-if="showColorPicker"
        v-model="color"
        elevation="15"
        >
      </v-color-picker>
    </v-col>
  </v-row>
</template>

<script>


export default {
  data() {
    return {
      svg: null,
      highlightRect: null,
      lastSelectedEl: null,
      firstSelectedEl: null,
      activeEl: null,
      clickHandler: null,
      dragging: false,
      el: null,
      svgUpdated: false,
      showColorPicker: false,
      type: 'hex',
      hex: null

      // colorPickerColor: '#000'
    }
  },
  mounted() {
    let Snap = require("snapsvg-cjs");

    let s = Snap("#svg12");

    let l1 = Snap.load("/svg/a1.svg", ( loadedFragment ) => {
                                                s.append( loadedFragment );
                                                this.addHandlerToSVG();
                                        } );
    this.svg = s
    this.setHandlers()
  },

  methods: {
    setHandlers(){
    },
    style2object(style){
      let json = style.split(';').filter(s => s.length)
        .reduce((a, b) => {
           const keyValue = b.split(':');
           a[keyValue[0]] = keyValue[1] ; 
           return a;
    } ,{})
    return json
    },
    addHandlerToSVG() {
      this.svg.click( ( ev ) => {
        this.showColorPicker = false
        this.getEventElement( ev )
      } )
      this.svg.dblclick( ( ev ) => {
        this.getEventElement( ev )
        this.showColorPicker = true
        if( ev.target.localName != 'svg' )
          this.color = this.style2object(Snap(ev.target).attr().style).fill

      } )
    },
    getEventElement( ev ) {
      if( ev.target.localName == 'svg' ) { return; };
      var snapEl = Snap(ev.target);
      this.firstSelectedEl = snapEl;

      this.highlightEl( snapEl );
    },
    highlightEl( el ) {
      if( this.lastSelectedEl ) { this.lastSelectedEl.undrag(); }
      if( this.highlightRect ) { this.highlightRect.remove(); }

      this.highlightRect = Snap().rect( this.rectObjFromBB( el.getBBox(1) ) )
                          .attr({ fill: "none", stroke: "red", strokeDasharray: "5,5" });

      this.highlightRect.transform( el.transform().global.toString() );

      this.lastSelectedEl = el;

      this.el = el

      el.drag( this.dragMove, this.dragStart, this.dragEnd);
    },
    rectObjFromBB ( bb ) {
      return { x: bb.x, y: bb.y, width: bb.width, height: bb.height } 
    },
    dragEnd() {
    },
    dragMove(dx, dy, ev, x, y) {
      var tdx, tdy;
      var snapInvMatrix = this.el.transform().diffMatrix.invert();
      snapInvMatrix.e = snapInvMatrix.f = 0; 
      tdx = snapInvMatrix.x( dx,dy ); tdy = snapInvMatrix.y( dx,dy );

      this.el.attr({ transform: this.el.data('origTransform') + (this.el.data('origTransform') ? "T" : "t") + [ tdx, tdy ] });
      this.highlightRect.transform( this.el.transform().global.toString() );
    },
    dragStart( x,y,ev ) {
        this.el.data('origTransform', this.el.transform().local );
    }
  },
  computed: {
    color: {
      get () {
        console.log(this)
        return this[this.type]
      },
      set (v) {
        if(this.el != null && v != null ){

          let style = this.el.attr().style

          let newStyle = {...this.style2object(style),
                          fill: this[this.type]}
          this.el.attr(newStyle)
          this[this.type] = v
        }
      },
    },
    showColor () {
      if (typeof this.color === 'string') return this.color

      return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
        color[key] = Number(this.color[key].toFixed(2))
        return color
      }, {}), null, 2)
    },

  }

}
</script>
<style scoped>
  svg { top: 0; left: 0; width: 50%; height: 50%; }
  #svg12{
    width: 50%;
  }


</style>
