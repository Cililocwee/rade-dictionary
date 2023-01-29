import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DictionaryUpload from "./pages/DictionaryUpload";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dictionary />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/upload" element={<DictionaryUpload />} />
      </Routes>
    </div>
  );
}

export default App;
