<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <p class="title">MASTER ACCESS CODE</p>
      <div class="field">
        <p class="control">
          <input
            v-model="password"
            class="input has-text-centered"
            type="password"
            placeholder="Password"
          />
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-white is-outlined" @click="verifyPin">
            Unlock
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const password = ref("");
const router = useRouter();

const verifyPin = () => {
  if (password.value !== "tauke") {
    alert("Wrong! Who are you?");
    return;
  }
  router.push("/check");
};
</script>
