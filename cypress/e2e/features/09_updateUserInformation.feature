Feature: PUT Update User Information API 

Scenario: PUT Update User Information API
    Given PUT request to the Update User Information endpoint with valid and invalid "<field>"
    Then update User Information status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |
      | invalid email format                  | 400    | 
      | invalid contact number                | 400    | 
      | first name blank                      | 400    |
      | last name blank                       | 400    |
      | invalid first name                    | 400    |
      | invalid last name                     | 400    |
      | email blank                           | 400    |
      | contact number blank                  | 400    |
      | invalid userId                        | 404    | 
      | blank userId                          | 404    |
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
     