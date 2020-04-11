import React from 'react';

class PrevButton extends React.Component {  
    render() {
      return (
        <button
            id="prevButton" 
            className="btn btn-primary  btn-lg float-button-prev"
            onClick={this.props.handleOnPrev}>
            &lt;
        </button>
      );
    }
  }
  
export default PrevButton;