import { defineStore } from "pinia";
import lyrics from "../service/lyrics";

const lyricsStore = defineStore("lyrics", {
  state: () => {
    return {};
  },
  actions: {
    async getLyrics(song) {
      try {
        const res = await lyrics.getLyrics(song);
        return res.lyrics;
      } catch (e) {
        throw e;
      }
    },
  },
});

export default lyricsStore;
