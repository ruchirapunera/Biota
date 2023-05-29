Feature: GET General Physicians API 

Scenario: GET General Physicians API
    Given GET request to the General Physicians endpoint with valid and invalid "<field>"
    Then General Physicians status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |                                                     
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
     