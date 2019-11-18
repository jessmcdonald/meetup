import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents } from "./api.js";
import logoimg from './assets/img/logoimg.svg';

class App extends Component {
  componentDidMount() {
    getEvents().then(response => this.setState({ events: response }));
  }

  state = {
    events: [],
    page: null,
    lat: null,
    lon: null
  };

  updateEvents = (lat, lon, page) => {
    if (lat && lon) {
      getEvents(lat, lon, this.state.page).then(response =>
        this.setState({ events: response, lat, lon })
      );
    } else if (page) {
      getEvents(this.state.lat, this.state.lon, page).then(response =>
        this.setState({ events: response, page })
      );
    } else {
      getEvents(
        this.state.lat,
        this.state.lon,
        this.state.page
      ).then(response => this.setState({ events: response }));
    }
  };

  render() {
    return (
      <div className="App">
        <header>
          <img src={logoimg} alt="Meetup logo" width="200px" />
          <CitySearch updateEvents={this.updateEvents} />
          <NumberOfEvents
            updateEvents={this.updateEvents}
          />
        </header>

        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
