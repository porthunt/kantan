import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';

import Kana from './Kana/Kana';
import KanaInput from './KanaInput/KanaInput';
import KanaSelector from './KanaSelector/KanaSelector';
import StreakLabel from './StreakLabel/StreakLabel';
import Actions from './Actions/Actions';
import Footer from './Footer/Footer';
import Header from './Header/Header';

import hiragana from './characters/hiragana';
import katakana from './characters/katakana';
import kanji from './characters/kanji';
import DARK_COLOR from './themes/dark';
import LIGHT_COLOR from './themes/light';

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
  const [themeState, setThemeState] = useState(() => {
    const local_theme = localStorage.getItem('theme');
    return (local_theme ? local_theme : "light");
  });
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

  const changeInput = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setInputValueState(inputValue);
  }

  const validateKana = (event) => {
    event.preventDefault();
    const isValid = kanaState["values"].some(function (value) {
      return inputValueState === value;
    });

    if (isValid) {
      setStreakState(streakState + 1);
      refresh();
    } else if (!isValid && inputValueState) {
      setValidKanaState("incorrect");
      setStreakState(0);
    }
  }

  const modifyAvailableKanas = (currentKanas) => {
    let availableKanas = [];
    if (currentKanas.includes("hiragana"))
      availableKanas = [...availableKanas, ...hiragana];
    
    if (currentKanas.includes("katakana"))
      availableKanas = [...availableKanas, ...katakana];
    
    if (currentKanas.includes("kanji"))
      availableKanas = [...availableKanas, ...kanji];

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

  const changeTheme = () => {
    let theme;
    if (themeState === "light") {
      theme = "dark";
    } else
      theme = "light";
    setThemeState(theme);
    localStorage.setItem('theme', theme);
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
    <div className="application">
    <Helmet>
        <style>{'body { background-color: ' + (themeState === "light" ? DARK_COLOR : LIGHT_COLOR) + ' }'}</style>
    </Helmet>
    <div className="App">
        <Header click={changeTheme} theme={themeState} />
        <div className="content">
          <ToastContainer />
          <KanaSelector theme={themeState} selected={selectedKanasState} click={untoggleKana} />
          <Kana theme={themeState} kana={kanaState["key"]} validity={validKanaState} />
          <Actions skipAction={skipKana} revealAction={revealKana} revealState={isRevealedState} />
          <KanaInput
            disabled={inputIsDisabledState}
            reference={inputRef}
            theme={themeState}
            className={validKanaState} 
            value={inputValueState}
            placeholder={inputPlaceHolderState}
            change={changeInput}
            submit={validateKana} />
          { streakState > 10 ? <StreakLabel theme={themeState} streak={streakState}/> : null }
        </div>
        <Footer theme={themeState} />
    </div>
</div>
  );
}

export default App;
