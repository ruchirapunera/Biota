Feature: GET Forget Password API 

Scenario: GET Forget Password API
    Given GET request to the Forget Password endpoint with valid and invalid "<field>"
    Then forget password status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |
      | invalid username for Forget Password  | 404    |            
      | username blank  for Forget Password   | 400    |                                                      
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
     