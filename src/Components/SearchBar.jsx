import React, { useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data, linkPrefix }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filteredResults = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const highlight = (text, query) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;

    return (
      <>
        {text.slice(0, idx)}
        <span className="text-blue-600 font-medium">
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

  return (
    <div className="relative w-full max-w-md">
      <div
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border transition-all duration-200 ${
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
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="outline-none w-full bg-transparent text-sm text-gray-700 placeholder-gray-400"
        />
        {searchTerm && (
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              setSearchTerm("");
              inputRef.current?.focus();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-150 flex-shrink-0"
          >
            <IoMdClose size={15} />
          </button>
        )}
      </div>

      {searchTerm && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, i) => (
              <div
                key={item.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(item.id);
                }}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 group ${
                  i > 0 ? "border-t border-gray-100" : ""
                }`}
              >
                <MdLocationOn
                  size={15}
                  className="text-gray-400 group-hover:text-blue-400 flex-shrink-0 transition-colors duration-150"
                />
                <div>
                  <p className="text-sm text-gray-800 font-medium leading-tight">
                    {highlight(item.title, searchTerm)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.location}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-4 text-sm text-gray-400 text-center">
              No destinations found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
