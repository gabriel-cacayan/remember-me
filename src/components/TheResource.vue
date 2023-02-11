<template>
  <Transition>
    <p v-if="resourceIsLoading">Loading...</p>
  </Transition>
  <div
    v-if="resource && resourceIsLoading == false"
    class="flex flex-col justify-start items-start mt-10 rounded-lg shadow-md border border-gray-300 w-3/4 mx-auto p-4"
  >
    <h1 class="text-xl font-bold">
      {{ resource.title }} -
      <span class="text-sm text-gray-400">{{ resource.id }}</span>
    </h1>
    <p class="mt-4 text-left">{{ resource.description }}</p>
    <div class="flex space-x-4">
      <button
        class="mt-4 h-10 px-6 font-semibold rounded-md bg-green-700 hover:bg-green-500 text-white"
      >
        <a :href="resource.url" target="_blank">View on new Tab</a>
      </button>
      <button
        class="mt-4 h-10 px-6 font-semibold rounded-md bg-red-700 hover:bg-red-500 text-white"
        @click="deleteTheResource(resource.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["deleteTheResource", "resources", "isLoading"],
  data() {
    return {
      storeResources: this.resources,
      resource: {},
      resourceIsLoading: this.isLoading,
    };
  },
  methods: {
    loadResource: function (route) {
      this.resourceIsLoading = true;

      const id = route.params.id;
      if (this.resources.length === 0) {
        this.loadResources();
      }
      const selectedResource = this.storeResources.find((r) => r.id == id);
      this.resource = selectedResource;

      this.resourceIsLoading = false;
    },
  },
  created() {
    this.loadResource(this.$route);
  },
};
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
