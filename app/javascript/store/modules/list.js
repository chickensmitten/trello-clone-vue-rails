const state = {
  lists: []  
};

const mutations = {
  addList(state, data){
    state.lists.push(data)
  },
};

const actions = {

};

const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters
}