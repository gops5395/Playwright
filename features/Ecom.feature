Feature: Ecom validations

    Scenario: Placing the order 
    Given Login to ecom website with the valid "anshika@gmail.com" and "Iamking@000"
    When Add item "ADIDAS ORIGINAL" into the cart
    Then verify "ADIDAS ORIGINAL" display in the cart page
    When enter valid details and place the order
    Then verify order present in order history page