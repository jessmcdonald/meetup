import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import SortEvents from "./SortEvents";
import { getEvents } from "./api.js";
import groupimg from "./assets/img/group.jpg";
import { Container, Row, Col, Button, Collapse } from "react-bootstrap";
import { InfoAlert } from "./Alert";
import EventChart from "./EventChart";
import moment from "moment";

class App extends Component {
  _isMounted = false;

  state = {
    events: [],
    city: {},
    alert: "",
    chartOpen: false
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

  toggleChart = () => {
    console.log(this.state.chartOpen);
    this.setState({ chartOpen: !this.state.chartOpen });
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
              <Col md={2} className="numberCol">
                <NumberOfEvents updateEvents={this.updateEvents} />
              </Col>
              <Col md={3}>
                <SortEvents updateEvents={this.updateEvents} />
              </Col>

              <Col md={3}>
                <Button
                  variant="dark"
                  onClick={this.toggleChart}
                  aria-controls="event-chart"
                  aria-expanded={this.state.chartOpen}
                  className="showChartButton"
                >
                  Events this week >>
                </Button>
              </Col>
            </Row>
          </Container>
        </header>
        {this.state.alert ? <InfoAlert text={this.state.alert} /> : ""}

        <Collapse in={this.state.chartOpen}>
          <div id="event-chart">
            <EventChart events={this.state.events} />
          </div>
        </Collapse>

        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
