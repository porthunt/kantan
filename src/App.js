import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Kana from './Kana/Kana';
import KanaInput from './KanaInput/KanaInput';
import hiragana from './characters/hiragana';
import katakana from './characters/katakana';
import './App.css';

const App = () => {

  const kanas = [...hiragana, ...katakana];

  const [kanaState, setKanaState] = useState(() => {
    const rand = Math.floor(1 + Math.random() * (kanas.length - 1));
    return kanas[rand];
  });
  const [validKanaState, setValidKanaState] = useState("");
  const [inputValueState, setInputValueState] = useState("");
  
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const refresh = () => {
    const rand = Math.floor(1 + Math.random() * (kanas.length - 1));
    setKanaState(kanas[rand]);
    setInputValueState("");
    setValidKanaState("");
  }

  const validateKana = (event) => {
    setInputValueState(event.target.value);
    if (kanaState["value"] === event.target.value) {
      setValidKanaState("correct")
      refresh();
    } else if (kanaState["value"] !== event.target.value && event.target.value.length >= kanaState["value"].length)
      setValidKanaState("incorrect");
    else
      setValidKanaState("");
  }

  return (
    <div className="App">
        <Kana kana={kanaState["key"]} validity={validKanaState} />
        <KanaInput
          reference={inputRef}
          className={validKanaState} 
          value={inputValueState}
          change={validateKana} />
    </div>
  );
}

export default App;
