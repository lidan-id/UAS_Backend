<template>
  <nav class="hero-head tabs is-boxed mb-3 container has-text-centered">
    <div class="nav-center">
      <ul class="navbar-item is-size-5">
        <li :class="{ 'is-active': isActive('/') }">
          <a href="#/">LOGIN</a>
        </li>
        <li :class="{ 'is-active': isActive('/register') }">
          <a href="#/register">REGISTER</a>
        </li>
      </ul>
    </div>
  </nav>
  <component :is="currentView" />
</template>
<script setup>
import { ref, computed } from "vue";
import Login from "./Login.vue";
import Register from "./Register.vue";

// Router same page
const routes = {
  "/": Login,
  "/register": Register,
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
