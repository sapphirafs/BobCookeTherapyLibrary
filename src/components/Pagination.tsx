import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ margin: "20px 0" }}>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => setPage(p)}
          style={{
            marginRight: "5px",
            padding: "5px 10px",
            backgroundColor: p === currentPage ? "#4A90E2" : "#f2f2f2",
            color: p === currentPage ? "white" : "#333",
            border: "1px solid #ccc",
            cursor: "pointer"
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
};
