import React from 'react';
import './KanaSelector.css';
import DARK_COLOR from '../themes/dark';
import LIGHT_COLOR from '../themes/light';

const KanaSelector = (props) => {
    return (
        <ul className="menu">
            <li 
                onClick={() => props.click("katakana")} 
                style={props.theme === "light" ? {color: LIGHT_COLOR} : {color: DARK_COLOR}}
                className={props.selected.includes("katakana") ? 'selected' : null}>
                Katakana
            </li>
            <li 
                onClick={() => props.click("hiragana")}
                style={props.theme === "light" ? {color: LIGHT_COLOR} : {color: DARK_COLOR}}
                className={props.selected.includes("hiragana") ? 'selected' : null}
                >Hiragana
            </li>
            <li 
                onClick={() => props.click("kanji")}
                style={props.theme === "light" ? {color: LIGHT_COLOR} : {color: DARK_COLOR}}
                className={props.selected.includes("kanji") ? 'selected' : null}
                >Kanji
            </li>
        </ul>
    );
}

export default KanaSelector;
          