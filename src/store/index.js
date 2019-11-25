import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [
      { id: '', title: 'First', author: 'Paulo', tags: ['photoshop', 'illustration', 'photo', 'tutorial'] },
      { id: '', title: 'Second', author: 'Luca', tags: ['illustrator', 'illustration', 'graphic', 'draw'] },
      { id: '', title: 'Third', author: 'Fraulo', tags: ['draw', 'photoshop', 'graphic', 'tutorial'] },
      { id: '', title: 'Fourth', author: 'Pietro', tags: ['vue', 'code', 'tutorial', 'tuamadre'] }
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    search (store, currentSearch) {
      return new Promise((resolve, reject) => {
        const result = this.state.videos.filter(video => {
          return video.title.toLowerCase().includes(currentSearch.toLowerCase())
        })
        if (result.length) {
          resolve(result)
        } else {
          reject(new Error('no result found'))
        }
      })
    },
    searchTags (store, currentSearch) {
      return new Promise((resolve, reject) => {
        const result = this.state.videos.filter(tag => {
          return tag.tags.includes(currentSearch.toLowerCase())
        })
        if (result.length) {
          resolve(result)
        } else {
          reject(new Error('no result found'))
        }
      })
    }
  },
  modules: {
  }
})
