import React from "react";

export const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: "#4A90E2",
      color: "white",
      padding: "15px 20px",
      marginBottom: "20px"
    }}>
      <h1 style={{margin: 0}}>Bob Cooke: Therapy Library</h1>
      <nav>
        <a href="/" style={{color: "white", marginRight: "15px"}}>Videos</a>
        <a href="/podcasts" style={{color: "white", marginRight: "15px"}}>Podcasts</a>
        <a href="https://www.mcpt.co.uk" target="_blank" rel="noopener noreferrer" style={{color: "white", marginRight: "15px"}}>MCPT</a>
        <a href="https://www.psychotherapysupervision.net" target="_blank" rel="noopener noreferrer" style={{color: "white", marginRight: "15px"}}>Supervision</a>
        <a href="https://www.bobcooke.org" target="_blank" rel="noopener noreferrer" style={{color: "white", marginRight: "15px"}}>Bob Cooke</a>
        <a href="https://www.lowcosttherapy.co.uk" target="_blank" rel="noopener noreferrer" style={{color: "white"}}>Low Cost Therapy</a>
      </nav>
    </header>
  );
};