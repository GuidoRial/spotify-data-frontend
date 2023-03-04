<template>
  <nav class="navbar">
    <h2>Spotify Data Visualizer</h2>
    <div class="navbar-sections">
      <p class="navbar-section" @click="redirectToDashboard">Dashboard</p>
      <p class="navbar-section">About us</p>
      <LogoutButton />
    </div>
  </nav>
</template>
<script>
import authStore from "../store/auth";
import { mapActions } from "pinia";
import LogoutButton from "./LogoutButton.vue";
export default {
  name: "navbar",
  methods: {
    ...mapActions(authStore, ["logout"]),
    redirectToDashboard() {
      this.$router.push({ name: "dashboard" });
    },
  },
  components: { LogoutButton },
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

.navbar>h2 {
  cursor: pointer;
  color: var(--white);
}</style>
