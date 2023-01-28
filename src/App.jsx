import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dictionary from "./pages/Dictionary";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DictionaryUpload from "./DictionaryUpload";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [dictionary, setDictionary] = useState([]);

  // TODO This is not efficient and needs a new call on search
  async function fetchDictionaryDatabase() {
    await getDocs(collection(db, "dictionary")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDictionary(newData);
      // console.log(newData);
    });
  }

  useEffect(() => {
    fetchDictionaryDatabase();
    console.log("Fetched");
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dictionary"
          element={<Dictionary dictionary={dictionary} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/upload"
          element={<DictionaryUpload dictionary={dictionary} />}
        />
      </Routes>
    </div>
  );
}

export default App;
