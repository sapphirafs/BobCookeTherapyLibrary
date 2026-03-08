const fs = require("fs");
const fetch = require("node-fetch"); // npm install node-fetch@2

const API_KEY = "AIzaSyCXQtbfNKFkaHXMT4PEqxq70qLsyhEtpoQ";          // Replace with your key
const PLAYLIST_IDS = [
  "PLD3GE-eEZ8mnp4JT2FPdaeQeByNoemMFp",
  "PLD3GE-eEZ8mnyA6RWxes4_dbqoL8Zq33S",
  "PLD3GE-eEZ8mneACdU0SaH40NS4I_JbeWw",
  "PLD3GE-eEZ8mmgX17JzJf-ZoMwt6sOGkS7",
  "PLD3GE-eEZ8mm8dfoObb4O-fuTQg24BG34",
  "PLD3GE-eEZ8mmy7AA8IR72H_JL61tx3K2C",
  "PLD3GE-eEZ8mkVbvksy1mxXYJOQUDN-vbK",
  "PLD3GE-eEZ8mnrq6V0yJA2wjmhWDbfwVjm",
  "PLD3GE-eEZ8mnWGxm1NfQPa4stinrr_FcW",
  "PLD3GE-eEZ8mnUE-VKjEmNz8M7tLOqL0x4",
  "PLD3GE-eEZ8mlUmMi3WPjyQWGa45rTyH2H",
  "PLD3GE-eEZ8mmaMONqpo6RzsIUIQ4yVv1t",
  "PLD3GE-eEZ8mnQzv5zK9m7CZjp-fNDI7me",
  "PLD3GE-eEZ8mmzb_SF8TSKTSmIHBAHeHgu",
  "PLD3GE-eEZ8mlWfrbu0hnzP6Ekb_g2OoF_",
  "PLD3GE-eEZ8mnHLUZ3AfM1wVvL577i7gN3",
  "PLD3GE-eEZ8mn3NTSz_OKlQi14haZQ1euj",
  "FLh7HBW11XdL1jxAyDWwG8mg"
];

const videos = [];

async function fetchPlaylist(playlistId) {
  let nextPageToken = "";

  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}&pageToken=${nextPageToken}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items) break;

    data.items.forEach(item => {
      videos.push({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
        category: "video",
        type: "video",
        source: "YouTube"
      });
    });

    nextPageToken = data.nextPageToken || "";
  } while (nextPageToken);
}

async function fetchAll() {
  for (const id of PLAYLIST_IDS) {
    console.log(`Fetching playlist: ${id}`);
    await fetchPlaylist(id);
  }

  // Remove duplicates (sometimes the same video is in multiple playlists)
  const uniqueVideos = Array.from(new Map(videos.map(v => [v.id, v])).values());

  fs.writeFileSync("src/data/videos.ts", `export const videos = ${JSON.stringify(uniqueVideos, null, 2)}`);
  console.log(`Saved ${uniqueVideos.length} videos to src/data/videos.ts`);
}

fetchAll();
