import { Given,Then } from "@badeball/cypress-cucumber-preprocessor";
import assertion from "../requestPayloads/commonRequest/assertion";
import changeUserStatusAPI from "../pageObject/changeUserStatus";
const responseBody = require('../../fixtures/json/responseBody.json')

const assert = new assertion();
const changeUserStatus = new changeUserStatusAPI();

Given('GET request to the Change User Status endpoint with valid and invalid {string}', (field) => {
    changeUserStatus.changeUserStatusrequest(field)
  })
  
  Then("change User Status status code {string} and should return the correct reponse", function (statusCode) {
   
      assert.assertStatusCode('@changeUserStatusResponse', statusCode);
      assert.assertResponseBody('@changeUserStatusResponse', statusCode);
  
  })