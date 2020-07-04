import React from 'react';
import './KanaInput.css';

const KanaInput = (props) => {
    return (
        <input 
        ref={props.reference}
        className={props.className}
        placeholder={ props.placeholder ? props.placeholder: "What kana is this?" }
        type="text"
        id="kana"
        name="kana"
        value={props.value}
        onChange={props.change}
        disabled={props.disabled} />
    );
}

export default KanaInput;
          