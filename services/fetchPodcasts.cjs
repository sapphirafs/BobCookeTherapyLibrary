// fetchPodcasts.cjs
const fs = require("fs");
const fetch = require("node-fetch"); // npm install node-fetch@2

const API_KEY = process.env.YOUTUBE_API_KEY
const PLAYLIST_ID = "PLD3GE-eEZ8mneACdU0SaH40NS4I_JbeWw";

const videos = [];

async function fetchPlaylist() {
  let nextPageToken = "";

  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}&pageToken=${nextPageToken}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items) break;

    data.items.forEach(item => {
      const title = item.snippet.title;
      const videoId = item.snippet.resourceId.videoId;

      if (!videoId || title === "Private video") return;

      videos.push({
        id: videoId,
        title,
        description: item.snippet.description,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        category: "podcast",
        type: "video",
        source: "YouTube"
      });
    });

    nextPageToken = data.nextPageToken || "";
  } while (nextPageToken);

  fs.writeFileSync("src/data/podcasts.ts", `export const podcasts = ${JSON.stringify(videos, null, 2)}`);
  console.log(`Saved ${videos.length} podcasts to src/data/podcasts.ts`);
}

fetchPlaylist();
