import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import StoredResources from "../src/components/StoredResources.vue";
import AddResource from "../src/components/AddResource.vue";
import TheResource from "../src/components/TheResource.vue";
import NotFound from "./components/views/NotFound.vue";

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
      name: "resources.index",
      component: StoredResources,
    },
    {
      path: "/stored-resources/:id",
      name: "resources.show",
      component: TheResource,
    },
    {
      path: "/add-resource",
      component: AddResource,
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },
  ],
  linkActiveClass: "bg-purple-900 text-white",
});

createApp(App).use(router).mount("#app");
