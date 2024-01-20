<template>
  <div>
    <a
      @click="openEditModal"
      class="is-size-7 card-footer-item button is-white"
    >
      EDIT
    </a>
    <div
      class="modal has-background-grey-light"
      :class="{ 'is-active': modalActive }"
    >
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head has-background-black">
          <p class="modal-card-title has-text-white has-text-centered">
            Edit bike information
          </p>
          <button
            class="delete is-hidden-mobile"
            aria-label="close"
            @click="closeModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label" for="namadit">Name</label>
            <div class="control">
              <input
                id="namadit"
                v-model="newbikeName"
                class="input has-text-centered"
                type="text"
                placeholder="Bike name"
                autocomplete="off"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label" for="brandit">Brand</label>
            <div class="control">
              <input
                id="brandit"
                v-model="newbikeBrand"
                class="input has-text-centered"
                type="text"
                placeholder="Bike brand"
                autocomplete="off"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label" for="catedit">Category</label>
            <div class="control">
              <div class="select">
                <select v-model="newbikeCategory" id="catedit" required>
                  <option>Mountain Bikes</option>
                  <option>Road Bikes</option>
                  <option>Dual-Sport Bikes</option>
                  <option>City Bikes</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="hargadit">Price</label>
            <div class="control">
              <input
                id="hargadit"
                v-model="newbikePrice"
                class="input has-text-centered"
                type="number"
                min="1"
                placeholder="per hour"
                required
              />
            </div>
          </div>
          <div v-if="error" class="has-text-danger has-text-centered">
            {{ error }}
          </div>
        </section>
        <footer
          class="modal-card-foot has-background-light is-justify-content-center"
        >
          <button @click="saveEdit" class="button is-link">Save Changes</button>
          <button @click="closeModal" class="button is-danger">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const { item, theList } = defineProps(["item"]);
const modalActive = ref(false);
const newbikeName = ref("");
const newbikeBrand = ref("");
const newbikeCategory = ref("Mountain Bikes");
const newbikePrice = ref(1);

const openEditModal = () => {
  newbikeName.value = item.nama;
  newbikeBrand.value = item.brand;
  newbikeCategory.value = item.kategori;
  newbikePrice.value = item.harga;
  modalActive.value = true;
};

const closeModal = () => {
  modalActive.value = false;
};
const error = ref(null);

const saveEdit = async () => {
  try {
    const response = await axios.put(`http://localhost:3000/bikes/${item.id}`, {
      nama: newbikeName.value,
      brand: newbikeBrand.value,
      kategori: newbikeCategory.value,
      harga: newbikePrice.value,
    });
    window.location.reload();
    closeModal();
    theList.value = theList.value.map((bike) =>
      bike.id === item.id ? { ...bike, ...response.data.bike } : bike
    );
  } catch (error) {
    console.error(error);
  }
};
</script>
