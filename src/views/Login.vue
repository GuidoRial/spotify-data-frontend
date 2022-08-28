<template>
  <div class="d-flex-justify-align-center login-container">
    <button class="login-spotify-button" @click="loginWithSpotify">
      Login with Spotify
    </button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      AUTH_URL:
        "https://accounts.spotify.com/authorize?client_id=765707358be3421695e00c9aebb02c4c&response_type=code&redirect_uri=http://localhost:8080/login&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state",
      code: window.location.search.substring(6),
    };
  },
  methods: {
    async loginWithSpotify() {
      try {
        window.location.replace(this.AUTH_URL);
      } catch (e) {
        throw e;
      }
    },
  },
  mounted() {
    if (!this.code) {
      this.code = window.location.search.substring(6);
    } else {
      localStorage.setItem("code", this.code);
      this.$router.push("/dashboard");
    }
  },
};
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
}
.login-spotify-button {
  width: 12rem;
  height: 5rem;
  background-color: #2aa648;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  font-size: 0.9rem;
}
.login-spotify-button:hover {
  opacity: 0.9;
}
</style>
