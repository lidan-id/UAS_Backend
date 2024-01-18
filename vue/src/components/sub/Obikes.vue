<template>
  <div class="container is-flex is-justify-content-center">
    <table class="table is-narrow">
      <thead>
        <tr>
          <th>Setting</th>
          <th>Nama</th>
          <th>Brand</th>
          <th>Kategori</th>
          <th>Harga/jam</th>
        </tr>
      </thead>
      <tbody class="is-bordered has-background-black has-text-white">
        <tr v-for="item in theList">
          <td></td>
          <td>{{ item.nama }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.kategori }}</td>
          <td>{{ item.harga }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

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
