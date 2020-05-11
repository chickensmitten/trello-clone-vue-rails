<template>
  <!-- options for groupps lists is to create groups so that the cards and lists when dragging does not get mixed up. This is a Vue draggable feature. -->
  <!-- v-model lists to changes in lists -->
  <draggable v-model="lists" :options="{group: 'lists'}" class="row dragArea" @end="listMoved">
    <div v-for="(list, index) in lists" class="col-3">

      <h6>{{ list.name }}</h6>
      <hr>
      <div v-for="(card, index) in list.cards" class="card card-body mb-3">
        {{ card.name }}
      </div>

      <div class="card card-body">
        <textarea v-model="messages[list.id]" class="form-control"></textarea>
        <button v-on:click="submitMessages(list.id)" class="btn btn-secondary btn-block"> Add </button>
      </div>

    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  props: ["original_lists"],
  data: function() {
    return {
      messages: {},
      lists: this.original_lists,
    }
  },
  methods: {
    listMoved: function(event) {
      console.log(event);
      var data = new FormData;
      // creates a new list object with element of position. newIndex plus 1 is because acts_as_lists order starts from 1 and not 0, but javascript array index starts from 0.
      data.append("list[position]", event.newIndex + 1)
      console.log(data);
      Rails.ajax({
        url: `/lists/${this.lists[event.newIndex].id}/move`,
        type: "PATCH",
        data: data,
        dataType: "json",
        // no need to do anything on success because the new location of the list is already persisting.
      })

    },
    submitMessages: function(list_id) {
      var data = new FormData;
      data.append("card[list_id]", list_id);
      data.append("card[name]", this.messages[list_id]);

      Rails.ajax({
        // create new cards in the list.
        url: "/cards",
        type: "POST",
        data: data,
        dataType: "json",
        // When success response comes back, then we have to append the existing lists, so that the new item in lists will show
        success: (data) => {
          const index = this.lists.findIndex(item => item.id == list_id)
          this.lists[index].cards.push(data)
          this.messages[list_id] = undefined
        }
      });
    }
  }
}
</script>

<style scoped>
.dragArea {
  min-height: 20px;
}
</style>
