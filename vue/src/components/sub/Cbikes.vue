<template>
  <div class="hero-head">
    <header class="navbar container navbar-brand">
      <BackToWho />
      <div class="navbar-item is-family-code has-text-grey">Customer MODE</div>
    </header>
  </div>

  <!-- Modal isi durasi -->
  <div class="hero-body modal" :class="{ 'is-hidden': !isNotificationVisible }">
    <div class="modal-background" @click="closeNotification"></div>
    <div class="modal-card">
      <div class="modal-card-head has-background-black">
        <div
          class="modal-card-title has-text-weight-bold is-size-4 has-text-centered has-text-white"
        >
          RENT DURATION
        </div>
      </div>
      <div class="modal-card-body has-background-dark">
        <input
          v-model="waktu"
          class="input is-size-5 is-rounded is-focused has-text-centered"
          type="number"
          min="1"
          max="24"
          placeholder="min. 1"
          required
        />
        <div class="select is-size-5 is-rounded is-fullwidth">
          <select v-model="jangka" required>
            <option>hour(s)</option>
            <option>day(s)</option>
          </select>
        </div>
      </div>
      <div
        class="result-info is-size-3 is-italic has-text-success-dark is-family-monospace is-centered has-background-white has-text-centered"
      >
        ----- ${{ calculatePrice() }} -----
      </div>
      <footer class="modal-card-foot has-background-black">
        <button
          class="is-justify-content-center container control button is-white is-outlined is-rounded"
          @click="rentBikes"
        >
          RENT
        </button>
      </footer>
    </div>
  </div>

  <div class="hero-body">
    <div class="is-flex is-justify-content-space-evenly columns is-multiline">
      <div v-for="item in theList" :key="item.id">
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
              <button
                @click="showNotification(item)"
                class="button is-hovered is-light is-rounded is-size-5"
              >
                SELECT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BackToWho from "./BackToWho.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const theList = ref([]);
const waktu = ref(1);
const jangka = ref("hour(s)");
const pilihan = ref(null);

const calculatePrice = () => {
  const selectedBikeValue = pilihan.value;

  if (selectedBikeValue) {
    const bikePrice =
      theList.value.find((bike) => bike.id === selectedBikeValue.id)?.harga ||
      0;
    const total_harga = jangka.value === "hour(s)" ? 1 : 24;
    return waktu.value * bikePrice * total_harga;
  }
  return 0;
};
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/bikes");
    theList.value = response.data.bikes;
  } catch (error) {
    alert("Tidak dapat memuat data sepeda");
    console.error(error);
  }
});

const rentBikes = async () => {
  try {
    await axios.delete(`http://localhost:3000/bikes/${pilihan.value.id}`);
    alert(`TOTAL PRICE: $${calculatePrice()}`);
    closeNotification();
    window.location.reload();
    theList.value = theList.value.filter(
      (bike) => bike.id !== pilihan.value.id
    );
  } catch (error) {
    console.error(error);
  }
};

const isNotificationVisible = ref(false);

const showNotification = (bike) => {
  pilihan.value = bike;
  isNotificationVisible.value = true;
};

const closeNotification = () => {
  pilihan.value = null;
  isNotificationVisible.value = false;
};
</script>
