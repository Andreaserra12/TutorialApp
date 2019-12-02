import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [
      { id: '1', title: 'First', author: 'Paulo', tags: ['photoshop', 'illustration', 'photo', 'tutorial'] },
      { id: '2', title: 'Second', author: 'Luca', tags: ['illustrator', 'illustration', 'graphic', 'draw'] },
      { id: '3', title: 'Third', author: 'Fraulo', tags: ['draw', 'photoshop', 'graphic', 'tutorial'] },
      { id: '4', title: 'Fourth', author: 'Pietro', tags: ['vue', 'code', 'tutorial', 'tuamadre'] }
    ],
    favorite: []
  },
  getters: {
  },
  mutations: {
    pushVideoToFavorite (state, videoId) {
      console.log(videoId)
      state.favorite.push(videoId)
    }
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
    },
    addVideoToFavorite (store, video) {
      const favoriteItem = store.state.favorite.length && store.state.favorite.find(item => item.id === video.id)
      if (!favoriteItem) {
        store.commit('pushVideoToFavorite', video.id)
      } else {
        return (new Error('video già presente'))
      }
    }

  },
  modules: {
  }
})
