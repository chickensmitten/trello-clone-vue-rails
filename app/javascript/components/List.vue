<template>
  <div class="list">

    <h6>{{ list.name }}</h6>

    <draggable v-model="list.cards" :options="{group: 'cards'}" class="dragArea" @change="cardMoved">
      <!--  passing both card and list to card.vue -->
      <card v-for="card in list.cards" :card="card" :list="list"></card>
    </draggable>

    <a v-if="!editing" @click="startEditing">Add a Card</a>
    <textarea v-if="editing" ref="message" v-model="message" class="form-control mb-2"></textarea>
    <button v-if="editing" v-on:click="createCard" class="btn btn-secondary"> Add </button>
    <a v-if="editing" @click="editing=false">Cancel</a>

  </div>  
</template>

<script>
import draggable from 'vuedraggable'
import card from 'components/Card'
export default {
  components: { card, draggable },
  props: ["list"],

  data: function() {
    return {
      editing: false,
      message: ""
    }
  },

  methods: {
    startEditing: function() {
      this.editing = true
      // this references the ref="message" in textarea, so that it can auto focus the cursor in textarea
      this.$nextTick(() => { this.$refs.message.focus() })
    },
    cardMoved: function(event) {
      // console.log is needed to checkout how vue-draggable works from there, you can figure which elements in the object to manipulate. This this case, when a card is dragged from one location to another, added and removed is fired.      
      // console.log(event);
      // find out if the event is added or moved
      const evt = event.added || event.moved
      if (evt == undefined) { return }
    
      const element = evt.element

      const list_index = window.store.state.lists.findIndex((list) => {
        return list.cards.find((card) => {
          return card.id === element.id;
        });
      });

      var data = new FormData;
      data.append("card[list_id]", window.store.state.lists[list_index].id)
      data.append("card[position]", evt.newIndex + 1)

      Rails.ajax({
        url: `/cards/${element.id}/move`,
        type: 'PATCH',
        data: data,
        dataType: "json"
      })

    },

    createCard: function() {
      var data = new FormData;
      data.append("card[list_id]", this.list.id);
      data.append("card[name]", this.message);

      Rails.ajax({
        // create new cards in the list.
        url: "/cards",
        type: "POST",
        data: data,
        dataType: "json",
        // When success response comes back, then we have to append the existing lists, so that the new item in lists will show
        success: (data) => {
          this.$store.dispatch('addCard', data)
          this.message = ""
          this.$nextTick(() => { this.$refs.message.focus() })
        }
      });
    },    
  }
}

</script>

<style scoped>
.dragArea {
  min-height: 20px;
}


</style>








