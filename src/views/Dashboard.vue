<template>
  <Navbar />
  <div class="individual-functionality-container">
    <div class="functionality-section">
      <h2 class="section-title">Audio features</h2>
    </div>
    <div class="individual-functionality-item">
      <div class="functionality-title-and-description">
        <p class="font-weight-bold functionality-title">
          Get Track's Audio Features
        </p>
        <p class="functionality-description">
          ⎼ Understand why a song sounds the way it does
        </p>
      </div>
      <div class="functionality-call-to-action">
        <button
          class="go-to-functionality-button"
          @click="redirectToChildren({ name: 'get-track-audio-features' })"
        >
          Go
        </button>
      </div>
    </div>
    <div class="individual-functionality-item">
      <div class="functionality-title-and-description">
        <p class="font-weight-bold functionality-title">
          Get Album's Audio Features
        </p>
        <p class="functionality-description">
          ⎼ Dig deep into an album, understand and compare songs to each other
        </p>
      </div>
      <div class="functionality-call-to-action">
        <button
          class="go-to-functionality-button"
          @click="redirectToChildren({ name: 'get-album-audio-features' })"
        >
          Go
        </button>
      </div>
    </div>
    <div class="functionality-section">
      <h2 class="section-title">Understanding Artists</h2>
    </div>
    <div class="individual-functionality-item">
      <div class="functionality-title-and-description">
        <p class="font-weight-bold functionality-title">
          Compare artist to their related artists
        </p>
        <p class="functionality-description">
          ⎼ Find an artist you like, compare their top 10 songs with their
          related artists' top 10
        </p>
      </div>
      <div class="functionality-call-to-action">
        <button class="go-to-functionality-button">Go</button>
      </div>
    </div>
    <div class="individual-functionality-item">
      <div class="functionality-title-and-description">
        <p class="font-weight-bold functionality-title">
          Compare artist to other artists you like
        </p>
        <p class="functionality-description">
          ⎼ Select a few artist and compare their most famous songs
        </p>
      </div>
      <div class="functionality-call-to-action">
        <button class="go-to-functionality-button">Go</button>
      </div>
    </div>

    <div class="functionality-section">
      <h2 class="section-title">Creating playlists</h2>
    </div>
    <div class="individual-functionality-item">
      <div class="functionality-title-and-description">
        <p class="font-weight-bold functionality-title">Hidden Gems</p>
        <p class="functionality-description">
          ⎼ Give us a few artists you like and what kind of music you want,
          we'll take care of the rest
        </p>
      </div>
      <div class="functionality-call-to-action">
        <button class="go-to-functionality-button">Go</button>
      </div>
    </div>
    <div class="individual-functionality-item">
      <div class="functionality-title-and-description">
        <p class="font-weight-bold functionality-title">
          Easily create playlists
        </p>
        <p class="functionality-description">
          ⎼ You tell us what you want, we'll use Spotify's API to give it to you
          :)
        </p>
      </div>
      <div class="functionality-call-to-action">
        <button class="go-to-functionality-button">Go</button>
      </div>
    </div>
  </div>
</template>
<script>
import authStore from "../store/auth";
import { mapActions } from "pinia";
import lyricsStore from "../store/lyrics";
import Navbar from "../components/Navbar.vue";

export default {
  name: "dashboard",
  data() {
    return {
      code: localStorage.getItem("code"),
    };
  },
  components: {
    Navbar,
  },
  async mounted() {
    setTimeout(() => {
      if (!localStorage.getItem("access-token")) {
        console.log("Not logged in");
        this.$router.push("login");
        return;
      }
    }, 1000);
  },
  methods: {
    ...mapActions(authStore, ["logout"]),
    ...mapActions(lyricsStore, ["getLyrics"]),
    redirectToChildren(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style>
.functionality-section {
  display: flex;
  justify-content: center;
}
.section-title {
  margin-top: 0.5rem;
  color: var(--spotify-green) !important;
}
.individual-functionality-container {
  background-color: var(--black);
  padding: 1rem;
  height: 86vh;
}
.individual-functionality-item {
  border-bottom: 1px solid var(--spotify-green);
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem;
}
.functionality-title-and-description {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
}
.functionality-title {
  font-size: 1.1rem;
  color: var(--white);
}
.functionality-description {
  font-size: 1.1rem;
  color: var(--dark-gray);
}
.go-to-functionality-button {
  background-color: var(--black);
  border: 1px solid var(--spotify-green);
  width: 5rem;
  height: 1.5rem;
  color: var(--spotify-green);
  font-weight: 700;
  cursor: pointer;
  border-radius: 7px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.go-to-functionality-button:hover {
  background-color: var(--spotify-green);
  color: var(--black);
  opacity: 0.95;
}
</style>
