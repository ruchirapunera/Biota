Feature: GET User Information API 

Scenario: GET User Information API
    Given GET request to the User Information endpoint with valid and invalid "<field>"
    Then get User Information status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |
      | invalid userId                        | 404    | 
      | blank userId                          | 404    | 
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    | 
      