import React, { Component } from "react";

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
      <div className="SortEvents">
        <label className="SortEvents_label">Sort events by:</label>
        <select
          className="userSelecteventSortMethod"
          id="inputChosensortMethod"
          value={this.state.sortMethod}
          onChange={this.handleInputChanged}
        >
          <option value="time">Date</option>
          <option value="best">Recommended</option>
        </select>
      </div>
    );
  }
}

export default SortEvents;
