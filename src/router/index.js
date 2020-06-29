import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

const AddDataSource = () => import("../views/data_source/AddDataSource.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/add_aata_source",
    name: "AddDataSource",
    component: AddDataSource
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
