import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor";
import assertion from "../requestPayloads/commonRequest/assertion";
import forgetPasswordAPI from "../pageObject/forgetPassword";

const forget = new forgetPasswordAPI();
const assert = new assertion();

Given('GET request to the Forget Password endpoint with valid and invalid {string}', (field) => {
  forget.forgetPasswordrequest(field);
})

Then("forget password status code {string} and should return the correct reponse", function (statusCode) {
 
    assert.assertStatusCode('@forgetPasswordResponse', statusCode);
    assert.assertResponseBody('@forgetPasswordResponse', statusCode);

})