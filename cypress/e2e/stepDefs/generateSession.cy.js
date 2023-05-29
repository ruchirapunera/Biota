import { Given,Then } from "@badeball/cypress-cucumber-preprocessor";
import assertion from "../requestPayloads/commonRequest/assertion";
import generateSessionAPI from "../pageObject/generationOfSession";
const  responseBody = require('../../fixtures/json/responseBody.json')

const assert = new assertion();
const generate = new generateSessionAPI();

Given('GET request to the Generation of Session endpoint with valid and invalid {string}', (field) => {

    generate.generateSessionRequest(field);
})

Then("Generation of Session status code {string} and should return the correct reponse", function (statusCode) {

    assert.assertStatusCode('@generateSessionResponse', statusCode)

    cy.get('@generateSessionResponse').should((response) => {
        if (statusCode === '200') {
            const body = response.body;
            expect(body).to.have.property('token').that.is.a('string');
            expect(body).to.have.property('expires_in').that.is.a('number');
        }
        else if (statusCode === '400' || statusCode === '401' || statusCode === '404') {
            // Assertions for error response
            
            const expectedResponses = responseBody.filter(res => res.StatusCode === statusCode);
            const expectedValues = expectedResponses.map(res => res.ExpectedValue)
            // const body = response.body;

            if(expectedValues.includes(body)) {
                expect(body).to.equal(expectedValues.find(val => val == body))
            } else {
                expect(body).to.have.property('type');
                expect(body).to.have.property('title');
                expect(body).to.have.property('status');
                expect(body).to.have.property('traceId');
                if (body.errors) {
                    expect(body).to.have.property('errors');
                }
                
            }
            // assert.assertResponseBody('@generateSessionResponse', statusCode);
        }
    })
})