<template>
  <container class="p-8 w-auto md:w-1/2 m-4 md:m-auto md:mt-6 text-center">
    <div>
      <div class="border-b text-4xl md:text-6xl mb-2 pb-2">Welcome</div>
      <div class="grid grid-cols-1 items-center text-2xl">
        <p>This is a practice application using the following technologies:</p>
        <ul class="my-10 list">
          <li v-for="tech in techList" :key="tech">{{ tech }}</li>
        </ul>
        <p>
          Developed with some responsive layout, some stuff may break on mobile.
        </p>
        <div class="flex justify-center items-center mt-8">
          <button @click.stop="loginAPI" class="btn flex justify-center py-1">
            <span class="mr-2">Connect To Spotify</span>
            <img src="@/assets/spotify.svg" height="40" width="40" />
          </button>
        </div>
        <div class="flex justify-center items-center mt-2 text-center">
          <div v-if="loginError" class="text-red-600">
            Error Logging In Please Try Again
          </div>
        </div>
      </div>
    </div>
  </container>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store/store";
import router from "@/router";

import Container from "@/components/Container.vue";

export default defineComponent({
  name: "Login",
  components: {
    Container,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const loginError = ref<boolean>(false);

    const techList = ref<string[]>(["Vue 3", "Type Script", "Tailwind CSS"]);

    // Handle Login
    const loginAPI = () => {
      loginError.value = false;

      const client_id: string = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
      const scopes = "user-read-email user-top-read";
      const redirect_uri: string = process.env.VUE_APP_BASE_URL;

      const encodedScopes: string = encodeURIComponent(scopes);
      const encodedRedirect: string = encodeURIComponent(redirect_uri);

      // Implicit Grant Flow for Auth
      const authString = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${encodedRedirect}&scope=${encodedScopes}&response_type=token`;

      window.location.replace(authString);
    };

    // Handle Error
    if (route.query.error !== undefined) {
      loginError.value = true;
    }

    // Handle Success
    if (route.hash) {
      const res = route.hash;

      const acc = "#access_token=";
      const tt = "&token_type=";
      const exp = "&expires_in=";

      const access_token = res.substring(
        res.indexOf(acc) + acc.length,
        res.indexOf(tt)
      );
      const token_type = res.substring(
        res.indexOf(tt) + tt.length,
        res.indexOf(exp)
      );
      let expires_in = parseInt(
        res.substring(res.indexOf(exp) + exp.length, res.length)
      );

      store.dispatch("setCredentials", {
        access_token,
        token_type,
        expires_in,
      });

      router.push("/home");
    }

    return { techList, loginError, loginAPI };
  },
});
</script>


<style>
</style>