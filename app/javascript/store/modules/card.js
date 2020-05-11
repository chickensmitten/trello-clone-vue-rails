const state = {
};

const mutations = {
  addCard(state, data){
    debugger;
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