import React, { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import SpreadsheetParser from "./components/SpreadsheetParser";
import LogIn from "./components/LogIn";

export default function DictionaryUpload() {
  const [currentDb, setCurrentDb] = useState();

  async function fetchDictionaryDatabase() {
    await getDocs(collection(db, "live_dictionary")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCurrentDb(newData);
      // console.log(newData);
    });
  }

  async function archiveDatabase() {
    const backupStr = "backup" + Date.now();
    let id;
    for await (const entry of currentDb) {
      let id = uuidv4();
      await setDoc(doc(db, backupStr, id), {
        additional_info: entry.additional_info,
        word: [entry.word[0], entry.word[1]],
      }).then((data) => {
        console.log(`backup ${id}: successful`);
      });
    }
    console.log("BACKUP SUCCESSFUL");
  }

  async function handleBackup() {
    fetchDictionaryDatabase();
    archiveDatabase();
  }

  return (
    <main id="upload">
      <p>Step 1: Log in</p>
      <LogIn />
      <br />
      <br />
      <p>Step 2: Back up live dictionary</p>
      <button onClick={handleBackup}>Backup</button>
      <br />
      <br />
      <p>Step 3: Upload new dictionary</p>
      <SpreadsheetParser />
    </main>
  );
}
