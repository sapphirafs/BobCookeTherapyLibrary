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
      <div className="card mb-3" style={{ minWidth: "200px" }}>
        <div className="card-body d-flex flex-column justify-content-between">
          <h4 className="card-title">Private Video</h4>
          <p className="card-text" style={{ fontSize: "14px" }}>
            Cannot embed this video.
          </p>
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </a>
        </div>
      </div>
    );
  }

  const thumbnail = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <div className="card h-100">
      <div className="ratio ratio-16x9" style={{ cursor: "pointer" }} onClick={() => setPlay(true)}>
        {!play ? (
          <>
            <img
              src={thumbnail}
              alt={video.title}
              className="card-img-top"
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.src = "/fallback-thumbnail.png";
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "32px",
                color: "white",
                textShadow: "1px 1px 5px black"
              }}
            >
              ▶
            </span>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-100 h-100"
            style={{ borderRadius: "5px" }}
          />
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title" style={{ fontSize: "16px" }}>
          {video.title}
        </h5>
        <p
          className="card-text flex-grow-1"
          style={{ fontSize: "13px", overflow: "hidden", maxHeight: "60px" }}
        >
          {video.description?.slice(0, 120)}...
        </p>
      </div>

      <div className="card-footer bg-transparent border-top-0">
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-link">
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};
