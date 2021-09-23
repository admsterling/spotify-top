<template>
  <container class="col-span-full md:col-span-1">
    <div class="py-2">
      <div
        class="
          flex
          items-center
          justify-center
          border-b border-gray-200
          mx-6
          pb-2
          md:py-4
        "
      >
        <p class="text-2xl md:text-4xl">Top Tracks</p>
      </div>
      <transition-group
        appear
        tag="ul"
        @before-enter="beforeEnter"
        @enter="enter"
        class="grid grid-cols-1 md:grid-cols-2 justify-center items-center pt-1"
      >
        <li v-for="(item, index) in list" :key="item.id" :data-index="index">
          <div
            class="
              grid grid-cols-2
              m-1
              mx-4
              md:m-6
              bg-white
              dark:bg-gray-500
              border border-gray-200
              shadow-md
              transform
              hover:scale-110
              hover:shadow-lg
              transition
              duration-75
              cursor-pointer
            "
            @click="openLink(item.external_urls.spotify)"
          >
            <transition name="fade">
              <img
                :src="item.album.images[0].url"
                :alt="'album cover for ' + item.name"
                :height="item.album.images[0].height"
                :width="item.album.images[0].width"
                class="md:block"
              />
            </transition>
            <div class="m-2 md:m-4">
              <div class="text-md md:text-xl font-bold md:truncate">
                {{ item.pos + ". " + item.name }}
              </div>
              <li
                v-for="(artist, i) in item.artists"
                :key="artist"
                class="text-sm md:text-lg truncate"
              >
                <span v-if="i < 2"> - {{ artist.name }} </span>
              </li>
              <span v-if="item.artists.length > 2">And more...</span>
            </div>
            <div class="badge hidden md:block">
              <span>{{ fixTime(item.duration_ms) }}</span>
            </div>
          </div>
        </li>
      </transition-group>
    </div>
  </container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Container from "./Container.vue";

import gsap from "gsap";
import moment from "moment";

export default defineComponent({
  components: {
    Container,
  },
  props: ["list"],
  setup() {
    // eslint-disable-next-line
    const beforeEnter = (el: any) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(100px)";
    };
    // eslint-disable-next-line
    const enter = (el: any, done: any) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: done,
        delay: el.dataset.index * 0.2,
      });
    };

    const openLink = (link: string) => {
      window.open(link, "_blank");
    };

    const fixTime = (ms: number) => {
      return moment(ms).format("mm:ss");
    };

    return {
      beforeEnter,
      enter,
      openLink,
      fixTime,
    };
  },
});
</script>


<style scoped>
.fade-enter-active {
  transition: opacity 3s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}
</style>