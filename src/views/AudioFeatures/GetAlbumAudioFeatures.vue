<template>
  <Navbar />
  <div class="get-album-audio-features">
    <div class="steps">
      <IndividualStep :stepNumber="1" stepName="Look for an album" :currentStep="currentStep" />
      <IndividualStep :stepNumber="2" stepName="Understand the result" :currentStep="currentStep" />
    </div>
    <div class="search-section" v-if="currentStep === 1">
      <input type="text" class="search-bar" placeholder="Album..." v-model="searchBar" />
      <button class="search-button" @click="searchAlbum(this.searchBar)"><font-awesome-icon icon="fa-solid fa-magnifying-glass" />Search</button>
    </div>

    <Explanation text="Write the name of an album, then click on it..." v-if="!searchResults?.length && currentStep === 1" />

    <div class="search-result-section" v-else-if="searchResults?.length && currentStep === 1">
      <div v-for="(result, i) in searchResults" :key="i">
        <CardResult :album="result" @goToNextStep="this.currentStep = 2" @albumSelected="displayAlbum" />
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
import CardResult from "@/components/CardResult.vue";

export default {
  name: "get-album-audio-features",
  components: {
    Navbar,
    IndividualStep,
    Explanation,
    CardResult,
  },
  data() {
    return {
      currentStep: 1,
      searchBar: null,
      searchResults: [],
      albumData: null,
    };
  },
  methods: {
    ...mapActions(spotifyStore, ["searchForAlbum", "getAlbumAudioFeatures"]),
    async searchAlbum(searchBar) {
      try {
        if (this.searchResults.length) this.searchResults = [];
        if (!searchBar) return;
        let albumOptions = await this.searchForAlbum(searchBar);
        this.searchResults = albumOptions;
        this.searchBar = null;
      } catch (e) {
        throw e;
      }
    },

    displayAlbum(albumAudioFeatures) {
      // Receive album audio features through an event
      console.log(albumAudioFeatures);
    },
    restart() {
      this.currentStep = 1;
      this.searchBar = null;
      this.searchResults = [];
      this.albumData = null;
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

#openWithSpotify {
  z-index: 10;
  color: var(--spotify-green);
}

.search-result-section {
  height: 70vh;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
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

.get-album-audio-features {
  background-color: var(--black);
  height: 89vh;
}
.steps {
  display: flex;
  justify-content: center;
  height: 3rem;
}
</style>
