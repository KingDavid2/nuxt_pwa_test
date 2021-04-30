<template>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      v-click-outside="onClickOutside"
      clipped
      permanent
      app
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            {{ item.icon }}
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>

export default {

  name: 'LeftDrawer',
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        { icon: 'I', title: 'Lorem ipsum' },
        { icon: 'II', title: 'dolor sit amet' },
        { icon: 'III', title: 'consectetur adipiscing elit' },
      ],
    }
  },
  created() {
  },
  methods: {
    onClickOutside () {
      this.mini = true
    },
  },
}
</script>

<style>

</style>
