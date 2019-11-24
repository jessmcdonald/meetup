import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { WarningAlert } from "./Alert";

class SortEvents extends Component {
  state = {
    sortMethod: "time",
    infoText: ""
  };

  handleInputChanged = event => {
    const value = event.target.value;
    this.setState({
      sortMethod: value
    });
    this.props.updateEvents(undefined, undefined, undefined, value);
  };

  render() {
    return (
      <div className="sortEvents">
        <Form>
          <Form.Label className="SortEvents_label">Sort by:</Form.Label>

          <Form.Control
            as="select"
            className="userSelecteventSortMethod"
            id="inputChosensortMethod"
            value={this.state.sortMethod}
            onChange={this.handleInputChanged}
          >
            <option className="selectOption" value="time">
              Date
            </option>
            <option className="selectOption" value="best">
              Recommended
            </option>{" "}
            />
          </Form.Control>
        </Form>
        <WarningAlert />
      </div>
    );
  }
}

export default SortEvents;
