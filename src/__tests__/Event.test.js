import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event />);
  });

  test("render event summary", () => {
    expect(EventWrapper.find(".eventSummary")).toHaveLength(1);
  });

  test("render event summary children", () => {
    expect(EventWrapper.find(".eventSummary").children()).toHaveLength(4);
  });

  test("render event name", () => {
    expect(EventWrapper.find(".event_name")).toHaveLength(1);
  });

  test("render event local date", () => {
    expect(EventWrapper.find(".event_localdate")).toHaveLength(1);
  });

  test("render event city", () => {
    expect(EventWrapper.find(".event_city")).toHaveLength(1);
  });

  test("render showDetails button", () => {
    expect(EventWrapper.find(".showDetailsButton")).toHaveLength(1);
  });

  test("clicking showDetails button changes state showDetails: true", () => {
    EventWrapper.setState({
      showDetails: false
    });
    EventWrapper.find(".showDetailsButton").simulate("click");
    expect(EventWrapper.state("showDetails")).toBe(true);
  });

  test("event details are shown when state showDetails: true", () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find(".eventDetails")).toHaveLength(1);
  });

  test("event details are NOT shown when state showDetails: false", () => {
    EventWrapper.setState({
      showDetails: false
    });
    expect(EventWrapper.find(".eventDetails").children()).toHaveLength(0);
  });

  test("event details children are shown when state showDetails: true", () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find(".eventDetails").children()).toHaveLength(2);
  });

  test("event description shown when state showDetails: true", () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find(".event_description")).toHaveLength(1);
  });

  test("event link shown when state showDetails: true", () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find(".event_link")).toHaveLength(1);
  });

  test("read event name correctly", () => {
    EventWrapper.setState({
      event: {
        created: 1572906134000,
        duration: 10800000,
        id: "266216930",
        name: "Manual for Misery - Or: How not to javascript…",
        rsvp_limit: 70,
        date_in_series_pattern: false,
        status: "upcoming",
        time: 1573752600000,
        local_date: "2019-11-14",
        local_time: "18:30",
        updated: 1573236103000,
        utc_offset: 3600000,
        waitlist_count: 0,
        yes_rsvp_count: 44,
        venue: {
          id: 25852843,
          name: "codecentric AG",
          lat: 52.50804901123047,
          lon: 13.427257537841797,
          repinned: true,
          address_1: "Köpenicker Str 31",
          city: "Berlin",
          country: "de",
          localized_country_name: "Germany"
        },
        group: {
          created: 1485199128000,
          name: "codecentric Berlin",
          id: 22048639,
          join_mode: "open",
          lat: 52.52000045776367,
          lon: 13.380000114440918,
          urlname: "codecentric-Berlin",
          who: "Members",
          localized_location: "Berlin, Germany",
          state: "",
          country: "de",
          region: "en_US",
          timezone: "Europe/Berlin"
        },
        link: "https://www.meetup.com/codecentric-Berlin/events/266216930/",
        description:
          "<p>Talk: Manual for Misery - Or: How not to javascript…<br/>----------------------------------------------------------------</p> <p>You got a problem or an idea and think about using JavaScript to solve it? We can tell you how to set up your project for a most painful experience! We have gathered all our mistakes and flaws from all sorts of JavaScript projects and merged them into one hell of a project. But don’t worry, we survived and now want to share with you what better not to do...</p> <p>Speaker: Anna Backs &amp; Christina Zenzes</p> <p>Anna Backs is a software developer and IT-consultant working for codecentric. When she is not outside with her dog or absorbed in the world of Shadowrun, she is usually found building some thing or another in Java or JavaScript. She loves coffee and learning new things.<br/>Twitter: @merelyAnna</p> <p>Christina Zenzes is a consultant and software dev working at codecentric AG. She is passionate about React, CSS, clean code and testing (yes, really!). Besides writing functional JavaScript code, she loves growing plants on her balcony, petting cats and good food.</p> <p>Schedule<br/>-------------<br/>18:30 Doors Open<br/>19:00 Talk starts<br/>20:00 Socializing</p> ",
        visibility: "public",
        member_pay_fee: false
      }
    });
    expect(EventWrapper.state("event").name).toBe(
      "Manual for Misery - Or: How not to javascript…"
    );
  });

  test("read event city correctly", () => {
    EventWrapper.setState({
      event: {
        created: 1572906134000,
        duration: 10800000,
        id: "266216930",
        name: "Manual for Misery - Or: How not to javascript…",
        rsvp_limit: 70,
        date_in_series_pattern: false,
        status: "upcoming",
        time: 1573752600000,
        local_date: "2019-11-14",
        local_time: "18:30",
        updated: 1573236103000,
        utc_offset: 3600000,
        waitlist_count: 0,
        yes_rsvp_count: 44,
        venue: {
          id: 25852843,
          name: "codecentric AG",
          lat: 52.50804901123047,
          lon: 13.427257537841797,
          repinned: true,
          address_1: "Köpenicker Str 31",
          city: "Berlin",
          country: "de",
          localized_country_name: "Germany"
        },
        group: {
          created: 1485199128000,
          name: "codecentric Berlin",
          id: 22048639,
          join_mode: "open",
          lat: 52.52000045776367,
          lon: 13.380000114440918,
          urlname: "codecentric-Berlin",
          who: "Members",
          localized_location: "Berlin, Germany",
          state: "",
          country: "de",
          region: "en_US",
          timezone: "Europe/Berlin"
        },
        link: "https://www.meetup.com/codecentric-Berlin/events/266216930/",
        description:
          "<p>Talk: Manual for Misery - Or: How not to javascript…<br/>----------------------------------------------------------------</p> <p>You got a problem or an idea and think about using JavaScript to solve it? We can tell you how to set up your project for a most painful experience! We have gathered all our mistakes and flaws from all sorts of JavaScript projects and merged them into one hell of a project. But don’t worry, we survived and now want to share with you what better not to do...</p> <p>Speaker: Anna Backs &amp; Christina Zenzes</p> <p>Anna Backs is a software developer and IT-consultant working for codecentric. When she is not outside with her dog or absorbed in the world of Shadowrun, she is usually found building some thing or another in Java or JavaScript. She loves coffee and learning new things.<br/>Twitter: @merelyAnna</p> <p>Christina Zenzes is a consultant and software dev working at codecentric AG. She is passionate about React, CSS, clean code and testing (yes, really!). Besides writing functional JavaScript code, she loves growing plants on her balcony, petting cats and good food.</p> <p>Schedule<br/>-------------<br/>18:30 Doors Open<br/>19:00 Talk starts<br/>20:00 Socializing</p> ",
        visibility: "public",
        member_pay_fee: false
      }
    });
    expect(EventWrapper.state("event").venue.city).toBe("Berlin");
  });
});
