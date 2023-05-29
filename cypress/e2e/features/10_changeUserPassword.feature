Feature: PUT Change User Password API 

Scenario: PUT Change User Password API
    Given PUT request to the Change User Password endpoint with valid and invalid "<field>"
    Then change User Password status code "<statusCode>" and should return the correct reponse

    Examples:
      | field                                 | statusCode |       
      | valid details                         | 200    |
      | invalid userId                        | 404    | 
      | blank userId                          | 400    |
      | old password blank                    | 400    | 
      | new password blank                    | 400    | 
      | invalid old password                  | 400    | 
      | invalid new password                  | 400    | 
      | confirm password blank                | 400    | 
      | invalid confirm password              | 400    | 
      | invalid URL                           | 404    |    
      | invalid autorization                  | 401    |
      | without autorization                  | 401    |            
     