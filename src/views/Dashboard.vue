<template>
  <nav class="navbar">
    <h2>Dashboard</h2>
    <button @click="logoutFromApp">Log out</button>
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
    <button @click="testFn">Test here</button>
    <button
      @click="getLyricsFromBackend({ artist: 'Linkin Park', track: 'Numb' })"
    >
      Get lyrics
    </button>
  </div>
</template>
<script>
import authStore from "../store/auth";
import { mapActions, mapState } from "pinia";
import SpotifyWebApi from "spotify-web-api-node";
import lyricsStore from "../store/lyrics";
import spotifyStore from "../store/spotify";

export default {
  name: "dashboard",
  data() {
    return {
      code: localStorage.getItem("code"),
      searchBar: null,
      spotifyApi: new SpotifyWebApi({
        clientId: "765707358be3421695e00c9aebb02c4c",
        accessToken: localStorage.getItem("access-token"),
      }),
      searchResults: [],
      lyrics: [],
    };
  },
  computed: {
    ...mapState(authStore, ["isLoggedIn", "accessToken"]),
  },
  async mounted() {
    // console.log("here", this.accessToken);
    setTimeout(() => {
      if (!localStorage.getItem("access-token")) {
        console.log("Not logged in");
        this.$router.push("login");
        return;
      }
    }, 1000);
    // Might fail if accessToken is not properly loaded to state
    // let audioFeatures = await this.getTrackAudioFeatures(
    //   "11dFghVXANMlKmJXsNCbNl",
    //   this.accessToken
    // );

    // let albumAudioFeatures = await this.getAlbumAudioFeatures(
    //   "4aawyAB9vmqN3uQ7FjRGTy",
    //   this.accessToken
    // );

    // let linkinParkSong = await this.getSongSentimentAnalysis({
    //   artist: "Linkin Park",
    //   track: "Numb",
    // });
    // console.log(linkinParkSong); // 0.0043859649122807015

    // let PharrelWilliamsSong = await this.getSongSentimentAnalysis({
    //   artist: "Pharrell Williams",
    //   track: "Happy ",
    // });
    // console.log(PharrelWilliamsSong); //0.19230769230769232
  },
  methods: {
    ...mapActions(authStore, ["logout"]),
    ...mapActions(lyricsStore, ["getLyrics"]),
    ...mapActions(spotifyStore, [
      "getTrackAudioFeatures",
      "getAlbumAudioFeatures",
      "getSongSentimentAnalysis",
    ]),
    logoutFromApp() {
      this.logout();
      this.$router.push("login");
    },
    // testFn() {
    //   // console.log(this.spotifyApi);
    //   this.spotifyApi
    //     // .searchArtists("Son")
    //     // .searchTracks("numb")
    //     .getArtist("2hazSY4Ef3aB9ATXW7F5w3")
    //     // .getMyTopArtists()
    //     .then((res) => console.log(res))
    //     .catch((e) => console.log(e));
    // },
    search(e) {
      e.preventDefault();
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
};
</script>
