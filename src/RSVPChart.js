import React, { Component } from "react";
import moment from "moment";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

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
    const colors = ["#68396d", "#12b88a"];
    console.log(rsvp);
    console.log(rsvpLeft);

    return (
      <ResponsiveContainer height={70}>
        <PieChart width={80} height={80}>
          <Pie data={pieData} cx={40} cy={25} innerRadius={7} outerRadius={25}>
            {pieData.map((entry, index) => (
              <Cell fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default RSVPChart;
