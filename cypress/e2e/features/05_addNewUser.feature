Feature: POST Add New User API 

Scenario: POST Add New User API
    Given POST request to the Add New User endpoint with valid and invalid "<field>"
    Then add New User status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |
      | invalid email format                  | 400    | 
      | invalid contact number                | 400    | 
      | first name blank                      | 400    |
      | last name blank                       | 400    | 
      | password blank                        | 400    | 
      | already created user                  | 400    | 
      | already used number                   | 400    |         
      | confirm password blank                | 400    |   
      | contact number blank                  | 400    |                                                                         
      | invalid first name                    | 400    |
      | invalid last name                     | 400    |
      | role blank                            | 400    |
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
     