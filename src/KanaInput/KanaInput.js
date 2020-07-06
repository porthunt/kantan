import React from 'react';
import './KanaInput.css';
import DARK_COLOR from '../themes/dark';
import LIGHT_COLOR from '../themes/light';

const KanaInput = (props) => {
    return (
        <form onSubmit={props.submit} >
            <input 
            ref={props.reference}
            className={props.className}
            placeholder={ props.placeholder ? props.placeholder: "What kana is this?" }
            type="text"
            id="kana"
            name="kana"
            style={props.theme === "light" ? {color: LIGHT_COLOR} : {color: DARK_COLOR}}
            value={props.value}
            onChange={props.change}
            disabled={props.disabled} />
        </form>
    );
}

export default KanaInput;
          