<template>
  <div class="list">

    <h6>{{ list.name }}</h6>

    <draggable v-model="list.cards" :options="{group: 'cards'}" class="dragArea" @change="cardMoved">
      <div v-for="(card, index) in list.cards" class="card card-body mb-3">
        {{ card.name }}
      </div>
    </draggable>

    <a v-if="!editing" @click="startEditing">Add a Card</a>
    <textarea v-if="editing" ref="message" v-model="message" class="form-control mb-2"></textarea>
    <button v-if="editing" v-on:click="submitMessage" class="btn btn-secondary"> Add </button>
    <a v-if="editing" @click="editing=false">Cancel</a>

  </div>  
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: { draggable },
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

      const list_index = window.store.lists.findIndex((list) => {
        return list.cards.find((card) => {
          return card.id === element.id;
        });
      });

      var data = new FormData;
      data.append("card[list_id]", window.store.lists[list_index].id)
      data.append("card[position]", evt.newIndex + 1)

      Rails.ajax({
        url: `/cards/${element.id}/move`,
        type: 'PATCH',
        data: data,
        dataType: "json"
      })

    },

    submitMessage: function() {
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
          const index = window.store.lists.findIndex(item => item.id == this.list.id)
          window.store.lists[index].cards.push(data)
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

.list {
  background: #E2E4E6;
  border-radius: 3px;
  padding: 10px;  
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
  width: 270px;
}
</style>








