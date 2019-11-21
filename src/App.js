import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import SortEvents from "./SortEvents";
import { getEvents } from "./api.js";
import logoimg from "./assets/img/logoimg.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
          <Container>
            <Row className="logoRow">
              <Col sm={4}>
                <img src={logoimg} alt="Meetup logo" width="200px" />
              </Col>
            </Row>

            <Row className="searchRow">
              <Col md={4}>
                <CitySearch updateEvents={this.updateEvents} />
              </Col>
              <Col md={2}></Col>
              <Col md={3} className="numberCol">
                <NumberOfEvents updateEvents={this.updateEvents} />
              </Col>

              <Col md={3}>
                <SortEvents updateEvents={this.updateEvents} />
              </Col>
            </Row>
          </Container>
        </header>

        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
