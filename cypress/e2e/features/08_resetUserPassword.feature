Feature: PUT Reset User Password API 

Scenario: Put Reset User Password API
    Given PUT request to the Reset User Password endpoint with valid and invalid "<field>"
    Then reset User Password status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |
      | invalid userId                        | 404    | 
      | blank userId                          | 400    | 
      | password blank                        | 400    | 
      | invalid password                      | 400    | 
      | invalid confirm password              | 400    |         
      | confirm password blank                | 400    |   
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
               
     