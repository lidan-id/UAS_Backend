<template>
  <div class="hero-body">
    <div class="container has-text-centered is-family-monospace">
      <form action="" class="control">
        <div class="field">
          <label for="usname" class="title is-italic">username</label>
          <input
            id="usname"
            class="input has-text-centered"
            type="text"
            autocomplete="off"
            required
          />
        </div>
        <div class="field">
          <label for="pass" class="title is-italic">password</label>
          <input
            id="pass"
            class="input has-text-centered"
            type="password"
            autocomplete="off"
            required
          />
        </div>
        <div class="field">
          <button class="button is-white is-outlined is-rounded is-medium">
            LOGIN
          </button>
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
