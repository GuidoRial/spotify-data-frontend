<template>
  <div class="login-container container-fluid">
    <div class="login-box">
      <div>
        <p class="login-title text-center">Welcome to Spotify Data Analysis</p>
      </div>
      <div class="login-third-party-login">
        <p class="login-button-info-text login-info-text text-center">
          Log in using your Spotify account
        </p>
        <div class="login-button-container">
          <button class="login-spotify-button" @click="sendRequestToSpotify">
            <font-awesome-icon icon="fa-brands fa-spotify" />Login with Spotify
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import authStore from "../store/auth";

export default {
  name: "Login",
  data() {
    return {
      AUTH_URL:
        "https://accounts.spotify.com/authorize?client_id=765707358be3421695e00c9aebb02c4c&response_type=code&redirect_uri=http://localhost:8080/login&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state",
      code: window.location.search.substring(6),
    };
  },
  computed: {
    ...mapState(authStore, ["isLoggedIn"]),
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
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-spotify-button {
  width: 12rem;
  height: 3rem;
  background-color: #2aa648;
  color: #fff;
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
.login-gap-width {
  gap: 1rem;
  width: 65%;
}

#continueWithEmailButton {
  color: var(--white);
  background-color: var(--google-blue-text);
  font-weight: 700;
}

#continueWithEmailButton:hover {
  opacity: 0.9;
}

.question-text {
  color: var(--light-gray-text);
}

.login-signup-form-link {
  text-decoration: none;
  color: var(--soft-blue-links);
}

.signup-container {
  box-sizing: border-box;
  height: 100vh;
  background: var(--white);
  text-align: center;
  padding-top: 3rem;
  position: relative;
  padding-bottom: 5rem;
}

.login-container {
  box-sizing: border-box;
  height: 100vh;
  background: var(--light-gray-bg);
  text-align: center;
  padding-top: 30px;
  position: relative;
  padding-bottom: 40px;
}

.signup-box {
  width: 35rem;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 3rem 1rem;
}

.login-box {
  width: 40rem;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 20px 10px;
}

.header-sprite {
  background: url(https://cdn.myntassets.com/myx/images/header@2x-new16.a409d46af2e211afcaa82c1359787a90408024be.png)
    no-repeat 0 0;
  background-size: 336px 48px;
}

.login-title {
  font-size: 32px;
  margin-top: 15px;
  color: #535766;
}

.login-third-party-login {
  margin-top: 30px;
}

.login-info-text {
  color: #94969f;
  font-size: 12px;
}

.login-button-info-text {
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 20px;
}

.login-button-container {
  margin-top: 10px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.login-button {
  display: block;
  margin: 0 auto;
  width: 100%;
  padding-left: 40%;
  position: relative;
  font-size: 13px;
  font-weight: 500;
  color: var(--google-blue-text);
  height: 3rem;
  border: 1px solid #bfc0c6;
  background-color: var(--light-soft-blue);
  border-radius: 5px;
  border: none;
  text-align: left;
}

.signup-input-field {
  height: 2rem;
  border-radius: 5px;
  border: 1px solid var(--light-gray-bg);
  padding: 0.4rem;
  background-color: var(--input-bg-gray);
}

.signup-continue-button {
  width: 100%;
  border-radius: 5px;
  height: 3rem;
  background-color: var(--blue);
  color: var(--white);
  border: none;
}

.login-button:focus {
  outline: 0;
}

.login-button:hover {
  box-shadow: 0 2px 5px #eaeaec;
}
</style>
