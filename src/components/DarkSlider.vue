<template>
  <div class="flex justify-end items-center">
    <div
      class="
        w-10
        h-2
        md:w-14
        md:h-3
        flex
        items-center
        bg-gray-300
        rounded-full
        duration-300
        ease-in-out
        cursor-pointer
        mr-2
      "
      :class="{ 'bg-primary': slider }"
      @click="toggleSwitch"
    >
      <div
        class="
          bg-white
          w-5
          h-5
          md:w-8
          md:h-8
          rounded-full
          shadow-md
          transform
          duration-300
          ease-in-out
        "
        :class="{ 'translate-x-5 md:translate-x-7': slider }"
      ></div>
    </div>

    <transition
      name="switch"
      mode="out-in"
      class="text-black dark:text-gray-200"
    >
      <svg
        v-if="!slider"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const slider = ref(false);

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      slider.value = true;
    } else {
      document.documentElement.classList.remove("dark");
    }

    const toggleSwitch = () => {
      slider.value = !slider.value;

      if (slider.value) {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
      } else {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark");
      }
    };

    return { slider, toggleSwitch };
  },
});
</script>

<style scoped>
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
}
.switch-enter-active,
.switch-leave-active {
  transition: all 0.2s ease-in;
}
</style>
