import React from "react";
import "./resultBox.css";

export default function ResultBox({
  searchWord,
  additionalInfo,
  resultTarget,
}) {
  return (
    <div className="resultbox">
      <div className="result-searchword">
        <h4>Rade</h4>
        <p>{searchWord}</p>
      </div>
      <div className="result-additional">{additionalInfo}</div>
      <div className="result-target">
        <h4>English</h4>
        <p>{resultTarget}</p>
      </div>
    </div>
  );
}
