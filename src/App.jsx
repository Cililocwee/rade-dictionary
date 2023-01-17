import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dictionary from "./pages/Dictionary";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DictionaryUpload from "./DictionaryUpload";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/upload" element={<DictionaryUpload />} />
      </Routes>
    </div>
  );
}

export default App;
