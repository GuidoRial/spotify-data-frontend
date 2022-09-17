<template>
  <Navbar />
  <div class="get-album-audio-features">
    <div class="steps">
      <div class="individual-step">
        <div :class="currentStep === 1 ? 'step-number-container-selected' : 'step-number-container-not-selected'">
          <p :class="currentStep === 1 ? 'step-number-selected' : 'step-number-not-selected'">1</p>
        </div>
        <div class="step-name">Look for an album</div>
      </div>
      <div class="individual-step">
        <div :class="currentStep === 2 ? 'step-number-container-selected' : 'step-number-container-not-selected'">
          <p :class="currentStep === 2 ? 'step-number-selected' : 'step-number-not-selected'">2</p>
        </div>
        <div class="step-name">Understand the result</div>
      </div>
    </div>
    <div class="search-section" v-if="currentStep === 1">
      <input type="text" class="search-bar" placeholder="Album..." v-model="searchBar" />
      <button class="search-button" @click="searchAlbum(this.searchBar)"><font-awesome-icon icon="fa-solid fa-magnifying-glass" />Search</button>
    </div>
    <div class="how-to-use" v-if="!searchResults?.length && currentStep === 1">
      <p class="explanation">Write the name of an album, then click on it...</p>
    </div>
    <div class="search-result-section" v-else-if="searchResults?.length && currentStep === 1">
      <div v-for="(result, i) in searchResults" :key="i">
        <div class="individual-result" @click="selectAlbum(result.album_id)">
          <img :src="result.album_image" class="album-image" />
          <div class="album-data">
            <div class="data">
              <p class="album-name">{{ result.album_name }}</p>
              <p class="album-release-date-artist">
                {{ new Date(result.release_date).getFullYear() }} 🞄
                {{ result.artist_name }}
              </p>
            </div>
            <div class="open-album-link" @click="openAlbumWithSpotify(result.album_uri)">
              <font-awesome-icon icon="fa-brands fa-spotify" id="openWithSpotify" />
            </div>
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
export default {
  name: "get-album-audio-features",
  components: {
    Navbar,
  },
  data() {
    return {
      currentStep: 1,
      searchBar: null,
      searchResults: [],
      albumId: null,
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
    openAlbumWithSpotify(url) {
      window.open(url, "_blank").focus();
    },
    async selectAlbum(id) {
      this.albumId = id;
      await this.getAlbumData(id);
      this.currentStep = 2;
    },
    async getAlbumData(id) {
      try {
        let albumAudioFeatures = await this.getAlbumAudioFeatures(id);
        this.albumData = albumAudioFeatures;
        console.log(this.albumData);
      } catch (e) {
        throw e;
      }
    },
    restart() {
      this.currentStep = 1;
      this.searchBar = null;
      this.searchResults = [];
      this.albumId = null;
      this.albumData = null;
    },
  },
};
</script>
<style scoped>
.open-album-link {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 99;
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
.step-name {
  font-weight: 700;
  color: var(--white);
}
.step-number-not-selected {
  color: var(--white);
  font-weight: 700;
}
.step-number-selected {
  color: var(--black);
  font-weight: 700;
}
.step-number-container-selected {
  border: 1px solid var(--black);
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
}
.step-number-container-not-selected {
  border: 1px solid var(--white);
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.individual-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 1rem;
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
