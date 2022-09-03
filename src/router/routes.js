import Login from "../views/Login.vue";
import Landing from "../views/Landing.vue";
import Dashboard from "../views/Dashboard.vue";
import GetTrackAudioFeatures from "../views/AudioFeatures/GetTrackAudioFeatures.vue";
import GetAlbumAudioFeatures from "../views/AudioFeatures/GetAlbumAudioFeatures.vue";
const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/dashboard/track-audio-features",
    name: "get-track-audio-features",
    component: GetTrackAudioFeatures,
  },
  {
    path: "/dashboard/album-audio-features",
    name: "get-album-audio-features",
    component: GetAlbumAudioFeatures,
  },
];

export default routes;
