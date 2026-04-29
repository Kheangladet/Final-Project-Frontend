import React, { useMemo, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data, linkPrefix }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filteredResults = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    if (!normalizedTerm) return [];

    return data
      .filter((item) =>
        [item.title, item.location, item.category, item.highlight]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedTerm)),
      )
      .slice(0, 6);
  }, [data, searchTerm]);

  const highlight = (text, query) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;

    return (
      <>
        {text.slice(0, idx)}
        <span className="font-medium text-blue-600">
          {text.slice(idx, idx + query.length)}
        </span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  const handleSelect = (id) => {
    setSearchTerm("");
    setIsFocused(false);
    navigate(`${linkPrefix}/${id}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (filteredResults.length > 0) {
      handleSelect(filteredResults[0].id);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center gap-2.5 rounded-full border bg-white px-4 py-2.5 transition-all duration-200 ${
          isFocused
            ? "border-blue-400 ring-2 ring-blue-100 shadow-sm"
            : "border-gray-300 shadow-sm"
        }`}
      >
        <CiSearch
          size={17}
          className={`flex-shrink-0 transition-colors duration-200 ${
            isFocused ? "text-blue-500" : "text-gray-400"
          }`}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search destinations, categories, or highlights..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />
        {searchTerm && (
          <button
            type="button"
            onMouseDown={(event) => {
              event.preventDefault();
              setSearchTerm("");
              inputRef.current?.focus();
            }}
            className="flex-shrink-0 text-gray-400 transition-colors duration-150 hover:text-gray-600"
          >
            <IoMdClose size={15} />
          </button>
        )}
      </form>

      {searchTerm && isFocused && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <div
                key={item.id}
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleSelect(item.id);
                }}
                className={`group flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-blue-50 ${
                  index > 0 ? "border-t border-gray-100" : ""
                }`}
              >
                <MdLocationOn
                  size={15}
                  className="flex-shrink-0 text-gray-400 transition-colors duration-150 group-hover:text-blue-400"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium leading-tight text-gray-800">
                    {highlight(item.title, searchTerm)}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {item.location} · {item.category}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-4 text-center text-sm text-gray-400">
              No destinations found. Try a city, theme, or trip highlight.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
