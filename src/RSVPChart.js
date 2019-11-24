import React, { Component } from "react";
import moment from "moment";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

class RSVPChart extends Component {
  state = {
    event: this.props
  };

  render() {
    const event = this.props.event;
    const rsvp = event.yes_rsvp_count;
    const rsvpLeft = event.rsvp_limit - event.yes_rsvp_count;
    const pieData = [
      { name: "going", value: rsvp },
      { name: "free spots", value: rsvpLeft }
    ];
    console.log(rsvp);
    console.log(rsvpLeft);

    return (
      <PieChart width={100} height={100}>
        <Pie
          data={pieData}
          cx={40}
          cy={40}
          innerRadius={7}
          outerRadius={35}
          fill="#82ca9d"
        />
        <Tooltip />
      </PieChart>
    );
  }
}

export default RSVPChart;
