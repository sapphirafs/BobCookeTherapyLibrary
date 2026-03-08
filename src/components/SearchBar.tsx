import React from "react";

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, placeholder }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
    </div>
  );
};
