import React from "react";

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, placeholder }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="form-control"
        style={{ maxWidth: "400px" }}
      />
    </div>
  );
};
