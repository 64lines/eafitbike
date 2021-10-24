Feature: The title of the web page must be EAFIT Bike

Scenario: Check web page title scenario
    Given I open the browser and go to the site page
    When I check the title of the page
    Then the title should be EAFIT bike