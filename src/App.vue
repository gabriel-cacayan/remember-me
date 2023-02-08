<template>
  <TheHeader />

  <div
    class="mt-10 rounded-lg shadow-md border border-gray-300 w-3/4 mx-auto p-4"
  >
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5">
      <button
        :class="{
          'bg-blue-900 text-white p-4': activeTab === 'StoredResources',
        }"
        @click="activeComponent('StoredResources')"
      >
        Stored Resources
      </button>
      <button
        :class="{ 'bg-blue-900 text-white p-4': activeTab === 'AddResource' }"
        @click="activeComponent('AddResource')"
      >
        Add Resources
      </button>
      <!-- <button @click="loadResources">Load Resources</button> -->
    </div>
  </div>

  <KeepAlive>
    <component :is="activeTab"></component>
  </KeepAlive>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import StoredResources from "./components/StoredResources.vue";
import AddResource from "./components/AddResource.vue";
import { computed } from "vue";

export default {
  components: {
    TheHeader,
    StoredResources,
    AddResource,
  },
  data() {
    return {
      activeTab: "StoredResources",
      // resources: [
      //   {
      //     title: "Youtube",
      //     description:
      //       "YouTube is a global online video sharing and social media platform headquartered in San Bruno, California. It was launched on February 14, 2005, by Steve Chen, Chad Hurley, and Jawed Karim. It is owned by Google, and is the second most visited website, after Google Search",
      //     url: "https://www.youtube.com/",
      //   },
      //   {
      //     title: "Twitter",
      //     description:
      //       'Twitter is an online social media and social networking service owned and operated by American company Twitter, Inc., on which users send and respond publicly or privately 280-character-long messages, images and videos known as "tweets".',
      //     url: "https://twitter.com/",
      //   },
      // ],
      resources: [],
    };
  },
  provide() {
    return {
      resources: computed(() => this.resources),
      deleteTheResource: this.deleteTheResource,
      addToResource: this.addToResource,
    };
  },
  methods: {
    activeComponent: function (arg) {
      this.activeTab = arg;
    },
    addToResource: function (title, description, url) {
      // const newResource = {
      //   title: title,
      //   description: description,
      //   url: url,
      // };

      fetch(
        "https://vue-remember-europe-default-rtdb.europe-west1.firebasedatabase.app/survey.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
            url: url,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `The response is "${response.statusText}" and the HTTP Status is "${response.status}".`
            );
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data);

          this.resources.push({
            id: data.name,
            title: title,
            description: description,
            url: url,
          });
        })
        .catch((error) => {
          console.error(`Whoops! Something went wrong: ${error}`);
        });
      // end of fetch
    },
    deleteTheResource: function (id) {
      fetch(
        `https://vue-remember-europe-default-rtdb.europe-west1.firebasedatabase.app/survey/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(() => {
          // console.log(data);
          // location.reload();
          this.resources = this.resources.filter(
            (resource) => resource.id !== id
          );
        })
        .catch((error) => {
          console.error(`Whoops! Something went wrong: ${error}`);
        });
    },
    loadResources: function () {
      fetch(
        "https://vue-remember-europe-default-rtdb.europe-west1.firebasedatabase.app/survey.json"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `The response is "${response.statusText}" and the HTTP Status is "${response.status}".`
            );
          }
          return response.json();
        })
        .then((data) => {
          for (const id in data) {
            this.resources.push({
              id: id,
              title: data[id].title,
              description: data[id].description,
              url: data[id].url,
            });
          }
        })
        .catch((error) => {
          console.error(`Whoops! Something went wrong: ${error}`);
        });
    },
  },
  mounted() {
    this.loadResources();
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
</style>
