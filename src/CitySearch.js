import React, { Component } from "react";
import { getSuggestions } from "./api";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: []
  };

  handleInputChanged = event => {
    const value = event.target.value;
    getSuggestions(value).then(suggestions => this.setState({ suggestions }));
    this.setState({ query: value });
  };

  handleItemClicked = (value, lat, lon) => {
    this.setState({ query: value });
    this.props.updateEvents(lat, lon);
    this.setState({ suggestions: [] });
  };

  render() {
    return (
      <div className="CitySearch">
        <div className="searchbar">

          <input
            type="text"
            className="city"
            value={this.state.query}
            onChange={this.handleInputChanged}
            placeholder="Search for your city"
          />
        </div>
        <div>
          <ul className="suggestions">
            {this.state.suggestions.map(item => (
              <li
                key={item.name_string}
                onClick={() =>
                  this.handleItemClicked(item.name_string, item.lat, item.lon)
                }
              >
                {item.name_string}
              </li>
            ))}
          </ul>
        </div >
      </div>
    );
  }
}

export default CitySearch;
