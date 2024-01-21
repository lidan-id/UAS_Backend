import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/pages/Login.vue";
import Register from "./components/pages/Register.vue";
import Customer from "./components/pages/Customer.vue";
import Owner from "./components/pages/Owner.vue";
import OsecurityVue from "./components/sub/Osecurity.vue";
import CbikesVue from "./components/sub/Cbikes.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/Register", component: Register },
  { path: "/customer", component: Customer },
  { path: "/owner", component: OsecurityVue },
  { path: "/check", component: Owner },
  { path: "/test", component: CbikesVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
