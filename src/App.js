import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import SortEvents from "./SortEvents";
import { getEvents } from "./api.js";
import logoimg from "./assets/img/logoimg.svg";

class App extends Component {
  _isMounted = false;

  state = {
    events: [],
    city: {},
    alert: ""
  };

  componentDidMount() {
    this._isMounted = true;
    if (!navigator.onLine) {
      this.setState({
        alert:
          "Note: The app is offline, information shown may not be up to date"
      });
    } else {
      this.setState({ alert: "" });
    }
    this.updateEvents(undefined, undefined, 32, "time");
  }

  updateEvents = (lat, lon, page, order) => {
    getEvents(lat, lon, page, order).then(data => {
      if (this._isMounted) {
        const { city, events } = data;
        this.setState({ city, events });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <img src={logoimg} alt="Meetup logo" width="200px" />
          <CitySearch updateEvents={this.updateEvents} />
          <NumberOfEvents updateEvents={this.updateEvents} />
          <SortEvents updateEvents={this.updateEvents} />
        </header>

        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
