import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import changeUserPasswordAPI from "../pageObject/changeUserPassword";
import assertion from "../requestPayloads/commonRequest/assertion";


const changePassword = new changeUserPasswordAPI();
const assert = new assertion();


Given('PUT request to the Change User Password endpoint with valid and invalid {string}', (field) => {

    changePassword.changeUserPasswordRequest(field);

})

Then("change User Password status code {string} and should return the correct reponse", function (statusCode) {

    assert.assertStatusCode('@changeUserPasswordResponse', statusCode);
    assert.assertResponseBody('@changeUserPasswordResponse', statusCode);

    
});









