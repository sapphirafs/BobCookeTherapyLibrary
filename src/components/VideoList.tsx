import React, { useState, useMemo } from "react";
import { videos } from "../data/videos";
import { VideoCard } from "./VideoCard";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";

const ITEMS_PER_PAGE = 12;

export const VideoList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
  "All",
  ...Array.from(new Set(videos.map(v => v.category))).sort()
];
  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      const matchesSearch =
        v.title.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        category === "All" || v.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [query, category]);

  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentVideos = filteredVideos.slice(start, start + ITEMS_PER_PAGE);

  React.useEffect(() => setPage(1), [query, category]);

  return (
    <div style={{ display: "flex", gap: "30px" }}>

      <aside style={{ minWidth: "200px" }}>
        <h3>Categories</h3>
        {categories.map(c => (
          <div key={c}>
            <button
              onClick={() => setCategory(c)}
              style={{
                background: c === category ? "#4A90E2" : "#eee",
                color: c === category ? "white" : "black",
                border: "none",
                padding: "8px",
                marginBottom: "5px",
                width: "100%",
                cursor: "pointer"
              }}
            >
              {c}
            </button>
          </div>
        ))}
      </aside>

      <div style={{ flex: 1 }}>
        <SearchBar query={query} setQuery={setQuery} placeholder="Search videos..." />

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          {currentVideos.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
};