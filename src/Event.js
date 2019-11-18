import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import parse from 'html-react-parser';

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
    const showDetails = this.state.showDetails;

    return (
      <div className="Event" event={event}>
        <div className="eventSummary">
          <p className="event_name">{event.name}</p>
          <p className="event_localdate">{event.local_date}</p>
          <p className="event_group">{event.group.name}</p>
          {!showDetails && (
            <Button
              variant="dark"
              className="showDetailsButton"
              onClick={() => this.handleShowDetails()}
            >Details
        </Button>)}
        </div>
        {showDetails && (
          <div className="eventDetails">
            <p className="event_description">
              {event.description ? parse(event.description) : ''}


            </p>
            <p className="event_link">
              <a href={event.link}>{event.link}</a>
            </p>
            <p className="event_venue">{event.venue.name}</p>
            <Button
              variant="dark"
              className="showDetailsButton"
              onClick={() => this.handleHideDetails()}
            > Hide Details
          </Button>
          </div>
        )}
      </div>
    );
  }
}


export default Event;
