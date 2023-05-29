import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import registrationAPI from "../pageObject/registration";
import assertion from "../requestPayloads/commonRequest/assertion";


const register = new registrationAPI();
const assert = new assertion();


Given('POST request to the Registration endpoint with valid and invalid {string}', (field) => {

    register.registrationRequest(field);

})

Then("status code {string} and should return the correct reponse", function (statusCode) {

    assert.assertStatusCode('@registerResponse', statusCode);
    assert.assertResponseBody('@registerResponse', statusCode);
    

    
});









