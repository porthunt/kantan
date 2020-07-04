import React from 'react';
import './KanaInput.css';

const KanaInput = (props) => {
    return (
        <input 
        ref={props.reference}
        className={props.className}
        placeholder="What kana is this?"
        type="text"
        id="kana"
        name="kana"
        value={props.value}
        onChange={props.change} />
    );
}

export default KanaInput;
          