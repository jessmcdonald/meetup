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

    const name = event.name;
    const time = event.local_time;
    const date = event.local_date;
    const group = event && event.group ? event.group.name : '';
    const rsvp = event.yes_rsvp_count;
    const rsvpLeft = event.rsvp_limit - event.yes_rsvp_count;
    const description = event.description;
    const link = event.link;
    const venue = event && event.venue ? event.venue.name : '';

    const showDetails = this.state.showDetails;

    return (
      <div className="Event" event={event}>
        <div className="eventSummary">
          <p className="event_name">{name}</p>
          <p className="event_localdate">{time} - {date}</p>
          <p className="event_group">{group}</p>
          <p className="event_rsvp">{rsvp} going</p>
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
              {description ? parse(description) : ''}
            </p>
            <p className="event_link">
              <a href={link}>{link}</a>
            </p>
            <p className="event_venue">{venue}</p>
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
