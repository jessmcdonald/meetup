import React, { Component } from "react";
import moment from "moment";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

class EventChart extends Component {
  state = {
    events: []
  };

  getData = events => {
    //create empty array for next 7 days
    const next7Days = [];
    //today
    const currentDate = moment();
    //loop 7 times for next 7 days
    for (let i = 0; i < 7; i++) {
      //add 1 to current date, currentDate changes
      currentDate.add(1, "days");
      //format date
      const dateString = currentDate.format("YYYY-MM-DD");
      //change date format for graph display
      const dateDisplay = currentDate.format("DD MMM");
      //use countEventsOnDate function to count #events on this date
      const count = this.countEventsOnADate(events, dateString);
      //add this date&number to list
      next7Days.push({ date: dateDisplay, number: count });
    }
    return next7Days;
  };

  countEventsOnADate = (events, date) => {
    //initialise count at 0
    let count = 0;
    //loop through events stored in state, for every event that local_dat = date, increase count by 1
    events.forEach(event => {
      if (event.local_date === date) count++;
    });
    return count;
  };

  render() {
    const { events } = this.props;

    return (
      <Container>
        <Row>
          <ResponsiveContainer height={400}>
            <AreaChart
              width={400}
              height={400}
              margin={{ top: 20, right: 60, bottom: 20, left: 10 }}
              data={this.getData(events)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="date" name="date" />
              <YAxis
                type="number"
                name="number of events"
                allowDecimals={false}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="number"
                stroke="#f64060"
                fill="#12b88a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Row>
      </Container>
    );
  }
}

export default EventChart;
