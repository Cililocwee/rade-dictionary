import React from "react";
import "./components.css";

export default function ResultBox({
  searchWord,
  additionalInfo,
  resultTarget,
}) {
  return (
    <section className="resultbox">
      <section className="result-rade">
        <p className="language-tag">RADE</p>
        <p>{searchWord}</p>
      </section>
      <section className="result-english">
        <p className="language-tag">ENGLISH</p>
        <p>{resultTarget}</p>
      </section>
      <section className="result-additional">
        <p>{additionalInfo}</p>
      </section>
    </section>
  );
}
