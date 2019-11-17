import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: "32",
    infoText: ""
  };

  handleInputChanged = event => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });

    if (value <= 0) {
      this.setState({
        infoText: "You need to see at least 1 event!"
      });
    } else {
      this.setState({
        infoText: ""
      });
      this.props.updateEvents(null, null, value);
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
