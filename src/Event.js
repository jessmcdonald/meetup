import React, { Component } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import parse from "html-react-parser";

class Event extends Component {
  state = {
    event: {
      group: {
        name: ""
      }
    },
    showDetails: false
  };

  handleShowDetails = () => {
    this.setState({ showDetails: true });
  };

  handleHideDetails = () => {
    this.setState({ showDetails: false });
  };

  render() {
    const { event } = this.props;

    const name = event.name;
    const time = event.local_time;
    const date = event.local_date;
    const group = event && event.group ? event.group.name : "";
    const rsvp = event.yes_rsvp_count;
    const rsvpLeft = event.rsvp_limit - event.yes_rsvp_count;
    const description = event.description;
    const link = event.link;
    const venue = event && event.venue ? event.venue.name : "";

    const showDetails = this.state.showDetails;

    return (
      <Card className="Event" event={event}>
        <Card.Body className="eventSummary">
          <Card.Title className="event_name">{name}</Card.Title>
          <Card.Subtitle className="event_localdate">
            {time} - {date}
          </Card.Subtitle>
          <Card.Text>
            <p className="event_group">{group}</p>
            <p className="event_rsvp">{rsvp} going</p>
          </Card.Text>
          {!showDetails && (
            <Button
              variant="dark"
              className="showDetailsButton"
              onClick={() => this.handleShowDetails()}
            >
              Details
            </Button>
          )}
        </Card.Body>

        <Modal
          show={this.state.showDetails}
          onHide={this.handleHideDetails}
          centered
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>
              <h3>
                <b>{name}</b>
              </h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="eventDetails">
            <h4 className="event_venue">
              {time} - {date} | {venue}
            </h4>
            <p className="event_description">
              {description ? parse(description) : ""}
            </p>
            <p className="event_link">
              <a href={link}>{link}</a>
            </p>
            <Modal.Footer>
              <Button
                variant="dark"
                className="hideDetailsButton"
                onClick={() => this.handleHideDetails()}
              >
                {" "}
                Close
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </Card>
    );
  }
}

export default Event;
