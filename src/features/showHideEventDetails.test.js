import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import App from "../App";
import Event from "../Event";
import { mockEvents } from "../mock-events";

const feature = loadFeature("./src/features/showHideEventDetails.feature");

defineFeature(feature, test => {
  //scenario 1

  test("An event element is collapsed by default", ({ given, when, then }) => {
    let EventWrapper;
    given(
      "the user has not clicked on ‘Show details’ button for any specific event",
      () => {
        EventWrapper = shallow(<Event event={{}} />);
      }
    );

    when("the user views the event list", () => {});

    then("the user should see the list of events with no details.", () => {
      expect(EventWrapper.find("Modal")).toHaveLength(0);
    });
  });

  //scenario 2

  test("User can expand an event to see its details", ({
    given,
    when,
    then
  }) => {
    let EventWrapper;
    given("the user is viewing the list of events", () => {
      EventWrapper = shallow(<Event event={{}} />);
    });

    when("the user clicks ‘Show details’ button for a specific event", () => {
      EventWrapper.find(".Event .showDetailsButton").simulate("click");
    });

    then("the event details should expand for the specific event", () => {
      expect(EventWrapper.find(".eventDetails")).toHaveLength(1);
    });
  });

  //scenario 3

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then
  }) => {
    let EventWrapper;
    given(
      "the user is viewing the expanded details of a specific event",
      () => {
        EventWrapper = shallow(<Event event={{}} />);
        EventWrapper.find(".Event .showDetailsButton").simulate("click");
      }
    );

    when("the user clicks ‘Hide details’ button", () => {
      EventWrapper.find(".eventDetails .hideDetailsButton").simulate("click");
    });

    then("the event details will collapse", () => {
      expect(EventWrapper.find("Modal")).toHaveLength(0);
    });
  });
});
