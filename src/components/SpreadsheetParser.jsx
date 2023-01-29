import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import { db } from "../firebase";

export default function SpreadsheetParser() {
  const [inputValue, setInputValue] = useState("");

  //!! Currently uploading duplicates instead of replacing
  //! the old keys because of the new ids
  // TODO change upload id to maybe english+rade word?
  async function pushDict(arrLoad) {
    let id = uuidv4();

    await setDoc(doc(db, "live_dictionary", id), {
      additional_info: arrLoad[2],
      word: [arrLoad[0], arrLoad[1]],
    }).then((data) => {
      console.log("Upload success: " + [arrLoad]);
    });
  }

  async function handleFileAsync(e) {
    // Getting data from spreadsheet
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const fileArray = Object.entries(workbook.Sheets.Sheet1);

    // Make the data usable
    let queue = [];

    fileArray.forEach((cell) => {
      queue.push(cell[1].v);
    });

    // Rechunk data
    const result = queue.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 3);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; //start a new chunk
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    // console.log(queue);
    // console.log(result);
    console.log("Starting update...");
    for (let i = 0; i < result.length; i++) {
      pushDict(result[i]);
    }

    setInputValue("");
  }

  return (
    <input
      type="file"
      id="file_input_element"
      onChange={handleFileAsync}
      value={inputValue}
    />
  );
}
