import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import assertion from "../requestPayloads/commonRequest/assertion";
import getOnlyGeneralPhysiciansAPI from "../pageObject/getOnlyGeneralPhysicians";
const responseBody = require('../../fixtures/json/responseBody.json')

const get = new getOnlyGeneralPhysiciansAPI();
const assert = new assertion();


Given('GET request to the Only General Physicians endpoint with valid and invalid {string}', (field) => {

    get.getOnlyGeneralPhysiciansrequest(field)

})

Then("only General Physicians status code {string} and should return the correct reponse", function (statusCode) {

    assert.assertStatusCode('@getOnlyGeneralPhysiciansResponse', statusCode);

    cy.get('@getOnlyGeneralPhysiciansResponse').should((response) => {
        const body = response.body;


        if (statusCode === '200') {
            expect(body).to.be.an('array').and.not.to.be.empty;

            body.forEach((item) => {
                expect(item).to.have.property('uniqueId');
                expect(item).to.have.property('registrationNumber');
                expect(item).to.have.property('firstName');
                expect(item).to.have.property('lastName');
                expect(item).to.have.property('clinicRegistrationNumber');
                expect(item).to.have.property('isActive');
                expect(item).to.have.property('centerId');
                expect(item).to.have.property('id');
                expect(item).to.have.property('userName');
                expect(item).to.have.property('normalizedUserName');
                expect(item).to.have.property('email');
                expect(item).to.have.property('normalizedEmail');
                expect(item).to.have.property('emailConfirmed');
                expect(item).to.have.property('passwordHash');
                expect(item).to.have.property('securityStamp');
                expect(item).to.have.property('concurrencyStamp');
                expect(item).to.have.property('phoneNumber');
                expect(item).to.have.property('phoneNumberConfirmed');
                expect(item).to.have.property('twoFactorEnabled');
                expect(item).to.have.property('lockoutEnd');
                expect(item).to.have.property('lockoutEnabled');
                expect(item).to.have.property('accessFailedCount');
            })
        }
        else if (statusCode === '400' || statusCode === '401' || statusCode === '404') {
            // Assertions for error response

            const expectedResponses = responseBody.filter(res => res.StatusCode === statusCode);
            const expectedValues = expectedResponses.map(res => res.ExpectedValue)
            // const body = response.body;

            if (expectedValues.includes(body)) {
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

            // Access the invalidUserId alias and perform assertions (if available)
            //  cy.getInvalidUserId();

        }
    })
    // assert.assertResponseBody('@getOnlyGeneralPhysiciansResponse', statusCode);

});

