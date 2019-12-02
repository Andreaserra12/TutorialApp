<template lang="pug">
  v-container(background-color="#962aad")
    v-row
    v-col.search
      v-text-field(v-model='currentSearch', color="#ffcc00" :append-icon="marker ? 'mdi mdi-magnify' : ''", v-on:keyup.enter='search()', @click:append='search()', :loader="loader" label='Search', outlined, clearable)
      v-btn-toggle.pt-4(v-model="toggleMultiple" color='#ffcc00' depressed group multiple elevation="2")
        v-btn(value='search' retain-focus-on-click) TITLE
        v-btn(value='searchTags' retain-focus-on-click) TAGS
    v-row.search(cols='12' sm="3")
      v-chip-group(multiple, active, color="#ffcc00")
        v-chip(v-for="tag in getTags" :key="tag", @click='search(["searchTags"], tag)' ) {{ tag }}
    v-container
      p.font-weight-black Result: {{ results.length }} found
      v-container favorite {{this.favorite}}
      v-row.li(height='300', justify='center')
        v-col(cols="auto")
          v-card(align='start', max-width='400', v-for='video in results', :key='video.title')
            v-img.white--text.align-end(height='200px', src='https://cdn.searchenginejournal.com/wp-content/uploads/2019/07/shutterstock_1457601002-760x400.png')
              v-card-title {{video.title}}
            v-card-subtitle.pb-0
              v-chip.mr-3(v-for='(tag, index) in video.tags', v-bind:key="'tag-'+ index" @click='search(["searchTags"], tag)')
                | {{tag}}
            v-card-text.text--primary
              div {{video.author}}
            v-card-actions
              v-btn(color='orange', text, @click='addVideoToFavorite(video)') Save
              v-btn(color='orange', text) Play

</template>

<script>
export default {
  data () {
    return {
      currentSearch: '',
      results: [],
      marker: true,
      loader: false,
      toggleMultiple: ['search', 'searchTags'],
      currentError: '',
      ti: ''
    }
  },
  methods: {
    search (t, s) {
      // reset status
      this.results = []
      this.currentError = ''
      this.loader = true

      // use parameter or data
      let actions = t || this.toggleMultiple
      let searchTerm = s || this.currentSearch

      actions.forEach((action) => {
        this.$store.dispatch(action, searchTerm, t)
          .then(r => {
            if (this.results.length) {
              r.forEach(newRes => {
                this.results.forEach((oldRes) => {
                  if (newRes.id !== oldRes.id) {
                    this.results.push(newRes)
                  }
                })
              })
            } else {
              this.results = r
            }
          })
          .catch(e => {
            this.currentError = e.message
          })
          .finally(r => {
            this.loader = false
          })
      })
    },
    toggleMarker () {
      this.marker = !this.marker
    },
    addVideoToFavorite (video) {
      console.log('step 1', video)
      this.$store.dispatch('addVideoToFavorite', video)
    }
  },
  computed: {
    videos () {
      return this.$store.state.videos
    },
    getSearchObject () {
      return this.videos
    },
    tags () {
      return this.$store.state.videos.tags
    },
    getSearchTag () {
      return this.videos.tags
    },
    getTags () {
      const tags = []
      this.videos.forEach(video => {
        video.tags.forEach(tag => {
          if (!tags.includes(tag)) {
            tags.push(tag)
          }
        })
      })
      return tags
    },
    favorite () {
      return this.state.favorite
    }
  }
}
</script>

<style>
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.search {
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.loader {
  animation: loader 1s infinite;
  display: flex;
}
.results{
  font:"font-weight-black"
}
</style>
