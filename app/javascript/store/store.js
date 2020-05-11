import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex';

import list from './modules/list';
import card from './modules/card';

Vue.use(Vuex);

window.store = new Vuex.Store({
  modules: {
    list,
    card
  }
});
//  allows us to fiddle ui as vue has an observer
// window.store.lists.push({name: "Custom List"})

export default window.store