<template>
  <nav class="navbar">
    <h2>Dashboard</h2>
    <button @click="logout">Log out</button>
  </nav>
  <div>
    <input
      type="text"
      v-model="searchBar"
      placeholder="Search for Artists/bands"
    />
    <button type="submit" @click="search($event)">Search</button>
  </div>
  <div v-for="(track, i) in searchResults" :key="i" @click="handlePlay">
    <img :src="track.albumUrl" />
    <div>Title: {{ track.title }}</div>
    <div>Artist: {{ track.artist }}</div>
  </div>
  <div>
    <buton @click="testFn">Test here</buton>
    <button @click="getLyrics('Numb', 'Linkin Park')">Get lyrics</button>
  </div>
</template>
<script>
import authStore from "@/store/auth";
import axios from "axios";
import { mapState } from "pinia";
import SpotifyWebApi from "spotify-web-api-node";
export default {
  name: "dashboard",
  data() {
    return {
      code: localStorage.getItem("code"),
      searchBar: null,
      spotifyApi: new SpotifyWebApi({
        clientId: "765707358be3421695e00c9aebb02c4c",
        accessToken: null,
      }),
      searchResults: [],
      lyrics: [],
    };
  },
  mounted() {
    // console.log(this.code);
    if (!localStorage.getItem("code")) {
      this.$router.push("/login");
    }
    if (this.accessToken) {
      this.spotifyApi._credentials.accessToken = this.accessToken;
    }
    // console.log(this.spotifyApi);
  },
  methods: {
    getLyrics(title, artist) {
      axios
        .get("http://localhost:3001/lyrics", {
          params: {
            track: title,
            artist: artist,
          },
        })
        .then((res) => {
          this.lyrics = res.data.lyrics;
          console.log(this.lyrics);
        });
    },
    testFn() {
      // console.log(this.spotifyApi);
      this.spotifyApi
        // .searchArtists("Son")
        // .searchTracks("numb")
        // .getArtist("2hazSY4Ef3aB9ATXW7F5w3")
        // .getMyTopArtists()
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    },
    logout() {
      localStorage.removeItem("code");
      this.$router.push("login");
    },
    search(e) {
      e.preventDefault();
      console.log(this.searchBar);
      if (!this.searchBar) this.searchResults = [];
      if (!this.accessToken) return;

      this.spotifyApi.searchTracks(this.searchBar).then((res) => {
        this.searchResults = res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        });

        console.log(this.searchResults);
      });
    },
  },
  computed: {
    ...mapState(authStore, ["accessToken"]),
  },
};
</script>
