import React from 'react';
import './Actions.css';

const Actions = (props) => {
    return (
        <div className="actions-menu">
            <span className={props.revealState ? "action disabled" : "action"} onClick={props.revealAction}>Reveal</span>
            <span className="action" onClick={props.skipAction}>Skip</span>
        </div>
    );
}

export default Actions;
          