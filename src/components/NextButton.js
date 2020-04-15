import React from 'react';
//import {Button} from "react-bootstrap";

class NextButton extends React.Component {    
    render() {
        return (
            <button
                id="nextButton"
                className="float-button-next"
                onClick={this.props.handleOnNext}>
                &gt;
            </button>
        );
    }
}

export default NextButton;