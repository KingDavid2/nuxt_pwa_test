<template>
<v-layout wrap v-click-outside="onClickOutside">
  <v-navigation-drawer
    :style="`width: ${mini ? '0' :  '100px'}`"
    v-model="drawer"
    clipped
    app
  >
    <v-list >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="changeDrawer(item.id)"
      >
        <v-list-item-avatar >
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    :style="`margin-left: ${mini ? '0' :  '100px'}`"
    width='500px'
    v-model="drawer"
    :mini-variant.sync="mini"
    
    clipped
    app
  >
    <v-list dense v-if="view == 1" >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        nuxt
        :to="item.link"
      >
        <v-list-item-icon>
          {{ item.number }}
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <LeftDrawerSvg
      v-else-if="view == 2"
    ></LeftDrawerSvg>
  </v-navigation-drawer>

</v-layout>

</template>

<script>
import LeftDrawerSvg from '~/components/LeftDrawerSvg.vue'

export default {
  pageTransition: 'test-transition',

  name: 'LeftDrawer',
  data() {
    return {
      alignments: [
        'start',
        'center',
        'end',
      ],
      view: 1,
      drawer: true,
      mini: true,
      nmini: false,
      items: [
        { id: 1, icon: 'mdi-clock', number: 'I', title: 'Lorem ipsum', link: '/texts/1' },
        { id: 2, icon: 'mdi-account', number: 'II', title: 'dolor sit amet', link: '/texts/2' },
        { id: 3, icon: 'mdi-flag', number: 'III', title: 'consectetur adipiscing elit', link: '/texts/3' },
      ],
      svgFiles: [

      ],
    }
  },
  components: {
    LeftDrawerSvg,
  },
  mounted() {

 
  },
  created() {
  },
  methods: {
    onClickOutside () {
      this.mini = true
      this.nmini = false
    },
    changeDrawer(id) {
      this.view = id
      console.log(this.view)
    },
    showTitle(title) {
      console.log(title)
    }
  },
}
</script>

<style>

</style>
