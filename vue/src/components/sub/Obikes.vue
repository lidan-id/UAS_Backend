<template>
  <div class="container has-text-centered">
    <AddBike /> Total Bikes: {{ theList.length }}
  </div>
  <div class="hero-body">
    <div class="columns is-multiline is-flex is-justify-content-center">
      <div v-for="item in theList">
        <BikeCard :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import AddBike from "./AddBike.vue";
import BikeCard from "./BikeCard.vue";

const theList = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/bikes");
    theList.value = response.data.bikes;
  } catch (error) {
    alert("Tidak dapat memuat data sepeda");
    console.error(error);
  }
});
</script>
