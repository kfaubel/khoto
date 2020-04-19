import React from 'react';

function NextButton(props) {
    return (
        <button
            id="nextButton"
            className="float-button-next"
            onClick={props.handleOnNext}>
            &gt;
        </button>
    );
}

export default NextButton;