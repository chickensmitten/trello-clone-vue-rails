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
import App from '../app.vue'

window.store = {}
//  allows us to fiddle ui as vue has an observer
// window.store.lists.push({name: "Custom List"})

document.addEventListener("turbolinks:load", function() {
  var element = document.querySelector('#boards')
  if (element != undefined) {
    window.store.lists = JSON.parse(element.dataset.lists)

    const app = new Vue({
      el: element,
      data: window.store,
      template: "<App :original_lists='lists' />",
      components: { App }
    })
  }
});