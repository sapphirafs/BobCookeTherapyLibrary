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
    ...Array.from(new Set(
      videos
        .map(v => v.category)
        .filter(c => c !== "Conferences" && c !== "Other Content")
    ))
      .map(c => (c === "Supervision" ? "Supervision Videos" : c))
      .sort()
  ];
  const filteredVideos = useMemo(() => {
    const seen = new Set<string>();
    return videos
      .filter(v => {
        const matchesSearch =
          v.title.toLowerCase().includes(query.toLowerCase());

        const matchesCategory =
        category === "All" ||
        (category === "Supervision Videos" ? v.category === "Supervision" : v.category === category);
        return matchesSearch && matchesCategory;
      })
      .filter(v => {
        if (seen.has(v.id)) return false;
        seen.add(v.id);
        return true;
      });
  }, [query, category]);

  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentVideos = filteredVideos.slice(start, start + ITEMS_PER_PAGE);

  React.useEffect(() => setPage(1), [query, category]);

  return (
    <div className="container">
      <div className="row">
        <aside className="col-12 col-md-3 mb-4">
          <h3>Categories</h3>
          <div className="list-group">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={"list-group-item list-group-item-action" +
                  (c === category ? " active" : "")}
              >
                {c}
              </button>
            ))}
          </div>
        </aside>

        <div className="col-12 col-md-9">
          <SearchBar query={query} setQuery={setQuery} placeholder="Search videos..." />

          <div className="row g-3">
            {currentVideos.map((v, i) => (
              <div key={`${v.id}-${i}`} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <VideoCard video={v} />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};