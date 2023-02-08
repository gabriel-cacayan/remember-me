<template>
  <div
    class="flex flex-col justify-start items-start mt-10 rounded-lg shadow-md border border-gray-300 w-3/4 mx-auto p-4"
    v-for="resource in storeResources"
    :key="resource.id"
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
        <a :href="resource.url" target="_blank">View</a>
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
  inject: ["resources", "deleteTheResource"],
  data() {
    return {
      storeResources: this.resources,
    };
  },
};
</script>
