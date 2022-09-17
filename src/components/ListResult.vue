<template>
  <div class="individual-result" @click="selectSong(song.track_id)">
    <div class="track-data">
      <img :src="song.album_image" class="album-image" />
      <div>
        <p class="track-name">{{ song.track_name }}</p>
        <p class="artist-name">{{ song.artist_name }}</p>
      </div>
    </div>
    <div class="track-actions">
      <font-awesome-icon icon="fa-brands fa-spotify" id="openWithSpotify" @click="openSongOnSpotify(song.songUri)" />
      <p class="track-duration">
        {{ msToMinutesAndSeconds(song.duration) }}
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import spotifyStore from "@/store/spotify";
export default {
  props: {
    song: Object,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(spotifyStore, ["getTrackAudioFeatures"]),
    async selectSong(id) {
      let trackAudioFeatures = await this.getTrackAudioFeatures(id);
      this.$emit("songSelected", trackAudioFeatures);
      this.$emit("goToNextStep");
    },
    openSongOnSpotify(url) {
      window.open(url, "_blank").focus();
    },
    msToMinutesAndSeconds(ms) {
      let minutes = Math.floor(ms / 60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },
  },
};
</script>
<style scoped>
.individual-result {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0 5px;
}
.individual-result:hover {
  background-color: var(--spotify-gray);
}
.track-data {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  padding: 0.5rem;
}
.track-name {
  font-weight: 700;
  color: var(--white);
}

.artist-name {
  color: var(--dark-gray);
}
.track-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.album-image {
  width: 3rem;
  height: auto;
}
.track-duration {
  color: var(--gray);
}
#openWithSpotify {
  color: var(--spotify-green);
}
</style>
