import { defineStore } from "pinia";
import axios from "axios";

const authStore = defineStore("auth", {
  state: () => {
    return {
      accessToken: localStorage.getItem("access-token") || null,
      refreshToken: localStorage.getItem("refresh-token") || null,
      expiresIn: localStorage.getItem("expires-in") || null,
      code: localStorage.getItem("code") || null,
    };
  },
  actions: {
    login(code) {
      // console.log(code);
      axios
        .post("http://localhost:3001/login", {
          code,
        })
        .then((res) => {
          this.accessToken = res.data.accessToken;
          this.refreshToken = res.data.refreshToken;
          this.expiresIn = res.data.expiresIn;
          localStorage.setItem("access-token", this.accessToken);
          localStorage.setItem("refresh-token", this.refreshToken);
          localStorage.setItem("expires-in", this.expiresIn);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});

export default authStore;
