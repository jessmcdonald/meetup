import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<CitySearch /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test("render NumberOfEvents div", () => {
    expect(NumberOfEventsWrapper.find(".NumberOfEvents")).toHaveLength(1);
  });

  test("render NumberOfEvents div children", () => {
    expect(
      NumberOfEventsWrapper.find(".NumberOfEvents").children()
    ).toHaveLength(2);
  });

  test("render NumberOfEvents label", () => {
    expect(NumberOfEventsWrapper.find(".numberOfEvents_label")).toHaveLength(1);
  });

  test("render NumberOfEvents text input", () => {
    expect(NumberOfEventsWrapper.find(".userInputNumberOfEvents")).toHaveLength(
      1
    );
  });

  test("render NumberOfEvents text input correctly", () => {
    const numberOfEvents = NumberOfEventsWrapper.state("numberOfEvents");
    expect(
      NumberOfEventsWrapper.find(".userInputNumberOfEvents").prop("value")
    ).toBe(numberOfEvents);
  });

  test("default numberOfEvents should be 32", () => {
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe("32");
  });

  test("change state when text input changes", () => {
    const eventObject = { target: { value: "12" } };
    NumberOfEventsWrapper.find(".userInputNumberOfEvents").simulate(
      "change",
      eventObject
    );
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe("12");
  });
});
