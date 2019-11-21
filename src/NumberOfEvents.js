import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { ErrorAlert } from "./Alert";

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
      return this.setState({ infoText: "Must be at least 1!" });
    } else {
      return this.setState({ infoText: "" });
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
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
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  }
}

export default NumberOfEvents;
