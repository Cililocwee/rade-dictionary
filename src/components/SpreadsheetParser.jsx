import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";

export default function SpreadsheetParser() {
  const [inputValue, setInputValue] = useState("");

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
    console.log(result);

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
