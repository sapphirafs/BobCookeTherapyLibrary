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
   <div style={{
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "10px",
  width: "100%",
  maxWidth: "360px",
  margin: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  backgroundColor: "#fff"
}}>
      <h3>{podcast.title}</h3>
      {!play ? (
        <div style={{cursor: "pointer", position: "relative", display: "inline-block"}} onClick={() => setPlay(true)}>
          <img src={thumbnail} alt={podcast.title} style={{width: "100%", borderRadius: "5px"}} />
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
  width="100%"
  height="180"
  src={`https://www.youtube.com/embed/${podcast.id}?autoplay=1`}
  title={podcast.title}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  style={{ borderRadius: "5px" }}
/>
      )}
      <p style={{
  fontSize: "13px",
  overflow: "hidden",
  maxHeight: "60px"
}}>
  {podcast.description?.slice(0,120)}...
</p>
      <a href={podcast.url} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
    </div>
  );
};
