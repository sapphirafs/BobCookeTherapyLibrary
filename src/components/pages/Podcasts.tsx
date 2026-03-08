import React from "react";
import  {podcasts}  from "../../data/podcasts";
import { PodcastCard } from "../../components/PodcastCard";

export const Podcasts: React.FC = () => {
  if (podcasts.length === 0) return <p>No podcasts available.</p>;

  return (
    <div style={{padding: "20px"}}>
      <h2>All Podcasts</h2>
      {podcasts.map(p => (
        <PodcastCard key={p.id} podcast={p} />
      ))}
    </div>
  );
};
