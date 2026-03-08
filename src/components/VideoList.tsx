import React, { useState, useMemo } from "react";
import { videos } from "../data/videos";
import { VideoCard } from "./VideoCard";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";

const ITEMS_PER_PAGE = 12;

export const VideoList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const filteredVideos = useMemo(() => {
    return videos.filter(
      v =>
        v.title.toLowerCase().includes(query.toLowerCase())
      //  ||
      //   v.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentVideos = filteredVideos.slice(start, end);

  React.useEffect(() => setPage(1), [query]);

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} placeholder="Search videos..." />

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start"
      }}>
        {currentVideos.map(v => <VideoCard key={v.id} video={v} />)}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};
