import React, { useEffect, useState } from "react";
import ResultBox from "../components/ResultBox";
import "./pages.css";
import { db } from "../firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

export default function Dictionary() {
  const [matches, setMatches] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [dictionary, setDictionary] = useState([]);

  // TODO This is not efficient and needs a new call on search
  async function fetchDictionaryDatabase() {
    await getDocs(collection(db, "dictionary")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDictionary(newData);
      console.log(newData);
    });
  }

  useEffect(() => {
    fetchDictionaryDatabase();
  }, []);

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
      if (entry.word[1].includes(searchWord.toLowerCase())) {
        englishMatches.push(entry);
      }
    });

    dictionary.forEach((entry) => {
      if (entry.word[0].includes(searchWord.toLowerCase())) {
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
    <div id="dictionary" className="fullpage">
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
