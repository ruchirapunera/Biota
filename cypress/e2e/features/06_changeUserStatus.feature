Feature: GET Change User Status API 

Scenario: GET Forget Password API
    Given GET request to the Change User Status endpoint with valid and invalid "<field>"
    Then change User Status status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |
      | invalid id                            | 400    |            
      | invalid isActive                      | 400    |  
      | blank id                              | 400    |            
      | blank isActive                        | 400    |                                                     
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
     
     