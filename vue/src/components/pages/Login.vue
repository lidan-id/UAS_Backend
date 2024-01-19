<template>
  <div class="hero-body" style="background-color: white;">
    <div style="background-color: black;">
      <form action="">
        <div>Username</div>
        <input type="text">
        <div>Password</div>
        <input type="password">
        <div>
          <button>Submit</button> <a href="/register">Register</a>
        </div>
      </form>
    </div>
  </div>
</template>

<!-- <template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <p class="title">Who are you?</p>
      <button
        @click="goTo('/customer')"
        class="block button is-white is-large is-fullwidth"
      >
        CUSTOMER
      </button>
      <button
        @click="goTo('/check')"
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
</script> -->
