Feature: GET Only General Physicians API 

Scenario: GET Login API
    Given GET request to the Only General Physicians endpoint with valid and invalid "<field>"
    Then only General Physicians status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |                                                   
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
     