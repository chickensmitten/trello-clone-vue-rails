<template>
  <div>
    <div @click="editing=true" class="card card-body mb-3">
      {{card.name}}
    </div>

    <div v-if='editing' class="modal-backdrop show"></div>
    <!-- we want to keep it open when clicking on the model, while clicking outside the modal, we close the modal -->
    <div v-if='editing' @click="closeModal" class="modal show" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ card.name }}</h5>
          </div>
          <div class="modal-body">
            <input v-model="name" class="form-control"></input>
          </div>
          <div class="modal-footer">
            <button @click="save" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
 props: ['card', 'list'],
 data: function() {
  return {
    editing: false,
    name: this.card.name
  }
 },
 methods: {
  closeModal: function(event) {
    // console.log(event)
    if (event.target.classList.contains("modal")) { this.editing = false};
  },
  save: function() {
    var data = new FormData
    data.append("card[name]", this.name)

    Rails.ajax({
      url: `/cards/${this.card.id}`,
      type: "PATCH",
      data: data,
      dataType: "json",
      success: (data) => {
        // find the right list and the right card then get the location of the index
        const list_index = window.store.lists.findIndex((item) => item.id === this.list.id)
        const card_index = window.store.lists[list_index].cards.findIndex((item) => item.id === this.card.id)

        // with the right index, remove the the old card, and replace it with the new one
        window.store.lists[list_index].cards.splice(card_index, 1, data)

        this.editing = false
      }
    })
  },
 }

}

</script>

<style scoped>

</style>








