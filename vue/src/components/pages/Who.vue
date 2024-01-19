<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <p class="title">Who are you?</p>
      <button
        @click="goTo('/customer')"
        class="block button is-white is-large is-fullwidth"
      >
        CUSTOMERhaiii
      </button>
      <button
        @click="goTo('/owner')"
        class="block button is-white is-large is-fullwidth"
      >
        ADMIN | OWNER
      </button>
      <router-view />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goTo = (path) => {
  router.push(path);
};
</script>
