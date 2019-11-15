import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";

//unit tests

describe("<CitySearch /> component", () => {
  let CitySearchWrapper;
  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} />);
  });

  test("render text input", () => {
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });

  test("render list of suggestions", () => {
    expect(CitySearchWrapper.find(".suggestions")).toHaveLength(1);
  });

  test("render text input correctly", () => {
    const query = CitySearchWrapper.state("query");
    expect(CitySearchWrapper.find(".city").prop("value")).toBe(query);
  });

  test("change state when text input changes", () => {
    const eventObject = { target: { value: "Berlin" } };
    CitySearchWrapper.find(".city").simulate("change", eventObject);
    expect(CitySearchWrapper.state("query")).toBe("Berlin");
  });

  //number of suggestions rendered is compared to the number of suggestions in the state of CitySearch
  //rendered text (name_string) is checked to ensure that it’s also been taken from state.
  //for loop then loops through all the suggestions and compares the items in suggestions one by one
  test("render list of suggestions correctly", () => {
    const suggestions = CitySearchWrapper.state("suggestions");
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(
      suggestions.length
    );
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(
        CitySearchWrapper.find(".suggestions li")
          .at(i)
          .text()
      ).toBe(suggestions[i].name_string);
    }
  });

  test("click on suggestion should change query state and empty list of suggestions", () => {
    CitySearchWrapper.setState({
      suggestions: [
        {
          city: "Munich",
          country: "de",
          localized_country_name: "Germany",
          name_string: "Munich, Germany",
          zip: "meetup3",
          lat: 48.14,
          lon: 11.58
        },
        {
          city: "Munich",
          country: "us",
          localized_country_name: "USA",
          state: "ND",
          name_string: "Munich, North Dakota, USA",
          zip: "58352",
          lat: 48.66,
          lon: -98.85
        }
      ]
    });
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
    CitySearchWrapper.find(".suggestions li")
      .at(0)
      .simulate("click");
    //use toBe since we are comparing primitive data types
    expect(CitySearchWrapper.state("query")).toBe("Munich, Germany");
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(0);
  });
});

//integration tests

//successfully call updateEvents() function in the App component from the CitySearch component whenever user selects a suggestion
describe("<CitySearch /> integration", () => {
  test("get list of cities when user searches for Munich", async () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    CitySearchWrapper.find(".city").simulate("change", {
      target: { value: "Munich" }
    });
    //wait until CitySearch has been updated before comparing state
    await CitySearchWrapper.update();
    //use toEqual i/o toBe because values being compared are objects (complex data types)
    //toEqual recursively checks every field of object/array
    expect(CitySearchWrapper.state("suggestions")).toEqual([
      {
        city: "Munich",
        country: "de",
        localized_country_name: "Germany",
        name_string: "Munich, Germany",
        zip: "meetup3",
        lat: 48.14,
        lon: 11.58
      },
      {
        city: "Munich",
        country: "us",
        localized_country_name: "USA",
        state: "ND",
        name_string: "Munich, North Dakota, USA",
        zip: "58352",
        lat: 48.66,
        lon: -98.85
      }
    ]);
  });
});
