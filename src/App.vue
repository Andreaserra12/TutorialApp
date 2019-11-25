<template>
  <v-app>
    <v-app-bar
      app
      color="#ffcc00"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="My logo"
          class="shrink mr-2"
          src="@/assets/logo2.png"
          transition="scale-transition"
          width="40"
          contain
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        color="#6c0382"
      >
        <span class="mr-2">Tutorial App</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
}
</script>
