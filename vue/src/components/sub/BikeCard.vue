<!-- BikeCard.vue -->
<template>
  <div class="column field">
    <div class="card has-text-centered">
      <div class="card-content is-flex-wrap-wrap">
        <div
          class="has-text-weight-bold has-text-white has-background-black is-uppercase"
        >
          {{ item.nama }}
        </div>
        <div class="is-size-7 is-italic is-underlined">{{ item.brand }}</div>
        <div class="is-size-7 has-text-weight-light is-family-monospace">
          {{ item.kategori }}
        </div>
        <div class="is-size-6 has-text-success-dark">${{ item.harga }}</div>
      </div>
      <footer class="card-footer">
        <a
          href="#"
          class="card-footer-item button has-background-grey-darker has-text-warning-dark"
        >
          EDIT</a
        >
        <a
          href="#"
          class="card-footer-item button has-background-grey-light has-text-danger-dark"
        >
          DELETE</a
        >
      </footer>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["item"]);
</script>
