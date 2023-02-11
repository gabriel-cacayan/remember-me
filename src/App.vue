<template>
  <TheHeader />
  <nav class="flex space-x-4 bg-blue-300 p-4">
    <router-link to="/stored-resources" class="p-4 font-semibold"
      >Stored Resources</router-link
    >
    <router-link to="/add-resource" class="p-4 font-semibold"
      >Add Resource</router-link
    >
  </nav>

  <main>
    <Transition name="fade">
      <p v-if="isLoading" class="mt-4">Loading...</p>
      <div v-else>
        <router-view></router-view>
      </div>
    </Transition>
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
  methods: {
    addToResource: function (title, description, url) {
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

          this.$router.push("/stored-resources");
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
          this.$router.push("/stored-resources");
        })
        .catch((error) => {
          console.error(`Whoops! Something went wrong: ${error}`);
        });
    },
    loadResources: function () {
      this.isLoading = true;
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

          this.isLoading = false;
        })
        .catch((error) => {
          console.error(`Whoops! Something went wrong: ${error}`);
        });
    },
  },
  mounted() {
    this.loadResources();
  },
  // watch: {
  //   $route() {
  //     if (this.$route.params.id) {
  //       console.log(this.resources.length);
  //     }
  //   },
  // },

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
