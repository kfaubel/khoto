import React from 'react';

function PrevButton(props) {
    return (
        <button
            id="prevButton"
            className="float-button-prev"
            onClick={props.handleOnPrev}>
            &lt;
        </button>
    );
}

export default PrevButton;