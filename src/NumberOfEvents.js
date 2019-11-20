import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class NumberOfEvents extends Component {
  state = {
    number: "32",
    infoText: ""
  };

  handleInputChanged = event => {
    const value = event.target.value;
    this.setState({
      number: value
    });
    this.props.updateEvents(undefined, undefined, value);

    if (value && value < 1) {
      return this.setState({ infoText: "You need to see at least 1 event!" });
    } else {
      return this.setState({ infoText: "" });
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <div className="infoText">
          <p>{this.state.infoText}</p>
        </div>
        <Form>
          <Form.Label className="numberOfEvents_label">
            Events to show:
          </Form.Label>
          <Form.Control
            type="number"
            className="userInputNumberOfEvents"
            id="inputChosenNumberOfEvents"
            value={this.state.number}
            onChange={this.handleInputChanged}
          />
        </Form>
      </div>
    );
  }
}

export default NumberOfEvents;
