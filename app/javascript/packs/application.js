// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("local-time").start()

window.Rails = Rails

import 'bootstrap'
import 'data-confirm-modal'

$(document).on("turbolinks:load", () => {
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
})

import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import App from '../app.vue'

Vue.use(Vuex)

window.store = new Vuex.Store({
  state: {
    lists: []
  },
  mutations: {
    addList(state, data){
      state.lists.push(data)
    },
    addCard(state, data){
      const index = state.lists.findIndex(item => item.id == data.list_id)
      state.lists[index].cards.push(data)
    },
    editCard(state, data){
      // find the right list and the right card then get the location of the index
      const list_index = state.lists.findIndex((item) => item.id === data.list_id)
      const card_index = state.lists[list_index].cards.findIndex((item) => item.id === data.id)      
      // with the right index, remove the the old card, and replace it with the new one
      state.lists[list_index].cards.splice(card_index, 1, data)      
    },
    moveCard(state, data) {
      const old_list_index = state.lists.findIndex((list) => {
        return list.cards.find((card) => {
          return card.id === data.id
        })
      })
      const old_card_index = state.lists[old_list_index].cards.findIndex((item) => item.id == data.id)
      const new_list_index = state.lists.findIndex((item) => item.id == data.list_id)

      if (old_list_index != new_list_index) {
        // Remove card from old list, add to new one
        state.lists[old_list_index].cards.splice(old_card_index, 1)
        state.lists[new_list_index].cards.splice(data.position - 1, 0, data)
      } else {
        state.lists[new_list_index].cards.splice(old_card_index, 1)
        state.lists[new_list_index].cards.splice(data.position - 1, 0, data)
      }
    }    
  }
})
//  allows us to fiddle ui as vue has an observer
// window.store.lists.push({name: "Custom List"})

document.addEventListener("turbolinks:load", function() {
  var element = document.querySelector('#boards')
  if (element != undefined) {
    window.store.state.lists = JSON.parse(element.dataset.lists)

    const app = new Vue({
      el: element,
      store: window.store,
      template: "<App />",
      components: { App }
    })
  }
});