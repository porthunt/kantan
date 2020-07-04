import React from 'react';
import './KanaInput.css';

const Kana = (props) => {
    return (
        <input 
        ref={props.reference}
        className={props.className}
        placeholder="Start typing"
        type="text"
        id="kana"
        name="kana"
        value={props.value}
        onChange={props.change} />
    );
}

export default Kana;
          