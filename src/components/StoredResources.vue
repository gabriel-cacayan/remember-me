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
    <router-link
      :to="`/stored-resources/${resource.id}`"
      class="mt-4 py-2 px-4 bg-green-700 hover:bg-green-500 text-white font-semibold"
      >View</router-link
    >
  </div>
</template>

<script>
export default {
  inject: ["resources"],
  data() {
    return {
      storeResources: this.resources,
    };
  },
};
</script>
