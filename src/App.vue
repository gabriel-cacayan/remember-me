<template>
  <TheHeader />
  <nav class="flex space-x-4 bg-blue-300 p-4">
    <router-link :to="{ name: 'resources.index' }" class="p-4 font-semibold"
      >Stored Resources</router-link
    >
    <router-link to="/add-resource" class="p-4 font-semibold"
      >Add Resource</router-link
    >
  </nav>

  <main>
    <p v-if="isLoading" class="mt-4">Loading...</p>

    <div v-else>
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import { computed } from "vue";

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      resources: [],
      isLoading: null,
    };
  },
  provide() {
    return {
      resources: computed(() => this.resources),
      deleteTheResource: this.deleteTheResource,
      addToResource: this.addToResource,
      // loadResources: this.loadResources,
      isLoading: this.isLoading,
    };
  },
  methods: {},
  mounted() {
    this.loadResources();
  },
  created() {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      window.location.replace("gabriel-cacayan.github.io/remember-me/");
    }
  },

  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 60px;
}

/* we will explain what these classes do next! */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
