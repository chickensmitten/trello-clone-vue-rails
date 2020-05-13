const state = {
  lists: []  
};

const mutations = {
  addList(state, data){
    state.lists.push(data)
  },
  addCard(state, data){
    const index = state.lists.findIndex(item => item.id == data.list_id)
    debugger;    
    state.lists[index].cards.push(data)
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