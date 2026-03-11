const fs = require("fs");
const fetch = require("node-fetch"); // npm install node-fetch@2

const API_KEY = process.env.YOUTUBE_API_KEY;          // Replace with your key
const PLAYLISTS = [
  // { id: "PLD3GE-eEZ8mnp4JT2FPdaeQeByNoemMFp", category: "Conferences", playlist: "Manchester Supervision Conference 2024" },

  // { id: "PLD3GE-eEZ8mnyA6RWxes4_dbqoL8Zq33S", category: "Conferences", playlist: "MIP Therapy Conference 2024" },

  { id: "PLD3GE-eEZ8mneACdU0SaH40NS4I_JbeWw", category: "Podcasts", playlist: "The Therapy Show - Behind Closed Doors" },

  { id: "PLD3GE-eEZ8mmgX17JzJf-ZoMwt6sOGkS7", category: "Book Reviews", playlist: "Book Reviews 2021" },

  { id: "PLD3GE-eEZ8mm8dfoObb4O-fuTQg24BG34", category: "Therapy Demonstrations", playlist: "Therapy Demonstration" },

  // { id: "PLD3GE-eEZ8mmy7AA8IR72H_JL61tx3K2C", category: "Conferences", playlist: "2019 Conference Presenters" },

  { id: "PLD3GE-eEZ8mkVbvksy1mxXYJOQUDN-vbK", category: "TA Theory Explained", playlist: "TA Theory Explained" },

  // { id: "PLD3GE-eEZ8mnrq6V0yJA2wjmhWDbfwVjm", category: "Other Content", playlist: "UKCP" },

  { id: "PLD3GE-eEZ8mnWGxm1NfQPa4stinrr_FcW", category: "TA Theory Explained", playlist: "Applied Skills in TA" },

  { id: "PLD3GE-eEZ8mnUE-VKjEmNz8M7tLOqL0x4", category: "Meet the Team", playlist: "Meet our therapists" },

  { id: "PLD3GE-eEZ8mlUmMi3WPjyQWGa45rTyH2H", category: "Meet the Team", playlist: "Meet the trainers" },

  // { id: "PLD3GE-eEZ8mmaMONqpo6RzsIUIQ4yVv1t", category: "Conferences", playlist: "MIP Conference 2017" },

  // { id: "PLD3GE-eEZ8mnQzv5zK9m7CZjp-fNDI7me", category: "Other Content", playlist: "Great Tapes" },

  // { id: "PLD3GE-eEZ8mmzb_SF8TSKTSmIHBAHeHgu", category: "Other Content", playlist: "Erskine" },

  { id: "PLD3GE-eEZ8mlWfrbu0hnzP6Ekb_g2OoF_", category: "Book Reviews", playlist: "Book Reviews" },

  { id: "PLD3GE-eEZ8mnHLUZ3AfM1wVvL577i7gN3", category: "Supervision Videos", playlist: "Seven Eyed Model of Supervision" },

  { id: "PLD3GE-eEZ8mn3NTSz_OKlQi14haZQ1euj", category: "Meet the Team", playlist: "Manchester Institute for Psychotherapy - Who we are" },

  // { id: "FLh7HBW11XdL1jxAyDWwG8mg", category: "Other Content", playlist: "Favourites" }
];

const videos = [];

async function fetchPlaylist(playlistId, category, playlist) {

  let nextPageToken = "";

  do {

    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}&pageToken=${nextPageToken}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.items) break;

    data.items.forEach(item => {

      const videoId = item.snippet.resourceId.videoId;
      const title = item.snippet.title;

      if (!videoId || title === "Private video" || title === "Deleted video") return;

      videos.push({
        id: videoId,
        title,
        description: item.snippet.description,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        category,
        playlist,
        publishedAt: item.snippet.publishedAt,
        type: "video",
        source: "YouTube"
      });

    });

    nextPageToken = data.nextPageToken || "";

  } while (nextPageToken);
}

async function fetchAll() {

  for (const p of PLAYLISTS) {

    console.log(`Fetching ${p.playlist}`);
    await fetchPlaylist(p.id, p.category, p.playlist);

  }

  // Remove duplicates
  // const uniqueVideos = Array.from(
  //   new Map(videos.map(v => [v.id, v])).values()
  // );
 const uniqueVideos = Array.from(
  new Map(videos.map(v => [`${v.id}-${v.playlist}`, v])).values()
);;

  // Remove podcasts
  const videoOnly = uniqueVideos.filter(v => v.category !== "Podcasts");

// SORT NEWEST FIRST
  videoOnly.sort((a,b)=> new Date(b.publishedAt) - new Date(a.publishedAt))


  // Save
  fs.writeFileSync(
    "src/data/videos.ts",
    `export const videos = ${JSON.stringify(videoOnly, null, 2)}`
  );

  console.log(`Saved ${videoOnly.length} videos`);
}

fetchAll();
