Feature: Specify Number Of Events

    Scenario: When user hasn’t specified a number, 32 is the default number
        Given the user is viewing the list of events
        When the user has not specified a number of events to see
        Then 32 events will be displayed in the list

    Scenario: User can change the number of events they want to see
        Given the user is viewing the list of events
        When the user types a number into input field “Number of events to show”
        Then the list will refresh and show the number of events the user has specified
