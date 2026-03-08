import React, { useState } from "react";

type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: string;
  source: string;
};

type VideoCardProps = { video: Video };

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [play, setPlay] = useState(false);

  if (!video.id) return null;

  // Private video fallback
  if (video.title === "Private video") {
    return (
      <div style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        width: "300px",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <h4>Private Video</h4>
        <p style={{ fontSize: "14px" }}>Cannot embed this video.</p>
        <a href={video.url} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
      </div>
    );
  }

  const thumbnail = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

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
      <h4 style={{ fontSize: "16px", marginBottom: "5px" }}>{video.title}</h4>

      {!play ? (
        <div style={{ cursor: "pointer", position: "relative" }} onClick={() => setPlay(true)}>
          <img src={thumbnail} alt={video.title} style={{ width: "100%", borderRadius: "5px" }} />
          <span style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "32px",
            color: "white",
            textShadow: "1px 1px 5px black"
          }}>▶</span>
        </div>
      ) : (
        <iframe
          width="100%"
          height="180"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "5px" }}
        />
      )}

      <div style={{
        flexGrow: 1,
        marginTop: "10px",
        fontSize: "13px",
        overflow: "hidden",
        maxHeight: "60px",
        width: "100%",
maxWidth: "360px"
      }}>
        {video.description?.slice(0, 120)}...
      </div>

      <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: "5px", fontSize: "13px", color: "#4A90E2" }}>
        Watch on YouTube
      </a>
    </div>
  );
};
