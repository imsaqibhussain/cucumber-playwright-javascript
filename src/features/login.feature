Feature: Example Feature
  Scenario: mtbc career portal
    Given lets open the mtbc career portal '<URL>'
    When lets login with '<username>' and '<password>'
    Then logout the career portal
    Examples:
      | URL                      | username                  | password  |
      | https://careers.mtbc.com | automation@mailinator.com | Mtbc@1234 |