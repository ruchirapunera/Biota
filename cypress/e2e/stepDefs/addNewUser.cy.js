
import { Given,Then } from "@badeball/cypress-cucumber-preprocessor";
import addUserAPI from "../pageObject/addNewUser";
import assertion from "../requestPayloads/commonRequest/assertion";


const addUser = new addUserAPI();
const assert = new assertion();


Given('POST request to the Add New User endpoint with valid and invalid {string}', (field) => {

    addUser.addNewUserRequest(field);

})

Then("add New User status code {string} and should return the correct reponse", function (statusCode) {

    assert.assertStatusCode('@addNewUserResponse', statusCode);
    assert.assertResponseBody('@addNewUserResponse', statusCode);

    
});









