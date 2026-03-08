import React, { useState } from "react";

type Podcast = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: string;
  source: string;
};

type PodcastCardProps = {
  podcast: Podcast;
};

export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  const [play, setPlay] = useState(false);

  if (!podcast.id) return null;

  const thumbnail = `https://img.youtube.com/vi/${podcast.id}/hqdefault.jpg`;

  return (
    <div style={{border: "1px solid #ccc", padding: "10px", marginBottom: "10px"}}>
      <h3>{podcast.title}</h3>
      {!play ? (
        <div style={{cursor: "pointer", position: "relative", display: "inline-block"}} onClick={() => setPlay(true)}>
          <img src={thumbnail} alt={podcast.title} style={{width: "100%", maxWidth: "560px"}} />
          <span style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "40px",
            color: "white",
            textShadow: "1px 1px 5px black"
          }}>▶</span>
        </div>
      ) : (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${podcast.id}?autoplay=1`}
          title={podcast.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      <p>{podcast.description}</p>
      <a href={podcast.url} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
    </div>
  );
};
