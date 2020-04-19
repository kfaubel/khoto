import React from 'react';

function ToggleButton(props) {
    return (
        <button
            id="toggleButton"
            className="float-button-toggle"
            onClick={props.handleOnToggle}>
            [ - ]
        </button>
    );
}

export default ToggleButton;