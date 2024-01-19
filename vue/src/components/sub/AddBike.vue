<template>
  <div class="container">
    <button
      data-target="modal-js-example"
      class="button js-modal-trigger is-link is-outlined is-focused"
      @click="openModal"
    >
      click here to add bike
    </button>

    <div
      class="modal has-background-grey-light"
      :class="{ 'is-active': modalActive }"
    >
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head has-background-black">
          <p class="modal-card-title has-text-white has-text-centered">
            New bike information
          </p>
          <button
            class="delete is-hidden-mobile"
            aria-label="close"
            @click="closeModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label" for="nama">Name</label>
            <div class="control">
              <input
                id="nama"
                v-model="bikeName"
                class="input has-text-centered"
                type="text"
                placeholder="Bike name"
                autocomplete="off"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label" for="brand">Brand</label>
            <div class="control">
              <input
                id="brand"
                v-model="bikeBrand"
                class="input has-text-centered"
                type="text"
                placeholder="Bike brand"
                autocomplete="off"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label" for="cate">Category</label>
            <div class="control">
              <div class="select">
                <select v-model="bikeCategory" id="cate" required>
                  <option>Mountain Bikes</option>
                  <option>Road Bikes</option>
                  <option>Dual-Sport Bikes</option>
                  <option>City Bikes</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label" for="harga">Price</label>
            <div class="control">
              <input
                id="harga"
                v-model="bikePrice"
                class="input has-text-centered"
                type="number"
                min="1"
                placeholder="per hour"
                required
              />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control"></div>
          </div>
        </section>

        <footer
          class="modal-card-foot has-background-light is-justify-content-center"
        >
          <button @click="addBike" class="button is-link">Add Bike</button>
          <button @click="closeModal" class="button is-danger">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const modalActive = ref(false);

// Modal
const openModal = () => {
  modalActive.value = true;
};

const closeModal = () => {
  modalActive.value = false;
};

// form untuk data baru
const bikeName = ref("");
const bikeBrand = ref("");
const bikeCategory = ref("Mountain Bikes");
const bikePrice = ref("1");
const addBike = async () => {
  try {
    const response = await axios.post("http://localhost:3000/bikes", {
      nama: bikeName.value,
      brand: bikeBrand.value,
      kategori: bikeCategory.value,
      harga: bikePrice.value,
    });
    console.log("Response:", response.data);
    closeModal();
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
</script>
