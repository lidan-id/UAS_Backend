<template>
  <div class="hero-head">
    <header class="navbar container navbar-brand">
      <BackToWHO />
      <div class="navbar-item is-family-code has-text-grey">Admin MODE</div>
      <div class="navbar-item navbar-end">
        <AddBike />
      </div>
    </header>
  </div>

  <div class="hero-body">
    <component :is="currentView" />
  </div>

  <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul class="is-size-4">
          <li :class="{ 'is-active': isActive('/') }">
            <a href="#/">Bikes</a>
          </li>
          <li :class="{ 'is-active': isActive('/custlist') }">
            <a href="#/custlist">Customers</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import Obikes from "../sub/Obikes.vue";
import Ocustomers from "../sub/Ocustomers.vue";
import BackToWHO from "./BackToWho.vue";
import AddBike from "./AddBike.vue";

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
