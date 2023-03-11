<template>
  <button class="logout-spotify-button" @click="logoutFromApp"><font-awesome-icon
      icon="fa-solid fa-right-from-bracket" />Log out</button>
</template>

<script>
import { mapActions } from "pinia";
import authStore from "@/store/auth";
export default {
  name: "logout-button",
  methods: {
    ...mapActions(authStore, ["logout"]),
    logoutFromApp() {
      this.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.logout-spotify-button {
  background-color: var(--black);
  border: 1px solid var(--spotify-green);
  width: 8rem;
  height: 2.5rem;
  color: var(--spotify-green);
  font-weight: 700;
  cursor: pointer;
  border-radius: var(--border-small);
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
