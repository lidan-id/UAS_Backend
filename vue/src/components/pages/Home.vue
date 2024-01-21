<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <p class="title">Welcome</p>
      <button
        @click="goTo('/login')"
        class="block button is-white is-large is-fullwidth"
      >
        Login
      </button>
      <button
        @click="goTo('/register')"
        class="block button is-white is-large is-fullwidth"
      >
        Register
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
