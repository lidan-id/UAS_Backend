<!-- Add logout for user -->
<template>
  <div>
    <div class="navbar-item">
      <button
        data-target="modal-js-example"
        class="button js-modal-trigger is-black has-text-weight-bold is-size-4"
        @click="openModal"
      >
        SEwaPEDA
      </button>
    </div>

    <div class="modal is-fullwidth" :class="{ 'is-active': modalActive }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head has-background-black-ter">
          <p class="modal-card-title has-text-white has-text-centered">
            BACK TO PAGE:
            <span class="is-family-monospace has-background-dark"
              >Who are you?</span
            >
          </p>
          <button
            class="delete is-hidden-mobile"
            aria-label="close"
            @click="closeModal"
          ></button>
        </header>
        <footer
          class="modal-card-foot has-background-light is-justify-content-center"
        >
          <button class="button is-black is-outlined" @click="goTo('/')">
            Yes, I have finished
          </button>
          <button class="button is-black is-outlined" @click="closeModal">
            No, I'm not done yet
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const modalActive = ref(false);
const router = useRouter();

const goTo = (path) => {
  router.push(path);
};

const openModal = () => {
  modalActive.value = true;
};

const closeModal = () => {
  modalActive.value = false;
};
</script>
