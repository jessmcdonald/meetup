import React from "react";
import { shallow } from "enzyme";
import EventList from "../EventList";
import Event from "../Event";

describe("<App /> component", () => {
  test("render correct number of events", () => {
    const EventListWrapper = shallow(
      <EventList
        events={[
          { id: 1, group: { value: 1 } },
          { id: 2, group: { value: 2 } },
          { id: 3, group: { value: 3 } },
          { id: 4, group: { value: 4 } }
        ]}
      />
    );
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });
});
