import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import StoredResources from "../src/components/StoredResources.vue";
import AddResource from "../src/components/AddResource.vue";
import TheResource from "../src/components/TheResource.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/stored-resources",
    },
    {
      path: "/remember-me",
      redirect: "/stored-resources",
    },
    {
      path: "/stored-resources",
      component: StoredResources,
    },
    {
      path: "/stored-resources/:id",
      component: TheResource,
      props: true,
    },
    {
      path: "/add-resource",
      component: AddResource,
    },
  ],
  linkActiveClass: "bg-purple-900 text-white",
});

createApp(App).use(router).mount("#app");
