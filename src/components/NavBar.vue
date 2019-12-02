<template lang="pug">
  v-app-bar( app
        color="#ffcc00"
        dark8)
        div(class="d-flex align-center")
          v-img(alt="My logo"
            class="shrink mr-2"
            src="@/assets/logo2.png"
            transition="scale-transition"
            width="40"
            contain)

        v-spacer
        v-btn
          router-link(:to="{name: 'upload'}") Upload

        v-btn(text
          color="#6c0382")

        router-link( :to="{name: 'home'}")
          span(class="mr-2") Tutorial App

</template>

<script>

export default {
}

</script>
