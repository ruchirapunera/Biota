Feature: GET Generation of Session API 

Scenario: GET Generation of Session API
    Given GET request to the Generation of Session endpoint with valid and invalid "<field>"
    Then Generation of Session status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |                                                     
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
     