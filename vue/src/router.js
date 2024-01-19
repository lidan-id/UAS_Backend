import { createRouter, createWebHistory } from "vue-router";
import Who from "./components/pages/Who.vue";
import Customer from "./components/pages/Customer.vue";
import Owner from "./components/pages/Owner.vue";
import OsecurityVue from "./components/sub/Osecurity.vue";

const routes = [
  { path: "/", component: Who },
  { path: "/customer", component: Customer },
  { path: "/owner", component: OsecurityVue },
  { path: "/check", component: Owner },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
