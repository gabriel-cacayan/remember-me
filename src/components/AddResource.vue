<template>
  <div
    class="mt-10 rounded-lg shadow-md border border-gray-300 w-3/4 mx-auto p-4"
  >
    <form
      @submit.prevent="addToResource(this.title, this.description, this.url)"
    >
      <input
        v-model="title"
        class="mt-4 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
        type="text"
        placeholder="Title"
        required
      />
      <input
        v-model="description"
        class="mt-4 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
        type="text"
        placeholder="Description"
        required
      />
      <input
        v-model="url"
        class="mt-4 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
        type="url"
        placeholder="https://example.com"
        required
      />
      <button class="block mt-4 h-10 px-6 font-semibold bg-blue-900 text-white">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  inject: ["addToResource"],
  data() {
    return {
      title: "",
      description: "",
      url: "",
    };
  },
};
</script>
