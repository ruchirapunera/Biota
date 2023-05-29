import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor";

import loginAPI from "../pageObject/login";
import assertion from "../requestPayloads/commonRequest/assertion";


const login = new loginAPI();
const assert = new assertion();


Given('GET request to the Login endpoint with valid and invalid {string}', (field) => {

    login.loginrequest(field);

})

Then("login status code {string} and should return the correct reponse", function (statusCode) {

    assert.assertStatusCode('@loginResponse', statusCode);
    assert.assertResponseBody('@loginResponse', statusCode);
 
});
