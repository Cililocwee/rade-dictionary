import React, { useEffect, useState } from "react";
import ResultBox from "../components/ResultBox";
import "./pages.css";
import { db } from "../firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

export default function Dictionary() {
  const [wordQueue, setWordQueue] = useState([,]);
  const [searchWord, setSearchWord] = useState("");
  const [testWord, setTestWord] = useState([]);

  // TODO This is not efficient and needs a new call on search
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
    let queuedUp = [];
    testWord.forEach((spot) => {
      if (spot.word[1].includes(searchWord.toLowerCase())) {
        queuedUp.push(spot);
      }
    });
    setWordQueue(queuedUp);
  }

  function handleClickRade() {
    console.log(searchWord);
    let queuedUp = [];
    testWord.forEach((spot) => {
      if (spot.word[0].includes(searchWord.toLowerCase())) {
        queuedUp.push(spot);
      }
    });
    setWordQueue(queuedUp);
  }

  function handleChange(e) {
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
          key={uuidv4()}
        />
      ))}
    </div>
  );
}
