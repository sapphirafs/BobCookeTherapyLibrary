import React from "react";
import { PodcastList } from "../../components/PodcastList";

export const Podcasts: React.FC = () => {
  return (
    <div className="page">
      <h1>Podcasts</h1>
      <PodcastList />
    </div>
  );
};