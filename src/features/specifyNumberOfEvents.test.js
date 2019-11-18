import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import App from "../App";
import CitySearch from "../CitySearch";
import { mockEvents } from "../mock-events";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
  test("When user hasn’t specified a number, 32 is the default number", ({
    given,
    when,
    then
  }) => {
    given("the user is viewing the list of events", () => {});

    when("the user has not specified a number of events to see", () => {});

    then(/^(.*) events will be displayed in the list$/, arg0 => {});
  });

  test("User can change the number of events they want to see", ({
    given,
    when,
    then
  }) => {
    given("the user is viewing the list of events", () => {});

    when(
      "the user types a number into input field “Number of events to show”",
      () => {}
    );

    then(
      "the list will refresh and show the number of events the user has specified",
      () => {}
    );
  });
});
