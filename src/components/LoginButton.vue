<template>
  <button class="login-spotify-button" @click="sendRequestToSpotify"><font-awesome-icon
      icon="fa-brands fa-spotify" />Login with Spotify</button>
</template>
<script>
import { mapActions } from "pinia";
import authStore from "@/store/auth";
export default {
  name: "login-button",
  data() {
    return {
      AUTH_URL:
        `https://accounts.spotify.com/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.VUE_APP_REDIRECT_URI}&scope=streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state`,
      code: window.location.search.substring(6),
    };
  },
  methods: {
    ...mapActions(authStore, ["login"]),
    async sendRequestToSpotify() {
      try {
        window.location.replace(this.AUTH_URL);
      } catch (e) {
        throw e;
      }
    },
  },
  mounted() {
    if (localStorage.getItem("access-token")) {
      console.log("Already logged in");
      this.$router.push("dashboard");
      return;
    }
    if (this.code) {
      localStorage.setItem("code", JSON.stringify(this.code));
      this.login(this.code);
      this.$router.push("dashboard");
    }
  },
};
</script>

<style scoped>
.login-spotify-button {
  border: none;
  width: 12rem;
  height: 3rem;
  background-color: var(--spotify-green);
  color: var(--white);
  font-weight: 700;
  cursor: pointer;
  border-radius: 7px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.login-spotify-button:hover {
  opacity: 0.9;
}
</style>
