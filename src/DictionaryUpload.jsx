import React, { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function DictionaryUpload() {
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [newEnglishWord, setNewEnglishWord] = useState("");
  const [newRadeWord, setNewRadeWord] = useState("");

  function handleEnglish(e) {
    setNewEnglishWord(e.target.value);
  }
  function handleRade(e) {
    setNewRadeWord(e.target.value);
  }
  function handleInformation(e) {
    setAdditionalInfo(e.target.value);
  }

  async function pushDict() {
    let id = uuidv4();
    await setDoc(doc(db, "dictionary", id), {
      additional_info: additionalInfo,
      word: [newRadeWord, newEnglishWord],
    }).then((data) => {
      console.log("Upload success: " + data);
    });

    setNewEnglishWord("");
    setNewRadeWord("");
    setAdditionalInfo("");
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      if (
        newRadeWord.length === 0 ||
        newEnglishWord.length === 0 ||
        additionalInfo.length === 0
      ) {
        console.error("Incomplete entry");
        return;
      }

      pushDict();
    }
  }
  return (
    <main id="upload">
      <label htmlFor="english">English word: </label>
      <input
        className="newinput"
        name="english"
        placeholder="English"
        onChange={handleEnglish}
        value={newEnglishWord}
        onKeyDown={handleEnter}
      />
      <label htmlFor="rade">Rade word: </label>
      <input
        className="newinput"
        placeholder="Rade"
        name="rade"
        onChange={handleRade}
        value={newRadeWord}
        onKeyDown={handleEnter}
      />
      <label htmlFor="additional_info">Additional info: </label>
      <input
        className="newinput"
        placeholder="Additional Info"
        name="additional_info"
        onChange={handleInformation}
        value={additionalInfo}
        onKeyDown={handleEnter}
      />
      <button
        onClick={() => pushDict(additionalInfo, [newRadeWord, newEnglishWord])}
      >
        Submit
      </button>
    </main>
  );
}
