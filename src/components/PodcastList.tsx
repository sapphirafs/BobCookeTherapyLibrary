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
    return podcasts.filter(
      p =>
        p.title.toLowerCase().includes(query.toLowerCase())
        
    );
  }, [query]);

  const totalPages = Math.ceil(filteredPodcasts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPodcasts = filteredPodcasts.slice(start, end);

  React.useEffect(() => setPage(1), [query]);

  return (
  <div>
    <SearchBar query={query} setQuery={setQuery} placeholder="Search podcasts..." />

    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "16px"
    }}>
      {currentPodcasts.map(p => (
        <PodcastCard key={p.id} podcast={p} />
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
