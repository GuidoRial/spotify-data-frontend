<template>
  <div class="individual-result" @click="selectAlbum(album.album_id)">
    <img :src="album.album_image" class="album-image" />
    <div class="album-data">
      <div class="data">
        <p class="album-name">{{ album.album_name }}</p>
        <p class="album-release-date-artist">
          {{ new Date(album.release_date).getFullYear() }} 🞄
          {{ album.artist_name }}
        </p>
      </div>
      <div class="open-album-link" @click="openAlbumWithSpotify(album.album_uri)">
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
    album: Object,
  },
  methods: {
    ...mapActions(spotifyStore, ["getAlbumAudioFeatures"]),
    async selectAlbum(id) {
      this.$emit("goToNextStep");
      let albumAudioFeatures = await this.getAlbumAudioFeatures(id);
      this.$emit("albumSelected", albumAudioFeatures);
    },
    openAlbumWithSpotify(url) {
      window.open(url, "_blank").focus();
    },
  },
};
</script>
<style scoped>
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
.album-image {
  width: 15rem;
  height: auto;
}
.open-album-link {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 99;
}
#openWithSpotify {
  z-index: 10;
  color: var(--spotify-green);
}
.album-data {
  text-align: left;
  padding: 0.3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}
.album-release-date-artist {
  text-align: left;
  color: var(--dark-gray);
}
.album-name {
  font-weight: 700;
  color: var(--white);
}
</style>
