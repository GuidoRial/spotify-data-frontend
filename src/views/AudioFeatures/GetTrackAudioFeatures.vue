<template>
  <Navbar />
  <div :style="currentStep === 2 ? { height: '111vh' } : { height: '90vh' }" class="get-track-audio-features">

    <div class="steps">
      <IndividualStep :stepNumber="1" stepName="Look for a song" :currentStep="currentStep" />
      <IndividualStep :stepNumber="2" stepName="Understand the result" :currentStep="currentStep" />
    </div>

    <div class="search-section" v-if="currentStep === 1">
      <input type="text" class="search-bar" placeholder="Song..." v-model="searchBar" />
      <SearchButton @click="searchSong(this.searchBar)" />
    </div>

    <Explanation text="Write the name of a song, then click on it..."
      v-if="!searchResults?.length && currentStep === 1" />

    <div class="search-result-section" v-else-if="searchResults?.length && currentStep === 1">
      <div class="search-results" v-for="(result, i) in searchResults" :key="i">
        <SongResult :song="result" @songSelected="displaySong" @goToNextStep="this.currentStep = 2" />
      </div>
    </div>

    <Spinner v-else-if="currentStep === 2 && this.loading" />

    <div v-else-if="currentStep === 2">
      <SpiderChart v-if="showGraph" :categories="categories" :series="series" />

      <FieldsExplanation :fieldsArray="fields" />

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
import SongResult from "@/components/SongResult.vue";
import SearchButton from "@/components/SearchButton.vue";
import Spinner from "@/components/Spinner.vue";
import RestartButton from "@/components/RestartButton.vue";
import SpiderChart from "@/components/Charts/SpiderChart.vue";
import FieldsExplanation from "@/components/fieldsExplanation.vue";
import { fields } from './fields.js'

export default {
  name: "get-track-audio-features",
  components: {
    Navbar,
    IndividualStep,
    Explanation,
    SongResult,
    SearchButton,
    Spinner,
    RestartButton,
    SpiderChart,
    FieldsExplanation
  },
  data() {
    return {
      currentStep: 1,
      searchBar: null,
      searchResults: [],
      trackData: null,
      categories: ['acousticness', 'danceability', 'energy', 'valence'],
      series: [],
      showGraph: false,
      player: undefined,
      fields: fields
    };
  },
  computed: {
    ...mapState(spotifyStore, ["loading"]),
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
    displaySong(audioFeatures) {
      const { audio_features: { acousticness, danceability, energy, valence }, song: track } = audioFeatures
      const data = [
        {
          name: `${track.artist_name} - ${track.track_name}`,
          data: [acousticness, danceability, energy, valence],
          pointPlacement: 'on',
        }
      ]
      this.series = data
      this.showGraph = true
    },

    restart() {
      this.currentStep = 1;
      this.searchBar = null;
      this.searchResults = [];
      this.trackData = null;
      this.showGraph = false
    },

  },


};
</script>
<style scoped>
.step-two-height {
  height: 111vh;
}

.restart-button {
  width: 7rem;
  height: 2rem;
  cursor: pointer;
  background-color: var(--spotify-green);
  color: var(--white);
  font-weight: 700;
  border-radius: var(--border-medium);
}

.how-to-use {
  padding: 1rem;
}

.explanation {
  font-size: 1.5rem;
  color: var(--white);
}

.search-result-section {
  height: 70vh;
  overflow: scroll;
  overflow-x: hidden;
}

.search-results {
  display: flex;
  justify-content: center;
}

.search-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 0.5rem;
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

.get-track-audio-features {
  background-color: var(--black);
  height: 90vh
}

.steps {
  display: flex;
  justify-content: center;
  height: 3rem;
}
</style>
