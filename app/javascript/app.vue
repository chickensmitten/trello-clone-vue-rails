<template>
  <!-- options for groupps lists is to create groups so that the cards and lists when dragging does not get mixed up. This is a Vue draggable feature. -->
  <!-- v-model lists to changes in lists -->
  <draggable v-model="lists" :options="{group: 'lists'}" class="board dragArea" @end="listMoved">
    <list v-for="(list, index) in lists" :list="list"></list>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import list from 'components/List'

export default {
  components: { draggable, list },

  props: ["original_lists"],
  data: function() {
    return {
      lists: this.original_lists,
    }
  },
  methods: {

    listMoved: function(event) {
      // console.log(event);
      var data = new FormData;
      // creates a new list object with element of position. newIndex plus 1 is because acts_as_lists order starts from 1 and not 0, but javascript array index starts from 0.
      data.append("list[position]", event.newIndex + 1)
      // console.log(data);
      Rails.ajax({
        url: `/lists/${this.lists[event.newIndex].id}/move`,
        type: "PATCH",
        data: data,
        dataType: "json",
        // no need to do anything on success because the new location of the list is already persisting.
      })

    },
  }
}
</script>

<style scoped>
.dragArea {
  min-height: 20px;
}

/* the code styles here are only applies here and does not conflict to other similar named classes */
/* to get the css styles from other website, checkout their html under "elements", click on it, then go to "styles" panel */
.board {
  white-space: nowrap;
  overflow-x: auto;
}


</style>
