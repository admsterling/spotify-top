<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 grid-flow-row-dense justify-center m-0 p-0"
  >
    <div class="col-span-full">
      <container>
        <div
          class="
            flex
            justify-center
            items-center
            text-md
            md:text-2xl
            px-4
            py-2
            md:py-4
          "
        >
          <div class="text-center md:mx-4 mr-2">Time Range:</div>
          <DropDown @selected="updateLists" />
        </div>
      </container>
    </div>
    <TrackList :list="tracks" />
    <ArtistList :list="artists" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Container from "@/components/Container.vue";
import DropDown from "@/components/DropDown.vue";
import TrackList from "@/components/TrackList.vue";
import ArtistList from "@/components/ArtistList.vue";
import { useStore } from "@/store/store";

function getTimeRange(time_period: string): string {
  let result: string;

  switch (time_period) {
    case "1 Month":
      result = "short_term";
      break;
    case "6 Months":
      result = "medium_term";
      break;
    case "All Time":
      result = "long_term";
      break;
    default:
      result = "";
      break;
  }

  return result;
}

export default defineComponent({
  components: {
    Container,
    DropDown,
    TrackList,
    ArtistList,
  },
  setup() {
    const store = useStore();
    const tracks = ref([]);
    const artists = ref([]);

    const trackDataLoaded = ref(false);
    const artistDataLoaded = ref(false);

    const getData = async (
      type: string,
      time_period: string,
      offset: number
    ) => {
      const range = getTimeRange(time_period);

      const url = `https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=10&offset=${offset}`;

      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: store.getters.fullToken,
        },
      });
      return response.json();
    };

    const updateLists = (time_period: string) => {
      const offset = 0;
      tracks.value = [];
      artists.value = [];

      getData("tracks", time_period, offset).then((data) => {
        // eslint-disable-next-line
        tracks.value = data.items.map((d: any, index: number) => {
          return {
            ...d,
            pos: index + 1,
          };
        });
        trackDataLoaded.value = true;
      });
      // eslint-disable-next-line
      getData("artists", time_period, offset).then((data) => {
        // eslint-disable-next-line
        artists.value = data.items.map((d: any, index: number) => {
          return {
            ...d,
            pos: index + 1,
          };
        });
        artistDataLoaded.value = true;
      });
    };

    updateLists("1 Month");

    return {
      trackDataLoaded,
      artistDataLoaded,
      updateLists,
      tracks,
      artists,
    };
  },
});
</script>
