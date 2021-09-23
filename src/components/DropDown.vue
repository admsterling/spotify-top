<template>
  <div class="relative">
    <div class="flex flex-auto justify-center items-center">
      <button
        v-on:click="show = !show"
        class="
          bg-green-400
          text-white
          font-bold
          py-2
          px-4
          whitespace-no-wrap
          rounded
          transition
          duration-300
          inline-flex
          items-center
          justify-center
          w-44
        "
      >
        <span>{{ selected }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
          />
        </svg>
      </button>
    </div>

    <transition name="slide">
      <div
        class="
          dropdown-menu
          text-white
          mt-1
          rounded
          absolute
          z-10
          shadow-lg
          w-44
          max-w-xs
          bg-blue-400
        "
        v-if="show"
      >
        <ul class="list-none overflow-hidden rounded">
          <li v-for="(option, i) in options" :key="i">
            <p
              class="
                flex
                py-2
                px-4
                transition
                duration-300
                cursor-pointer
                bg-green-500
                hover:bg-green-300
                transform
                hover:translate-x-3
              "
              @click="emitSelected(option)"
            >
              {{ option }}
            </p>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["selected"],
  setup(_, { emit }) {
    const show = ref<boolean>(false);
    const options = ref<string[]>(["1 Month", "6 Months", "All Time"]);
    const selected = ref(options.value[0]);

    const emitSelected = (option: string): void => {
      if (selected.value != option) {
        show.value = false;
        selected.value = option;
        emit("selected", option);
      }
    };

    return { options, selected, show, emitSelected };
  },
});
</script>

<style scoped>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}
</style>