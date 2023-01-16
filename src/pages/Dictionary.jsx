import React, { useEffect, useState } from "react";
import ResultBox from "../components/ResultBox";
import { words } from "../words/words";
import "./pages.css";
import { db } from "../firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";

export default function Dictionary() {
  const [wordQueue, setWordQueue] = useState([,]);
  const [searchWord, setSearchWord] = useState("");
  const [testWord, setTestWord] = useState([]);

  async function fetchDictionaryDatabase() {
    await getDocs(collection(db, "dictionary")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTestWord(newData);
      console.log(newData);
    });
  }
  useEffect(() => {
    fetchDictionaryDatabase();
  }, []);

  function handleClickEnglish() {
    // console.log(searchWord);
    let queuedUp = [];
    words.forEach((spot) => {
      if (spot.word[1].includes(searchWord)) {
        queuedUp.push(spot);
      }
      setWordQueue(queuedUp);
    });
  }

  function handleClickRade() {
    console.log(searchWord);
    let queuedUp = [];
    words.forEach((spot) => {
      if (spot.word[0].includes(searchWord)) {
        queuedUp.push(spot);
      }
      setWordQueue(queuedUp);
    });
  }

  function handleChange(e) {
    // console.log(e.target.value);
    setSearchWord(e.target.value);
  }

  return (
    <div id="dictionary" className="fullpage">
      <div id="searchbox">
        <input
          id="searchinput"
          type="text"
          placeholder="Search..."
          onChange={handleChange}
        />
        <button onClick={handleClickEnglish}>Search English</button>
        <button onClick={handleClickRade}>Search Rade</button>
      </div>

      {wordQueue.map((heading) => (
        <ResultBox
          searchWord={heading.word[0]}
          additionalInfo={heading.additional_info}
          resultTarget={heading.word[1]}
        />
      ))}
    </div>
  );
}
