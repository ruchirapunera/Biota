Feature: GET Login API 

Scenario: GET Login API
    Given GET request to the Login endpoint with valid and invalid "<field>"
    Then login status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |
      | invalid username                      | 404    | 
      | invalid password                      | 400    |            
      | username blank                        | 500    |   
      | password blank                        | 500    |                                                    
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
     