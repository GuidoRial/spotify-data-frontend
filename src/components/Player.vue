<template>
  <div v-if="!isActive" class="container not-active color-white">
    <div>
      <p> You need to connect to this device through the Spotify App to enable
        playback</p>
      <p>Just follow <a class="basic-link" target=”_blank”
          href="https://explore.spotify.com/us/pages/connect-at-home">this
          guide</a>,
        remember to click on<b> Web Playback SDK </b></p>
    </div>
  </div>
  <div v-else class="container">
    <div class="main-wrapper">
      <div class="current-track">
        <img :src="currentTrack.image" class="now-playing__cover" alt="" />
        <div class="artist-and-track-text">
          <p class="now-playing__name">{{currentTrack.track_name}}</p>
          <p class="now-playing__artist">{{currentTrack.artist_name}}</p>
        </div>

      </div>

      <div class="multimedia-buttons">

        <button class="btn-spotify" @click="handlePlayer('previousTrack')">
          <font-awesome-icon icon="fa-solid fa-backward" />
        </button>

        <button class="btn-spotify" @click="handlePlayer('togglePlay')">
          <font-awesome-icon :icon="isPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause'" />
        </button>

        <button class="btn-spotify" @click="handlePlayer('nextTrack')">
          <font-awesome-icon icon="fa-solid fa-forward" />
        </button>
      </div>

      <VolumeControl :volume="volume" @volumeChanged="handleVolumeChanged" />
    </div>
  </div>
</template>
<script>
import authStore from "@/store/auth"
import { mapState } from "pinia";
import VolumeControl from "./VolumeControl.vue";
export default {
  name: "player",
  data() {
    return {
      isPaused: false,
      isActive: false,
      player: undefined,
      currentTrack: {
        image: "https://i.scdn.co/image/ab67616d00001e0260a908d78ac7ea7f9407fb77",
        artist_name: "Some-name",
        track_name: "Some-other-name",
      },
      volume: 0.9,
    };
  },
  computed: {
    ...mapState(authStore, ["accessToken"])
  },
  methods: {
    async handlePlayer(action, value) {
      switch (action) {
        case "previousTrack": {
          return await this.player.previousTrack();
        }
        case "togglePlay": {
          return await this.player.togglePlay();
        }
        case "nextTrack": {
          return await this.player.nextTrack();
        }
        case "setVolume":
        default: return await this.player.setVolume(value / 100);
      }
    },
    async handleVolumeChanged(volumeInPercentage) {
      return await this.handlePlayer('setVolume', volumeInPercentage)
    }
  },
  async mounted() {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: cb => { cb(this.accessToken); },
        volume: this.volume
      });
      this.player.addListener("ready", ({ device_id }) => {
        console.log(`Ready with device ID: ${device_id}`);
      });
      this.player.addListener("not_ready", ({ device_id }) => {
        console.log(`Device with id ${device_id} has gone offline`);
      });
      this.player.addListener("player_state_changed", (state => {
        if (!state) {
          return;
        }

        console.log(state)
        const { current_track } = state.track_window;
        if (!Object.keys(current_track).length || typeof current_track === "undefined") {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        const track = {
          image: current_track.album.images[0].url,
          artist_name: current_track.artists[0]?.name,
          track_name: current_track.name
        };
        this.currentTrack = track;
        this.isPaused = state.paused;

      }));
      this.player.connect().then(success => {
        if (success) {
          console.log("The Web Playback SDK successfully connected to Spotify!");

        }
      });
    };


  },
  components: { VolumeControl }
}
</script>
<style scoped>
.container {
  background-color: var(--spotify-gray);
  height: 6.5rem;
  width: 60rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  border-radius: var(--border-medium);
  left: 50%;
  transform: translateX(-50%);
}

.not-active {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: 2rem;
}

.current-track {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.now-playing__cover {
  width: 5rem;
  height: 5rem;
}

.artist-and-track-text {
  text-align: left;
  font-size: 1.2rem;
  color: var(--white);
}

.now-playing__name {
  font-weight: bold;
}

.btn-spotify {
  width: 2rem;
  height: 2rem;
  border-radius: var(--border-round);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--white);
  background-color: var(--spotify-gray);
  border: 1px solid var(--spotify-gray);
}


.direction-btn {
  color: var(--direction-btn);
}

.multimedia-buttons {
  display: flex;
  gap: 1rem;
}

.volume-selector {
  appearance: none;
  background: var(--volume-bg);
  border-radius: 5px;
  height: 0.3rem;
}
</style>