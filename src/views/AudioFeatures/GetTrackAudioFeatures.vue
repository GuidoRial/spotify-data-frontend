<template>
  <Navbar />
  <div class="get-track-audio-features">
    <div class="steps">
      <IndividualStep :stepNumber="1" stepName="Look for a song" :currentStep="currentStep" />
      <IndividualStep :stepNumber="2" stepName="Understand the result" :currentStep="currentStep" />
    </div>
    <div class="search-section" v-if="currentStep === 1">
      <input type="text" class="search-bar" placeholder="Song..." v-model="searchBar" />
      <button class="search-button" @click="searchSong(this.searchBar)"><font-awesome-icon icon="fa-solid fa-magnifying-glass" />Search</button>
    </div>

    <Explanation text="Write the name of a song, then click on it..." v-if="!searchResults?.length && currentStep === 1" />

    <div class="search-result-section" v-else-if="searchResults?.length && currentStep === 1" :key="i">
      <div class="search-results" v-for="(result, i) in searchResults">
        <div class="individual-result" @click="selectSong(result.track_id)">
          <div class="track-data">
            <img :src="result.album_image" class="album-image" />
            <div>
              <p class="track-name">{{ result.track_name }}</p>
              <p class="artist-name">{{ result.artist_name }}</p>
            </div>
          </div>
          <div class="track-actions">
            <font-awesome-icon icon="fa-brands fa-spotify" id="openWithSpotify" @click="openSongOnSpotify(result.songUri)" />
            <p class="track-duration">
              {{ msToMinutesAndSeconds(result.duration) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="currentStep === 2">
      <div>Graph goes here</div>
      <div>Interpretation goes here</div>
      <div>
        <button class="restart-button" @click="restart">Restart?</button>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import spotifyStore from "@/store/spotify";
import { mapActions } from "pinia";
import IndividualStep from "@/components/IndividualStep.vue";
import Explanation from "@/components/Explanation.vue";
export default {
  name: "get-track-audio-features",
  components: {
    Navbar,
    IndividualStep,
    Explanation,
  },
  data() {
    return {
      currentStep: 1,
      searchBar: null,
      searchResults: [],
      songId: null,
      trackData: null,
    };
  },
  methods: {
    ...mapActions(spotifyStore, ["searchForSong", "getTrackAudioFeatures"]),
    async searchSong(searchBar) {
      try {
        if (this.searchResults.length) this.searchResults = [];
        if (!searchBar) return;
        let tracksOptions = await this.searchForSong(searchBar);
        this.searchResults = tracksOptions;
        this.searchBar = null;
      } catch (e) {
        throw e;
      }
    },
    msToMinutesAndSeconds(ms) {
      let minutes = Math.floor(ms / 60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },
    openSongOnSpotify(url) {
      window.open(url, "_blank").focus();
    },
    async selectSong(id) {
      this.songId = id;
      await this.getSongAudioFeatures(id);
      this.currentStep = 2;
    },
    async getSongAudioFeatures(id) {
      try {
        let trackAudioFeatures = await this.getTrackAudioFeatures(id);
        this.trackData = trackAudioFeatures;
        console.log(this.trackData);
      } catch (e) {
        throw e;
      }
    },
    restart() {
      this.currentStep = 1;
      this.searchBar = null;
      this.searchResults = [];
      this.songId = null;
      this.trackData = null;
    },
  },
};
</script>
<style scoped>
.restart-button {
  width: 7rem;
  height: 2rem;
  cursor: pointer;
  background-color: var(--spotify-green);
  color: var(--white);
  font-weight: 700;
  border-radius: 10px;
}
.how-to-use {
  padding: 1rem;
}
.explanation {
  font-size: 1.5rem;
  color: var(--white);
}
#openWithSpotify {
  color: var(--spotify-green);
}
.track-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.search-result-section {
  height: 70vh;
  overflow: scroll;
  overflow-x: hidden;
}
.track-duration {
  color: var(--gray);
}
.track-data {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  padding: 0.5rem;
}
.search-results {
  display: flex;
  justify-content: center;
}
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
.track-name {
  font-weight: 700;
  color: var(--white);
}

.artist-name {
  color: var(--dark-gray);
}
.album-image {
  width: 3rem;
  height: auto;
}
.search-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 0.5rem;
}
.search-button {
  width: 8rem;
  height: 2.3rem;
  border-radius: 30px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--black);
  background-color: var(--white);
  cursor: pointer;
}
.search-bar {
  width: 40rem;
  height: 1rem;
  border-radius: 30px;
  padding: 0.5rem;
  border: none;
}
.search-bar:focus,
.search-bar:active {
  outline: none;
}

.get-track-audio-features {
  background-color: var(--black);
  height: 89vh;
}
.steps {
  display: flex;
  justify-content: center;
  height: 3rem;
}
</style>
