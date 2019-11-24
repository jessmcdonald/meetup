import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import SortEvents from "./SortEvents";
import { getEvents } from "./api.js";
import groupimg from "./assets/img/group.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InfoAlert } from "./Alert";
import EventChart from "./EventChart";
import moment from "moment";

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
              <Col xs={12} sm={6} lg={4}>
                <h1>Meetus</h1>
              </Col>
              <Col xs={6} sm={6} lg={5}>
                <img src={groupimg} width="100%" />
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
        {this.state.alert ? <InfoAlert text={this.state.alert} /> : ""}
        <EventChart events={this.state.events} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
