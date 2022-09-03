<template>
  <nav class="navbar">
    <h2 @click="redirectToDashboard">Dashboard</h2>
    <button class="logout-spotify-button" @click="logoutFromApp">
      <font-awesome-icon icon="fa-brands fa-spotify" />Log out
    </button>
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
      this.$router.push("login");
    },
    redirectToDashboard() {
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>
<style>
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
  gap: 0.3rem;
}

.logout-spotify-button:hover {
  background-color: var(--spotify-green);
  color: var(--black);
  opacity: 0.95;
}
</style>
