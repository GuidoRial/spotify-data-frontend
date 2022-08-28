import { defineStore } from "pinia";

const authStore = defineStore("auth", {
  state: () => {
    return {
      token: "",
      code: "",
    };
  },
  actions: {
    login() {},
  },
});
