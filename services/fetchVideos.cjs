// fetchVideos.js
const Parser = require("rss-parser");
const fs = require("fs");

const parser = new Parser();
const channelId = "UCSnEXvOOpzPkB01mvlUl-2g"; // Correct ID
const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

async function fetchYouTubeFeed() {
  const feed = await parser.parseURL(feedUrl);
  const videos = feed.items.map(item => ({
    id: item.id.replace("yt:video:", ""),
    title: item.title,
    description: item.contentSnippet,
    url: item.link,
    category: "video",
    type: "video",
    source: "YouTube"
  }));

  // Save the file inside src/data
  fs.writeFileSync("src/data/videos.ts", `export const videos = ${JSON.stringify(videos, null, 2)}`);
  console.log(`Saved ${videos.length} videos to src/data/videos.ts`);
}

fetchYouTubeFeed();
