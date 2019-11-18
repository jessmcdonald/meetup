import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    number: "32",
    infoText: ""
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      number: value
    })
    this.props.updateEvents(undefined, undefined, value);

    if (value && value < 1) {
      return this.setState({ infoText: 'You need to see at least 1 event!' });
    } else {
      return this.setState({ infoText: '' });
    }

  };


  render() {
    return (
      <div className="NumberOfEvents">
        <div className="infoText">
          <p>{this.state.infoText}</p>
        </div>

        <label className="numberOfEvents_label">Number of events:</label>
        <input
          type="number"
          className="userInputNumberOfEvents"
          id="inputChosenNumberOfEvents"
          value={this.state.number}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
