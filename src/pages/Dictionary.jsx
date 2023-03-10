import React, { useState } from "react";
import ResultBox from "../components/ResultBox";
import "./pages.css";
import { uuidv4 } from "@firebase/util";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import RadeBar from "../components/RadeBar";

export default function Dictionary() {
  const [matches, setMatches] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [dictionary, setDictionary] = useState();

  async function fetchDictionaryDatabase() {
    await getDocs(collection(db, "live_dictionary")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDictionary(newData);
    });
  }

  useEffect(() => {
    fetchDictionaryDatabase();
    let date = new Date();
    console.log(
      "Fetched at " +
        date.toLocaleTimeString() +
        " on " +
        date.toLocaleDateString()
    );
  }, []);

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
  }

  function handleChange(e) {
    setSearchWord(e.target.value);
  }

  function commenceSearch(e) {
    if (e.key === "Enter") {
      handleDispatchSearch();
      setSearchWord("");
    }
  }

  function handleRadeLetters(letter) {
    setSearchWord(searchWord + letter.toLowerCase());
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
        <RadeBar contribute={handleRadeLetters} />
        <button onClick={handleDispatchSearch} id="search-button">
          Search
        </button>
      </div>

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
