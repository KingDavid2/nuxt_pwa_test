<template>

   <transition  
      name="test-transition"
    >
    <v-container
      @click="dynamicCol=4"
      v-click-outside="onClickOutside"
      key="1"
      class="grey lighten-5 mb-6 animated"
    >
      <v-row
        align="center"
        no-gutters
        style="height: 150px;"
      >
        <v-col
          :cols="dynamicCol"
        >
          <nuxt-link :to="item[0].link">
            <div
              id="svg1"
              class="svg"
              ></div>
          </nuxt-link>
        </v-col>
        <v-col
          :cols="dynamicCol"
        >
          <nuxt-link :to="item[1].link">
            <div
              id="svg2"
              class="svg"
              ></div>
          </nuxt-link>
        </v-col>
        <v-col
          :cols="dynamicCol"
        >
          <nuxt-link :to="item[2].link">
            <div
              id="svg3"
              class="svg"
              ></div>
          </nuxt-link>
        </v-col>


      </v-row>
    </v-container>
  </transition>

</template>

<script>

export default {
  pageTransition: 'test-transition',

  name: 'LeftDrawer',
  data() {
    return {
      dynamicCol: 4,
      item: [
        {link: "/plates/1"},
        {link: "/plates/2"},
        {link: "/plates/3"}

      ],
    }
  },

  mounted() {
    let Snap = require("snapsvg-cjs");

    for (var i = 1; i <= 3; i++) {
      let s = Snap("#svg" + i);
      let l1 = Snap.load("/svg/a" + i + ".svg", function ( loadedFragment ) {
                                            s.append( loadedFragment );
                                    } );
    }



 
  },
  created() {
  },
  methods: {
    onClickOutside () {
      this.dynamicCol = 12
    },
  },
}
</script>

<style>

  svg { top: 0; left: 0; width: 100%; height: 100%; }

</style>
