<!-- BikeCard.vue -->
<template>
  <div class="column field">
    <div class="card has-text-centered has-background-danger-dark">
      <div class="card-content is-flex-wrap-wrap">
        <div
          class="has-text-weight-bold has-text-white has-background-black is-uppercase"
        >
          {{ item.nama }}
        </div>
        <div
          class="is-size-7 has-text-weight-medium is-italic has-text-light is-capitalized"
        >
          {{ item.brand }}
        </div>
        <div
          class="is-size-7 has-text-weight-light is-family-monospace has-text-white"
        >
          {{ item.kategori }}
        </div>
        <div class="is-size-6 has-text-success has-text-weight-semibold">
          ${{ item.harga }}
        </div>
      </div>
      <footer class="card-footer">
        <EditBike :item="item" />
        <a
          @click="deleteItem"
          class="is-size-7 card-footer-item button is-danger"
        >
          DELETE</a
        >
      </footer>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import EditBike from "./EditBike.vue";

const { item, theList } = defineProps(["item"]);

const deleteItem = async () => {
  try {
    await axios.delete(`http://localhost:3000/bikes/${item.id}`);
    window.location.reload();
    theList.splice(theList.indexOf(item), 1);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
</script>
