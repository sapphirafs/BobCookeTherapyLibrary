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
    <div className="card h-100">
      <div className="ratio ratio-16x9" style={{ cursor: "pointer" }} onClick={() => setPlay(true)}>
        {!play ? (
          <>
            <img
              src={thumbnail}
              alt={podcast.title}
              className="card-img-top"
              style={{ objectFit: "cover" }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "40px",
                color: "white",
                textShadow: "1px 1px 5px black"
              }}
            >
              ▶
            </span>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${podcast.id}?autoplay=1`}
            title={podcast.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-100 h-100"
            style={{ borderRadius: "5px" }}
          />
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{podcast.title}</h5>
        <p
          className="card-text flex-grow-1"
          style={{ fontSize: "13px", overflow: "hidden", maxHeight: "60px" }}
        >
          {podcast.description?.slice(0, 120)}...
        </p>
      </div>

      <div className="card-footer bg-transparent border-top-0">
        <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-link">
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};
