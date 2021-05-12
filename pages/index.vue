<template>
  <v-row  justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
              <v-btn
        color
        text
        nuxt
        link
        to="/splash"

      >
        splash
      </v-btn>
        <p>
 Lorem ipsum dolor sit
 
 

     <v-tooltip bottom
     v-model="show"
     >
      <template v-slot:activator="{ on, attrs }">
        <span
          class="font-grey"
          v-bind="attrs"
          v-on="on"
          @click="show = !show"
        >ament</span>
      </template>
      <span>Tooltip</span>
    </v-tooltip>
 
 , consectetur adipiscing elit. Etiam scelerisque at erat a rhoncus. Phasellus ut magna ac enim hendrerit bibendum vitae vel risus. Sed a bibendum enim, quis tincidunt massa. Pellentesque quis auctor quam, in auctor ipsum. Nam in vehicula lacus. Nullam sit amet lectus eros. Sed vel tincidunt ligula, a tincidunt eros. Donec convallis tortor eleifend tellus gravida volutpat. Ut eget gravida neque. Vestibulum in sapien quam. Maecenas quis erat a nunc iaculis aliquam mollis a dolor. Duis at porta est, at rutrum massa.

Etiam eros lacus, accumsan id aliquet in, laoreet nec ante. Etiam interdum purus a turpis lacinia, pulvinar maximus ipsum porta. Curabitur vitae condimentum arcu. Duis enim dui, rhoncus id auctor vestibulum, sagittis at lectus. Curabitur eu nisi sem. Quisque non lobortis orci. Nam et lorem ante. Suspendisse nec mi sit amet ex aliquet venenatis at id libero.

Nam nec eros ut ante auctor hendrerit ut eu leo. Quisque imperdiet risus tellus, quis mattis turpis convallis a. In ut dui eu elit commodo auctor eget vestibulum nunc. Nulla eleifend dapibus lacus vitae vehicula. Mauris molestie ac elit ut vulputate. Nam est nisi, tempor in ligula et, sagittis pellentesque sapien. Duis id faucibus est. Proin posuere laoreet dapibus. Proin a dui neque. Ut gravida hendrerit pulvinar. Aliquam erat volutpat.

Cras ultrices auctor turpis, eu commodo tellus efficitur vehicula. Aenean blandit enim a nunc viverra aliquam. Donec pellentesque leo sem, a cursus ligula pretium at. In euismod dignissim augue in eleifend. Cras lobortis felis et nisi bibendum aliquam. Duis tristique at justo sed porttitor. Donec varius id nibh a sollicitudin.

Sed aliquet hendrerit orci eu pharetra. Nam nec nisl in tortor lacinia fringilla non tincidunt mauris. Curabitur viverra urna quis mauris volutpat, eu commodo quam finibus. Morbi venenatis aliquet tortor, eget sodales magna ultricies vitae. Ut ut consequat orci. Donec vel lectus suscipit, ornare turpis sit amet, ullamcorper lorem. Morbi fermentum ante neque, vel vestibulum massa faucibus maximus. Maecenas nec cursus sapien. Ut ultricies magna et neque tempor consectetur. Nullam vestibulum diam nec scelerisque posuere. Suspendisse enim libero, commodo eu risus eu, accumsan consectetur orci. Nunc leo mauris, interdum id bibendum sed, dictum vel leo.

        </p>
       
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  transition: 'bounce',
  head() {
    return {
      title: 'My awesome project', // Other meta information
      script: [
        // { scr:'https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js' }
      ]
    }
  },
  components: {
    Logo,
    VuetifyLogo,
  },
    data () {
      return {
        show: false,
      }
    },
}
</script>

<style>
  .font-grey{
    color: red;
    }

</style>

