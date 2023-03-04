import Login from "../views/Login.vue";
import Landing from "../views/Landing.vue";
import Dashboard from "../views/Dashboard.vue";
import GetTrackAudioFeatures from "../views/AudioFeatures/GetTrackAudioFeatures.vue";
import GetAlbumAudioFeatures from "../views/AudioFeatures/GetAlbumAudioFeatures.vue";
import CompareArtistToRelatedArtists from "../views/UnderstandingArtists/CompareArtistToRelatedArtists.vue";

import { beforeEnterLoggedIn, beforeEnterNotLoggedIn } from "./guards";

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
    beforeEnter: beforeEnterLoggedIn,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: beforeEnterNotLoggedIn,
  },
  {
    path: "/dashboard/track-audio-features",
    name: "get-track-audio-features",
    component: GetTrackAudioFeatures,
    beforeEnter: beforeEnterNotLoggedIn,
  },
  {
    path: "/dashboard/album-audio-features",
    name: "get-album-audio-features",
    component: GetAlbumAudioFeatures,
    beforeEnter: beforeEnterNotLoggedIn,
  },
  {
    path: "/dashboard/compare-artist-to-related-artists",
    name: "comparte-artist-to-related-artists",
    component: CompareArtistToRelatedArtists,
    beforeEnter: beforeEnterNotLoggedIn,
  },
];

export default routes;
