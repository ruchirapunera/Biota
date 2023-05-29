import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import resetUserPasswordAPI from "../pageObject/resetUserPassword";
import assertion from "../requestPayloads/commonRequest/assertion";


const reset = new resetUserPasswordAPI();
const assert = new assertion();


Given('PUT request to the Reset User Password endpoint with valid and invalid {string}', (field) => {

    reset.resetUserPasswordRequest(field);

})

Then("reset User Password status code {string} and should return the correct reponse", function (statusCode) {

    assert.assertStatusCode('@resetUserPasswordResponse', statusCode);
    assert.assertResponseBody('@resetUserPasswordResponse', statusCode);

});









