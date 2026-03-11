import React from "react";

export const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Bob Cooke: Therapy Library
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Videos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/podcasts">
                  Podcasts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.mcpt.co.uk" target="_blank" rel="noopener noreferrer">
                  MCPT
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.psychotherapysupervision.net" target="_blank" rel="noopener noreferrer">
                  Supervision
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.bobcooke.org" target="_blank" rel="noopener noreferrer">
                  Bob Cooke
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.lowcosttherapy.co.uk" target="_blank" rel="noopener noreferrer">
                  Low Cost Therapy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};