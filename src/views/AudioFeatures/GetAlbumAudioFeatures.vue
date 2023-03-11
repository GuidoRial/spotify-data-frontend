<template>
  <Navbar />
  <div class="get-album-audio-features">
    <div class="steps">
      <IndividualStep :stepNumber="1" stepName="Look for an album" :currentStep="currentStep" />
      <IndividualStep :stepNumber="2" stepName="Understand the result" :currentStep="currentStep" />
    </div>
    <div class="search-section" v-if="currentStep === 1">
      <input type="text" class="search-bar" placeholder="Album..." v-model="searchBar" />
      <SearchButton @click="searchAlbum(this.searchBar)" />
    </div>

    <Explanation text="Write the name of an album, then click on it..."
      v-if="!searchResults?.length && currentStep === 1" />

    <div class="search-result-section" v-else-if="searchResults?.length && currentStep === 1">
      <div v-for="(result, i) in searchResults" :key="i">
        <AlbumResult :album="result" @goToNextStep="this.currentStep = 2" @albumSelected="displayData" />
      </div>
    </div>

    <Spinner v-else-if="currentStep === 2 && this.loading" />

    <div v-else-if="currentStep === 2">
      <div>Graph goes here</div>
      <div>Interpretation goes here</div>
      <RestartButton @click="restart" />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import spotifyStore from "@/store/spotify";
import { mapActions, mapState } from "pinia";
import IndividualStep from "@/components/IndividualStep.vue";
import Explanation from "@/components/Explanation.vue";
import SearchButton from "@/components/SearchButton.vue";
import AlbumResult from "@/components/AlbumResult.vue";
import Spinner from "@/components/Spinner.vue";
import RestartButton from "@/components/BasicButton.vue";

export default {
  name: "get-album-audio-features",
  components: {
    Navbar,
    IndividualStep,
    Explanation,
    SearchButton,
    AlbumResult,
    Spinner,
    RestartButton
  },
  data() {
    return {
      currentStep: 1,
      searchBar: null,
      searchResults: [],
      albumData: null,
    };
  },
  computed: {
    ...mapState(spotifyStore, ["loading"]),
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
    displayData(albumAudioFeatures) {
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
  border-radius: var(--border-big);
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
  border-radius: var(--border-big);
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
