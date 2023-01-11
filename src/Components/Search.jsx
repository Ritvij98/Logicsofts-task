import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
export default function Search({ search }) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    search(searchInput);
  }, [searchInput]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  return (
    <div className="search">
      <h3>Post Search</h3>
      <div className="searchbar">
        <input
          type="text"
          placeholder="search term"
          onChange={debouncedResults}
        />
      </div>
    </div>
  );
}
