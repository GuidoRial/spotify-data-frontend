let appFeatures = [
  {
    groupTitle: "Audio features",
    groupSections: [
      {
        title: `Get Track's Audio Features`,
        description: `Understand why a song sounds the way it does`,
        route: { name: "get-track-audio-features" },
      },
      {
        title: `Get Album's Audio Features`,
        description: `Dig deep into an album, understand and compare songs to each other`,
        route: { name: "get-album-audio-features" },
      },
    ],
  },
  {
    groupTitle: "Understanding Artists",
    groupSections: [
      {
        title: `Compare artist to their related artists`,
        description: `Find an artist you like, compare their top 10 songs with their related artists' top 10`,
        route: { name: "get-track-audio-features" },
      },
      {
        title: `Compare artist to other artists you like`,
        description: `Select a few artist and compare their most famous songs`,
        route: { name: "get-track-audio-features" },
      },
    ],
  },
  {
    groupTitle: "Creating playlists",
    groupSections: [
      {
        title: `Hidden Gems`,
        description: `Give us a few artists you like and what kind of music you want, we'll take care of the rest`,
        route: { name: "get-track-audio-features" },
      },
      {
        title: `Easily create playlists`,
        description: `You tell us what you want, we'll use Spotify's API to give it to you :)`,
        route: { name: "get-track-audio-features" },
      },
    ],
  },
];

export default appFeatures;
