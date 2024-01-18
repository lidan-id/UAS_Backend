<template>
  <div>
    <button
      data-target="modal-js-example"
      class="button js-modal-trigger is-info"
      @click="openModal"
    >
      add bike
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
            <label class="label">Name</label>
            <div class="control">
              <input
                v-model="bikeName"
                class="input"
                type="text"
                placeholder="Bike name"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Brand</label>
            <div class="control">
              <input
                v-model="bikeBrand"
                class="input"
                type="text"
                placeholder="Bike brand"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Category</label>
            <div class="control">
              <div class="select">
                <select v-model="bikeCategory" required>
                  <option>Mountain Bikes</option>
                  <option>Road Bikes</option>
                  <option>Dual-Sport Bikes</option>
                  <option>City Bikes</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Price</label>
            <div class="control">
              <input
                v-model="bikePrice"
                class="input"
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

// form
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
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};
</script>
