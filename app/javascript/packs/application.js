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

    },
    addCard(state, data){
      
    },
    editCard(state, data){
      
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