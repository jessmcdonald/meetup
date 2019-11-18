Feature: Show / Hide Event Details

    Scenario: An event element is collapsed by default
        Given the user has not clicked on ‘Show details’ button for any specific event
        When the user views the event list
        Then the user should see the list of events with no details.

    Scenario: User can expand an event to see its details
        Given the user is viewing the list of events
        When the user clicks ‘Show details’ button for a specific event
        Then the event details should expand for the specific event

    Scenario: User can collapse an event to hide its details
        Given the user is viewing the expanded details of a specific event
        When the user clicks ‘Hide details’ button
        Then the event details will collapse
