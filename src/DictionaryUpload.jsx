import React, { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function DictionaryUpload() {
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [newWordEnglish, setNewWordEnglish] = useState("");
  const [newWordRade, setNewWordRade] = useState("");

  function handleEnglish(e) {
    setNewWordEnglish(e.target.value);
  }
  function handleRade(e) {
    setNewWordRade(e.target.value);
  }
  function handleInformation(e) {
    setAdditionalInfo(e.target.value);
  }

  function checkEverything() {
    console.log("English: " + newWordEnglish);
    console.log("Rade: " + newWordRade);
    console.log("Additional info: " + additionalInfo);
  }

  function clearAndReset() {
    // setAdditionalInfo("");
    // setNewWordEnglish("");
    // setNewWordRade("");
  }

  async function pushDict(adInfo, wordIn) {
    let id = uuidv4();
    await setDoc(doc(db, "dictionary", id), {
      additional_info: adInfo,
      word: wordIn,
    }).then((data) => {
      console.log("Upload success: " + data);
    });
  }

  return (
    <div>
      <label htmlFor="english">English word: </label>
      <input
        className="newinput"
        name="english"
        placeholder="English"
        onChange={handleEnglish}
      />
      <label htmlFor="rade">Rade word: </label>
      <input
        className="newinput"
        placeholder="Rade"
        name="rade"
        onChange={handleRade}
      />
      <label htmlFor="additional_info">Additional info: </label>
      <input
        className="newinput"
        placeholder="Additional Info"
        name="additional_info"
        onChange={handleInformation}
      />
      <button
        onClick={() => pushDict(additionalInfo, [newWordRade, newWordEnglish])}
      >
        Submit
      </button>
    </div>
  );
}
