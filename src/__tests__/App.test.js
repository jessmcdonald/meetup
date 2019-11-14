import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockEvents } from "../mock-events";

//unit tests
describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("render NumberOfEvents", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

//integration tests
describe("<App /> integration", () => {
  test("get list of events after user selects city from suggestions", async () => {
    //full rendering API uses mount() instead of shallow()
    //get access to component + children + all their functions
    const AppWrapper = mount(<App />);
    //mock function to test it -> jest.fn executes updateEvents() function so we can see results
    AppWrapper.instance().updateEvents = jest.fn();
    //need to force App component to update after mocking updateEvents() function
    AppWrapper.instance().forceUpdate();
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    //'value' here could be anything, handleItemClicked function must be called with a value
    CitySearchWrapper.instance().handleItemClicked("value", 1.1, 1.2);
    //can add multiple expect() functions, test will only pass if all pass
    //matcher = toHaveBeenCalledTimes = how many time function is required to have been called
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    //check updateEvents() caled with same lat + lon as above
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(1.1, 1.2);
    //full rendering mounts components to DOM, tests that share same DOM will affect each other if do not 'clean up' DOM
    AppWrapper.unmount();
  });

  //ensure state 'events' of App = mocked event data after updateEvents() has been called
  test("change state after get list of events", async () => {
    const AppWrapper = shallow(<App />);
    AppWrapper.instance().updateEvents(1.1, 1.2);
    await AppWrapper.update();
    expect(AppWrapper.state("events")).toEqual(mockEvents.events);
  });

  //ensure events rendered in EventList are the events recieved from App component
  test("render correct list of events", () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({
      events: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    });
    expect(AppWrapper.find(".Event")).toHaveLength(4);
    AppWrapper.unmount();
  });
});
