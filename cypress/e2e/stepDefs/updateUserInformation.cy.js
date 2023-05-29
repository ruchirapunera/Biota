import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import updateUserInformationAPI from "../pageObject/updateUserInformation";
import assertion from "../requestPayloads/commonRequest/assertion";


const update = new updateUserInformationAPI();
const assert = new assertion();


Given('PUT request to the Update User Information endpoint with valid and invalid {string}', (field) => {

    update.updateUserInformationRequest(field);

})

Then("update User Information status code {string} and should return the correct reponse", function (statusCode) {

    assert.assertStatusCode('@updateUserInformationResponse', statusCode);
    assert.assertResponseBody('@updateUserInformationResponse', statusCode);

    
});









