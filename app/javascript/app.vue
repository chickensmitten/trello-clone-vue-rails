<template>
  <!-- options for groupps lists is to create groups so that the cards and lists when dragging does not get mixed up. This is a Vue draggable feature. -->
  <!-- v-model lists to changes in lists -->
  <draggable v-model="lists" :options="{group: 'lists'}" class="board dragArea" @end="listMoved">
    <list v-for="(list, index) in lists" :list="list"></list>

    <div class="list">
      <a v-if="!editing" @click="startEditing">Add a List</a>
      <textarea v-if="editing" ref="message" v-model="message" class="form-control mb-2"></textarea>
      <button v-if="editing" v-on:click="createList" class="btn btn-secondary"> Add </button>
      <a v-if="editing" @click="editing=false">Cancel</a>
    </div>

  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import list from 'components/List'

export default {
  components: { draggable, list },
  data: function() {
    return {
      editing: false,
      message: "",
    }
  },

  computed: {
    lists() {
      return this.$store.state.lists;
    }
  },

  methods: {
    startEditing: function() {
      this.editing = true
      // this references the ref="message" in textarea, so that it can auto focus the cursor in textarea
      this.$nextTick(() => { this.$refs.message.focus() })
    },
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
    createList: function() {
      var data = new FormData;
      data.append("list[name]", this.message);

      Rails.ajax({
        // create new cards in the list.
        url: "/lists",
        type: "POST",
        data: data,
        dataType: "json",
        // When success response comes back, then we have to append the existing lists, so that the new item in lists will show
        success: (data) => {
          // when using action Cable, this could cause duplicates.
          this.$store.commit('addList', data)
          //  the problem here is that it does not return the cards, only the list, so we need to add the association in _list.json.jbuilder
          this.message = ""
          this.editing = false
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

/* the code styles here are only applies here and does not conflict to other similar named classes */
/* to get the css styles from other website, checkout their html under "elements", click on it, then go to "styles" panel */
.board {
  white-space: nowrap;
  overflow-x: auto;
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
