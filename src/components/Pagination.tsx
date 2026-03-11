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
    <nav aria-label="Page navigation" className="my-3">
      <ul className="pagination justify-content-center flex-wrap">
        {pages.map(p => (
          <li
            key={p}
            className={"page-item" + (p === currentPage ? " active" : "")}
          >
            <button
              className="page-link"
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
