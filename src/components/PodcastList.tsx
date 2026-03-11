import React, { useState, useMemo } from "react";
import { podcasts } from "../data/podcasts";
import { PodcastCard } from "./PodcastCard";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";

const ITEMS_PER_PAGE = 12;

export const PodcastList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const filteredPodcasts = useMemo(() => {
    const seen = new Set<string>();
    return podcasts
      .filter(
        p => p.title.toLowerCase().includes(query.toLowerCase())
      )
      .filter(p => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      });
  }, [query]);

  const totalPages = Math.ceil(filteredPodcasts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPodcasts = filteredPodcasts.slice(start, end);

  React.useEffect(() => setPage(1), [query]);

  return (
    <div className="container">
      <SearchBar query={query} setQuery={setQuery} placeholder="Search podcasts..." />

      <div className="row g-3">
        {currentPodcasts.map((p, i) => (
          <div key={`${p.id}-${i}`} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <PodcastCard podcast={p} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};
