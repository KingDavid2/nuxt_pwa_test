<template>
  <v-row>
    <v-col>
      <div id="svg12" ></div>
    </v-col>
    <v-col cols="3">
      <v-btn
        elevation="2"
        @click="generateSVGString"
      >
        Generate New SVG String
      </v-btn>
      <br>
      <v-text-field
        v-model="svgName"
        label="SVG new name"
      ></v-text-field>
      <v-btn
        elevation="2"
        @click="saveSvgFile"
      >
        Download SVG
      </v-btn>
      <v-btn
        elevation="2"
        @click="appendSvgFile"
      >
        Append SVG
      </v-btn>
      <v-file-input
        v-model="newFile"
        id="file-input"
        accept="image/svg+xml"
        @change="onFileChange"
        hide-input
      ></v-file-input>
      <v-btn
        v-if="showColorPicker"
        elevation="2"
        @click="defaultSwatches = !defaultSwatches"
      >
        {{!defaultSwatches ? 'Show default palette' : 'Show all palette '}}
      </v-btn>
      <v-color-picker
        v-if="showColorPicker"
        v-model="color"
        elevation="15"
        show-swatches
        :swatches="defaultSwatches ? swatches : undefined"
        swatches-max-height="300px"
        >
      </v-color-picker>
    </v-col>
  </v-row>
</template>

<script>
import Snap from 'snapsvg-cjs';


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
      hex: null,
      svgName: '',
      newFile:'',
      defaultSwatches: true,
      swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055'],
      ],

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
    },
    generateSVGString(){
      let svg = document.getElementById('svg12').firstElementChild
      console.log(new XMLSerializer().serializeToString(svg));
    },
    saveSvgFile() {
      var markup = this.svg.outerSVG()
      var b64 = btoa(markup);
      var aEl = document.createElement('a');
      aEl.setAttribute('download', this.svgName + '.svg');
      aEl.href = 'data:image/svg+xml;base64,\n' + b64;
      document.body.appendChild(aEl);
      aEl.click();
    },
    appendSvgFile() {
      document.getElementById('file-input').click();
    },
    onFileChange(){
      if (this.newFile == null) return
      let url = window.location.origin + "/svg/" + this.newFile.name
      let temp = Snap.load(url, ( loadedFragment ) => {
                let oldParent = loadedFragment.node.firstElementChild
                let newParent = document.getElementById('svg12').firstElementChild
                while (oldParent.childNodes.length > 0) {
                  newParent.appendChild(oldParent.childNodes[0]);
                }
                });
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
          this[this.type] = v

          let style = this.el.attr().style

          let newStyle = {...this.style2object(style),
                          fill: this[this.type]}
          this.el.attr(newStyle)
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
