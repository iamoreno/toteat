import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/Products.vue")
  },
  {
    path: "/waiters",
    name: "Waiters",
    component: () => import("../views/Waiters.vue")
  },
  {
    path: "/cashiers",
    name: "Cashiers",
    component: () => import("../views/Cashiers.vue")
  },
  {
    path: "/zones",
    name: "Zones",
    component: () => import("../views/Zones.vue")
  },
  {
    path: "/graphs",
    name: "Graphs",
    component: () => import("../views/GeneralGraphs.vue")
  },
  {
    path: "/hourly",
    name: "Hourly",
    component: () => import("../views/ByHour.vue")
  },
  {
    path: "/tables",
    name: "Tables",
    component: () => import("../views/Tables.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
