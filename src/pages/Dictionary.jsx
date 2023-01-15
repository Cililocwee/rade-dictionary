import React from "react";
import { words } from "../words/words";

export default function Dictionary() {
  return (
    <div id="dictionary" className="fullpage">
      <div id="searchbox">
        <div id="searchbox-buttons">
          <button>Rade to English</button>
          <button>English to Rade</button>
        </div>
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>

      {/* This will be mapped dynamically  (will be a component)*/}

      <div className="resultbox">
        <div className="result-searchword">QUERY WORD</div>
        <div className="result-additional">ADDITIONAL INFO</div>
        <div className="result-target">RESULT TARGET</div>
      </div>

      {words.map((heading) => (
        <div className="resultbox">
          <div className="result-searchword">{heading.word[0]}</div>
          <div className="result-additional">{heading.additional_info[1]}</div>
          <div className="result-target">{heading.word[1]}</div>
        </div>
      ))}
    </div>
  );
}
