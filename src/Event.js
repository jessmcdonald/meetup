import React, { Component } from "react";

class Event extends Component {
  state = {
    event: {
      venue: {
        city: ""
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
      <div className="Event">
        <div className="eventSummary">
          <p className="event_name">{event.name}</p>
          <p className="event_localdate">{event.local_date}</p>
          <p className="event_city">{event.group.name}</p>

          <button
            className="showDetailsButton"
            onClick={() => this.handleShowDetails()}
          >
            Details
          </button>
        </div>
        {showDetails && (
          <div className="eventDetails">
            <p className="event_description">{event.description}</p>
            <p className="event_link">
              <a href={event.link}>{event.link}</a>
            </p>
            <p className="event_venue">{event.venue.name}</p>
            <button
              className="showDetailsButton"
              onClick={() => this.handleHideDetails()}
            >
              Hide Details
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
