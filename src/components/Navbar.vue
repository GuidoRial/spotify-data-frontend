<template>
  <nav class="navbar">
    <h2>Spotify Data Visualizer</h2>
    <div class="navbar-sections">
      <p class="navbar-section" @click="redirectToDashboard">Dashboard</p>
      <p class="navbar-section">About us</p>
      <button class="logout-spotify-button" @click="logoutFromApp">
        <font-awesome-icon icon="fa-brands fa-spotify" />Log out
      </button>
    </div>
  </nav>
</template>
<script>
import authStore from "../store/auth";
import { mapActions } from "pinia";
export default {
  name: "navbar",
  methods: {
    ...mapActions(authStore, ["logout"]),
    logoutFromApp() {
      this.logout();
      this.$router.push({ name: "login" });
    },
    redirectToDashboard() {
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>
<style>
.navbar-sections {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.navbar-section {
  cursor: pointer;
  color: var(--white);
  font-size: 1.3rem;
}
.navbar-section:hover {
  border-bottom: 1px solid var(--white);
}
.navbar {
  background-color: var(--black);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5vh;
}
.navbar > h2 {
  cursor: pointer;
  color: var(--white);
}
.logout-spotify-button {
  background-color: var(--black);
  border: 1px solid var(--spotify-green);
  width: 8rem;
  height: 3rem;
  color: var(--spotify-green);
  font-weight: 700;
  cursor: pointer;
  border-radius: 7px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.logout-spotify-button:hover {
  background-color: var(--spotify-green);
  color: var(--black);
  opacity: 0.95;
}
</style>
