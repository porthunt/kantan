import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Kana from './Kana/Kana';
import KanaInput from './KanaInput/KanaInput';
import KanaSelector from './KanaSelector/KanaSelector';
import StreakLabel from './StreakLabel/StreakLabel';
import Actions from './Actions/Actions';
import Footer from './Footer/Footer';

import hiragana from './characters/hiragana';
import katakana from './characters/katakana';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [validKanaState, setValidKanaState] = useState("");
  const [streakState, setStreakState] = useState(0);
  const [inputValueState, setInputValueState] = useState("");
  const [inputIsDisabledState, setInputIsDisabledState] = useState(false);
  const [isRevealedState, setIsRevealedState] = useState(false);
  const [inputPlaceHolderState, setInputPlaceHolderState] = useState(null);
  const [selectedKanasState, setSelectedKanasState] = useState(["hiragana", "katakana"]);
  const [availableKanas, setAvailableKanas] = useState([...hiragana, ...katakana]);
  const [kanaState, setKanaState] = useState(() => {
    let kanas = [...hiragana, ...katakana];
    const rand = Math.floor(1 + Math.random() * (kanas.length - 1));
    return kanas[rand];
  });
  
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const refresh = () => {
    const rand = Math.floor(1 + Math.random() * (availableKanas.length - 1));
    setKanaState(availableKanas[rand]);
    setInputValueState("");
    setValidKanaState("");
    setInputIsDisabledState(false);
    setIsRevealedState(false);
    setInputPlaceHolderState(null);
  }

  const validateKana = (event) => {
    setInputValueState(event.target.value);
    if (kanaState["values"].includes(event.target.value)) {
      setValidKanaState("correct");
      setStreakState(streakState + 1);
      refresh();
    } else if (!kanaState["values"].includes(event.target.value) && event.target.value.length >= 3) {
      setStreakState(0);
      setValidKanaState("incorrect");
    } else
      setValidKanaState("");
  }

  const modifyAvailableKanas = (currentKanas) => {
    let availableKanas = [];
    if (currentKanas.includes("hiragana"))
      availableKanas = [...availableKanas, ...hiragana];
    
    if (currentKanas.includes("katakana"))
      availableKanas = [...availableKanas, ...katakana];

    setAvailableKanas(availableKanas);
    refresh();
  }

  const skipKana = () => {
    setStreakState(0);
    refresh();
  }

  const revealKana = () => {
    if (!isRevealedState) {
      setStreakState(0);
      setIsRevealedState(true);
      setInputIsDisabledState(true);
      setInputPlaceHolderState("Press skip");
      setKanaState({"key": kanaState["values"].pop()});
    }
  }

  const untoggleKana = (kana) => {
    const currentKanas = [...selectedKanasState];
    let indexKana = currentKanas.indexOf(kana);
    if (indexKana > -1 && currentKanas.length === 1)
      toast.error("You can't unselect all!", {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    else {
      if (indexKana > -1 && currentKanas.length >= 2)
        currentKanas.splice(indexKana, 1);
      else
        currentKanas.push(kana);
      setSelectedKanasState(currentKanas);
      modifyAvailableKanas(currentKanas);
    }
  }



  return (
    <div className="App">
        <div className="content">
          <ToastContainer />
          <KanaSelector selected={selectedKanasState} click={untoggleKana} />
          <Kana kana={kanaState["key"]} validity={validKanaState} />
          <Actions skipAction={skipKana} revealAction={revealKana} revealState={isRevealedState} />
          <KanaInput
            disabled={inputIsDisabledState}
            reference={inputRef}
            className={validKanaState} 
            value={inputValueState}
            placeholder={inputPlaceHolderState}
            change={validateKana} />
          { streakState > 10 ? <StreakLabel streak={streakState}/> : null }
        </div>
        <Footer />
    </div>
  );
}

export default App;
