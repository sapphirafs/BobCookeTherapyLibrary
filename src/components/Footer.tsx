import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: "#f2f2f2",
      color: "#333",
      padding: "15px 20px",
      marginTop: "40px",
      textAlign: "center",
      borderTop: "1px solid #ccc"
    }}>
      <p>&copy; {new Date().getFullYear()} Therapy Videos. All rights reserved.</p>
      <p>
        <a href="https://www.youtube.com/c/bobcooke" target="_blank" rel="noopener noreferrer">YouTube Channel</a> | 
        <a href="https://www.lowcosttherapy.co.uk" target="_blank" rel="noopener noreferrer"> Low Cost Therapy</a>
      </p>
    </footer>
  );
};
