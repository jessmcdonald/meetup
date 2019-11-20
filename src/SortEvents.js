import React, { Component } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const sortMethods = [
  { label: "Date", value: "time" },
  { label: "Recommended", value: "best" }
];

class SortEvents extends Component {
  state = {
    sortMethod: "time"
  };

  handleInputChanged = sortMethod => {
    this.setState({ sortMethod });
    this.props.updateEvents(undefined, undefined, undefined, { sortMethod });
    console.log(this.state);
  };

  render() {
    const { sortMethod } = this.state.sortMethod;

    return (
      <div className="SortEvents">
        <label className="SortEvents_label">Sort events by:</label>
        <div className="customSelect">
          <Select
            options={sortMethods}
            className="userSelecteventSortMethod"
            id="inputChosensortMethod"
            value={sortMethod}
            onChange={this.handleInputChanged}
          />
        </div>
      </div>
    );
  }
}

export default SortEvents;
