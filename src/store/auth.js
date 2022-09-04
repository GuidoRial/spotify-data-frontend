import { defineStore } from "pinia";
import auth from "../service/auth";

const authStore = defineStore("auth", {
  state: () => {
    return {
      accessToken: localStorage.getItem("access-token") || null,
      code: localStorage.getItem("code") || null,
    };
  },
  getters: {
    isLoggedIn(state) {
      if (localStorage.getItem("access-token")) {
        return true;
      } else return false;
    },
  },
  actions: {
    async login(code) {
      try {
        const res = await auth.login(code);
        this.accessToken = res.accessToken;
        this.refreshToken = res.refreshToken;
        localStorage.setItem("access-token", this.accessToken);
        localStorage.setItem("refresh-token", this.refreshToken);
      } catch (e) {
        throw e;
      }
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem("code");
      localStorage.removeItem("access-token");
    },
  },
});

export default authStore;
