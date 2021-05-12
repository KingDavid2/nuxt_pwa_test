<template>
<div>

  <div>
    <svg id="svg" ></svg>
    <svg id="svg2"></svg>
  </div>
  <div>
  <div id="place">

    <div id="text">
    <v-card
    class="mx-auto card"
    max-width="600"
  >
    <v-card-title class="cormorant title">
      <h1>
      INTERACTION OF COLOR
      </h1>
    </v-card-title>

    <v-card-subtitle class="cormorant">
      <h2>
      Josef Albers

      </h2>
    </v-card-subtitle>
    <hr class="margin-top">
    <v-card-actions class="pointer-events">
      <v-btn
        color="orange lighten-2"
        text
        nuxt
        link
        to="/"

      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

    <v-btn
        color="orange lighten-2"
        text
      >
        Some other button
      </v-btn>

    </v-card-actions>

  </v-card> 
      <h1>
        
      </h1>
      <h2>
        
      </h2>
    </div>
  </div>

  </div>
</div>
</template>

<script>


export default {
  layout: 'splash',

  transition: 'bounce',


  data() {
    return {
      svg2: null,
      group: null
    }
  },
  mounted() {
    let Snap = require("snapsvg-cjs");

    let s = Snap("#svg");

    let l1 = Snap.load("/lines.svg", function ( loadedFragment ) {
                                                s.append( loadedFragment );
                                        } );
    let svg2 = Snap("#svg2");
    this.svg2 = svg2

    this.group = svg2.group();
    self = this
    let l2 = Snap.load("/lines2.svg", function ( loadedFragment ) {
                                                self.group.append( loadedFragment );
                                                self.group.hover( self.hoverover, self.hoverout );

                                        } );
  },
  methods: {
    hoverover() {
      if (this.group != null)
      this.group.animate({ transform: 't-0,-800' }, 2000, mina.bounce )
    },
    hoverout() {
      if (this.group != null)
      this.group.animate({ transform: 't+0,-800' }, 2000, mina.bounce )
    },
  },

}
</script>
<style>
  #place{
    bottom: 0;
    height: 100px;
    left: 0;
    margin: auto;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    pointer-events: none;
    }
  #text{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    text-align: center;
  }
  .cormorant{
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
  }
  #svg{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  #svg2{
    position: absolute;
    width: 100%;
    height: 200%;
  }
  .pointer-events{
    pointer-events: auto;
  }
  .title{
    font-size: 14px;
    letter-spacing: 0.25em;
  }
  .card{
    padding-top: 40px;
    padding-right: 40px;
    padding-left: 40px;
    padding-bottom: 20px;
    background-color: rgba(256, 256, 256, 0.8) !important;
  }
  .margin-top{
    margin-top: 20px;
  }
</style>
