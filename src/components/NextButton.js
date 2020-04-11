import React from 'react';
import {Button} from "react-bootstrap";

class NextButton extends React.Component {    
    render() {
        return (
            <Button
                id="nextButton"
                className="btn btn-primary  btn-lg float-button-next"
                onClick={this.props.handleOnNext}>
                &gt;
            </Button>
        );
    }
}

export default NextButton;