import React from 'react';
import './KanaSelector.css';

const KanaSelector = (props) => {
    return (
        <ul className="menu">
            <li onClick={() => props.click("katakana")} className={props.selected.includes("katakana") ? 'selected' : null}>
                Katakana
            </li>
            <li onClick={() => props.click("hiragana")} className={props.selected.includes("hiragana") ? 'selected' : null}
                >Hiragana
            </li>
        </ul>
    );
}

export default KanaSelector;
          