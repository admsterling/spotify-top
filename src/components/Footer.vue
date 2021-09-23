<template>
  <footer
    class="
      bg-gray-100
      dark:bg-gray-900
      border-t border-gray-200
      dark:border-gray-300
      dark:text-gray-300
      px-4
      flex
      justify-between
      items-center
    "
  >
    <div class="text-xl">
      Created by: <span class="font-semibold">Adam Sterling</span>
    </div>
    <div class="flex justify-end py-2">
      <svg
        class="icon mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="openLink('https://github.com/admsterling')"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="openLink('mailto:adamsterling10@gmail.com')"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const openLink = (link: string) => {
      window.open(link, "_blank");
    };

    return {
      openLink,
    };
  },
});
</script>
