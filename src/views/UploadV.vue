<template>
<v-content>
  <Upload/>
    <router-view>
    </router-view>
</v-content>
</template>

<script>
// @ is an alias to /src
import Upload from '@/components/Upload.vue'
export default {
  name: 'upload',
  components: {
    Upload
  }
}
</script>
