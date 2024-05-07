import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import { supportedLanguages } from "./data";
import axios from "axios";
import "./components/dropdown.css";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

function App() {
  const [text, setText] = useState("");
  const [show, setShow] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShow("");
    }, 5000); // Hide show after 5 seconds
  }, [show]);

  useEffect(() => {
    console.log(sourceLanguage, targetLanguage);
  }, [sourceLanguage, targetLanguage]);

  const translate = async () => {
    if (!sourceLanguage || !targetLanguage) {
      alert("Please select both source and target languages.");
      return;
    }

    let required = {
      source_language: sourceLanguage,
      target_language: targetLanguage,
      text: text,
    };

    let response = await axios.post(
      "https://text-translator2.p.rapidapi.com/translate",
      required,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": "c6b77b25a9msh4fe51e21727aad3p171430jsn50b8fc836df7",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
      }
    );
    setShow(response.data.data.translatedText);
  };

  return (
    <div className="container flex flex-col justify-center items-center gap-2 h-[100vh]">
      <h1 className="text-5xl font-bold mb-10 tracking-wider">
        Text Translation App
      </h1>
      <div className="flex justify-center items-center gap-2">
        {/* dropdowns */}
        <Dropdown
          onChangeFn={(e) => setSourceLanguage(e.target.value)}
          supportedLanguages={supportedLanguages}
          label="Source Language"
        />
        <FaArrowRightArrowLeft />
        <Dropdown
          onChangeFn={(e) => setTargetLanguage(e.target.value)}
          supportedLanguages={supportedLanguages}
          label="Target Language"
        />
      </div>
      {/* input */}

      <div className="flex items-center justify-center">
        <div className="relative m-3 p-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-rose-400"
            autoComplete="off"
            placeholder="TailwindCSS..."
            name="text"
            type="text"
          />
        </div>
        <button
          onClick={translate}
          type="button"
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Translate
        </button>
      </div>
      {show && (
        <h1 className="text-xl font-semibold tracking-widest">
          "{text}" IS TRANSLATED IN "{show}"{" "}
        </h1>
      )}
    </div>
  );
}

export default App;
