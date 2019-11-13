import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: "32"
  };

  handleInputChanged = event => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label className="numberOfEvents_label">Number of events:</label>
        <input
          type="text"
          className="userInputNumberOfEvents"
          id="inputChosenNumberOfEvents"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
