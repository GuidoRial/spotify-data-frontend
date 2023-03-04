import { defineStore } from 'pinia';
import auth from '../service/auth';

const authStore = defineStore('auth', {
  state: () => {
    return {
      accessToken: localStorage.getItem('access-token') || null,
      refreshToken: localStorage.getItem('refresh-token') || null,
      code: localStorage.getItem('code') || null,
    };
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },
  actions: {
    async login(code) {
      try {
        const res = await auth.login(code);
        this.accessToken = res.accessToken;
        this.refreshToken = res.refreshToken;
        this.code = code;
        localStorage.setItem('code', JSON.stringify(code));
        localStorage.setItem('access-token', this.accessToken);
        localStorage.setItem('refresh-token', this.refreshToken);
      } catch (e) {
        throw e;
      }
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.code = null;
      localStorage.removeItem('code');
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
    },
  },
});

export default authStore;
