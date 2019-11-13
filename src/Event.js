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

  render() {
    const showDetails = this.state.showDetails;

    return (
      <div className="Event">
        <div className="eventSummary">
          <p className="event_name">{this.state.event.name}</p>
          <p className="event_localdate">{this.state.event.local_date}</p>
          <p className="event_city">{this.state.event.venue.city}</p>

          <button
            className="showDetailsButton"
            onClick={() => this.handleShowDetails()}
          >
            Show Event Details
          </button>
        </div>
        {showDetails && (
          <div className="eventDetails">
            <p className="event_description">{this.state.event.description}</p>
            <p className="event_link">{this.state.event.link}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
