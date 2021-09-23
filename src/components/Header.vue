<template>
  <header
    class="
      flex
      items-center
      justify-between
      bg-gray-100
      dark:bg-gray-900
      border-b border-gray-200
      dark:border-gray-300
      shadow-md
      p-3
      md:p-4
    "
  >
    <div class="text-2xl uppercase font-bold text-primary md:text-4xl">
      Spotify Favourites
    </div>
    <DarkSlider />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DarkSlider from "./DarkSlider.vue";

export default defineComponent({
  components: {
    DarkSlider,
  },
});
</script>
