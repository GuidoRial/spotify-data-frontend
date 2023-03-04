<template>
  <div class="individual-result" @click="selectArtist(artist.artist_id)">
    <img :src="artist.artist_image" class="artist-image" />
    <div class="artist-data">
      <p class="artist-name">{{ artist.artist_name }}</p>
      <div class="open-artist-link" @click="openArtistWithSpotify(artist.artist_uri)">
        <font-awesome-icon icon="fa-brands fa-spotify" id="openWithSpotify" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import spotifyStore from "@/store/spotify";
export default {
  props: {
    artist: Object,
  },
  methods: {
    ...mapActions(spotifyStore, ["compareArtistWithItsRelatedArtists"]),
    openArtistWithSpotify(url) {
      window.open(url, "_blank").focus();
    },
    async selectArtist(id) {
      this.$emit("goToNextStep");
      let data = await this.compareArtistWithItsRelatedArtists(id, "US");
      this.$emit("artistSelected", data);
    },
  },
};
</script>

<style scoped>
#openWithSpotify {
  z-index: 10;
  color: var(--spotify-green);
}

.individual-result {
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  padding: 1rem;
  width: 15rem;
  height: 18rem;
  z-index: 1;
}

.individual-result:hover {
  background-color: var(--spotify-gray);
}

.artist-image {
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  object-fit: contain;
}

.open-artist-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.artist-data {
  text-align: left;
  padding: 0.3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}

.artist-name {
  font-weight: 700;
  color: var(--white);
  font-size: 1rem;
}</style>
