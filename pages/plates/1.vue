<template>
  <div>
    <div id="svg12" ></div>
  </div>
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
      el: null
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

  },
  methods: {
    addHandlerToSVG() {
      this.svg.click( ( ev ) => { this.getEventElement( ev ) } )
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

}
</script>
<style scoped>
  svg { top: 0; left: 0; width: 50%; height: 50%; }
  #svg12{
    width: 50%;
  }


</style>
