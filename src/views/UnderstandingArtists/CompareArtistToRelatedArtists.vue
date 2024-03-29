<template>
  <Navbar />
  <div class="compare-artist-to-related-artists">
    <div class="steps">
      <IndividualStep :stepNumber="1" stepName="Look for an artist" :currentStep="currentStep" />
      <IndividualStep :stepNumber="2" stepName="See how they compare to their related artists"
        :currentStep="currentStep" />
    </div>
    <div class="search-section" v-if="currentStep === 1">
      <input type="text" class="search-bar" placeholder="Artist..." v-model="searchBar" />
      <SearchButton @click="searchArtist(this.searchBar)" />
    </div>

    <Explanation text="Write the name of an artist, then click on it..."
      v-if="!searchResults?.length && currentStep === 1" />

    <div class="search-result-section" v-else-if="searchResults?.length && currentStep === 1">
      <div v-for="(result, i) in searchResults" :key="i">
        <ArtistResult @goToNextStep="this.currentStep = 2" @artistSelected="displayData" :artist="result" />
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
import { mapActions, mapState } from "pinia";
import spotifyStore from "@/store/spotify";
import Navbar from "@/components/Navbar.vue";
import IndividualStep from "@/components/IndividualStep.vue";
import Explanation from "@/components/Explanation.vue";
import ArtistResult from "@/components/ArtistResult.vue";
import SearchButton from "@/components/SearchButton.vue";
import Spinner from "@/components/Spinner.vue";
import RestartButton from "@/components/BasicButton.vue";

export default {
  name: "comparte-artist-to-related-artists",
  data() {
    return {
      currentStep: 1,
      searchBar: null,
      searchResults: [],
    };
  },
  computed: {
    ...mapState(spotifyStore, ["loading"]),
  },
  methods: {
    ...mapActions(spotifyStore, ["searchForArtist"]),
    async searchArtist(searchBar) {
      try {
        if (this.searchResults.length) this.searchResults = [];
        if (!searchBar) return;
        let artistOptions = await this.searchForArtist(searchBar);
        this.searchResults = artistOptions;
        this.searchBar = null;
      } catch (e) {
        throw e;
      }
    },
    displayData(data) {
      // console.log("after");
      // console.log(data);
    },
    restart() {
      this.currentStep = 1;
      this.searchbar = null;
      this.searchResults = [];
    },
  },
  components: {
    Navbar,
    IndividualStep,
    Explanation,
    ArtistResult,
    SearchButton,
    Spinner,
    RestartButton,
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
  border-radius: var(--border-medium);
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

.steps {
  display: flex;
  justify-content: center;
  height: 3rem;
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

.compare-artist-to-related-artists {
  background-color: var(--black);
  height: 89vh;
}
</style>
