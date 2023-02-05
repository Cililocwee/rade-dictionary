import React from "react";

export default function RadeBar({ contribute }) {
  const alphabet = [
    "Ă",
    "Â",
    "Ƀ",
    "Č",
    "Ê",
    "Ĕ",
    "Ĭ",
    "Ñ",
    "Ô",
    "Ŏ",
    "Ơ",
    "Ŭ",
    "Ư",
  ];
  return (
    <ul id="rade-keys">
      {alphabet.map((letter) => (
        <button onClick={() => contribute(letter)}>
          {letter.toLocaleLowerCase()}
        </button>
      ))}
    </ul>
  );
}
