import React, { Component } from "react";
import { getSuggestions } from "./api";
import { InfoAlert } from "./Alert";
import Form from "react-bootstrap/Form";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: []
  };

  handleInputChanged = event => {
    const value = event.target.value;
    this.setState({ query: value });
    getSuggestions(value).then(suggestions => {
      this.setState({ suggestions });

      if (value && suggestions.length === 0) {
        this.setState({
          infoText:
            "Oops! We can't find the city you are looking for, please try another city"
        });
      } else {
        this.setState({
          infoText: ""
        });
      }
    });
  };

  handleItemClicked = (value, lat, lon) => {
    this.setState({ query: value });
    this.props.updateEvents(lat, lon);
    this.setState({ suggestions: [] });
  };

  render() {
    return (
      <div className="CitySearch">
        <Form>
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            className="city"
            value={this.state.query}
            onChange={this.handleInputChanged}
            placeholder="Search for your city"
          />
        </Form>

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
        <InfoAlert text={this.state.infoText} />
      </div>
    );
  }
}

export default CitySearch;
