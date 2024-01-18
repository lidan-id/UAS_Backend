<template>
  <div class="hero-head">
    <header class="navbar container navbar-brand">
      <BackToWho />
      <div class="navbar-item is-family-code has-text-grey">Admin MODE</div>
    </header>
  </div>

  <nav class="is-fullwidth tabs is-boxed mb-3">
    <div class="container">
      <ul class="is-size-5">
        <li :class="{ 'is-active': isActive('/') }">
          <a href="#/">Bikes</a>
        </li>
        <li :class="{ 'is-active': isActive('/custlist') }">
          <a href="#/custlist">Customers</a>
        </li>
      </ul>
    </div>
  </nav>

  <component :is="currentView" />
</template>
<script setup>
import { ref, computed } from "vue";
import Obikes from "../sub/Obikes.vue";
import Ocustomers from "../sub/Ocustomers.vue";
import BackToWho from "./BackToWho.vue";

// Router same page
const routes = {
  "/": Obikes,
  "/custlist": Ocustomers,
};
const currentPath = ref(window.location.hash);
window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || NotFound;
});

//Active Link
const isActive = (path) => {
  return currentPath.value === "#" + path;
};
</script>
