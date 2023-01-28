import React, { useState } from "react";
import ResultBox from "../components/ResultBox";
import "./pages.css";
import { uuidv4 } from "@firebase/util";
import TableHead from "../components/TableHead";

export default function Dictionary({ dictionary }) {
  const [matches, setMatches] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  // TODO Can't search for I
  // TODO Returns repeat entries (redundant)
  function handleDispatchSearch() {
    let englishMatches = [];
    let radeMatches = [];
    if (searchWord.length === 0) {
      console.error("Search string too short");
      return;
    }
    dictionary.forEach((entry) => {
      if (entry.word[1].toLowerCase().includes(searchWord.toLowerCase())) {
        englishMatches.push(entry);
      }
    });

    dictionary.forEach((entry) => {
      if (entry.word[0].toLowerCase().includes(searchWord.toLowerCase())) {
        radeMatches.push(entry);
      }
    });

    setMatches([...englishMatches, ...radeMatches]);
    setSearchWord("");
  }

  function handleChange(e) {
    setSearchWord(e.target.value);
  }

  function commenceSearch(e) {
    if (e.key === "Enter") {
      handleDispatchSearch();
    }
  }

  return (
    <div id="dictionary" className="page">
      <div id="searchbox">
        <input
          id="searchinput"
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          value={searchWord}
          onKeyDown={commenceSearch}
        />
        <button onClick={handleDispatchSearch}>Search</button>
      </div>
      {matches.length > 0 ? <TableHead /> : <></>}
      {matches.map((heading) => (
        <ResultBox
          searchWord={heading.word[0]}
          additionalInfo={heading.additional_info}
          resultTarget={heading.word[1]}
          key={uuidv4()}
        />
      ))}
    </div>
  );
}
