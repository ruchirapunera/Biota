Feature: POST Registration API 

Scenario: POST Registration API
    Given POST request to the Registration endpoint with valid and invalid "<field>"
    Then status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |
      | invalid email format                  | 400    | 
      | invalid contact number                | 400    |            
      | first name blank                      | 400    |   
      | last name blank                       | 400    |                                                    
      | password blank                        | 400    | 
      | already register user                 | 400    |                       
      | clinic registration number blank      | 400    |
      | registration number blank             | 400    | 
      | invalid first name                    | 400    |
      | invalid last name                     | 400    |
      | contact number blank                  | 400    |
      | role blank                            | 400    |
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
     