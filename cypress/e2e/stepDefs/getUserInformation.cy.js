import { Given,Then } from "@badeball/cypress-cucumber-preprocessor"
import assertion from "../requestPayloads/commonRequest/assertion"
import getUserInformationAPI from "../pageObject/getUserInformation"
const responseBody = require('../../fixtures/json/responseBody.json')

const assert = new assertion();
const getUserInformation = new getUserInformationAPI();

Given('GET request to the User Information endpoint with valid and invalid {string}', (field) => {

    getUserInformation.getUserInformationrequest(field);

})

Then("get User Information status code {string} and should return the correct reponse", function (statusCode) {

    assert.assertStatusCode('@getUserInformationResponse', statusCode)
    
      
    cy.get('@getUserInformationResponse').should((response) => {
        const body = response.body;
        

        if (statusCode === '200') {
            expect(body).to.have.property('uniqueId');
            expect(body).to.have.property('registrationNumber');
            expect(body).to.have.property('firstName');
            expect(body).to.have.property('lastName');
            expect(body).to.have.property('clinicRegistrationNumber');
            expect(body).to.have.property('isActive');
            expect(body).to.have.property('centerId');
            expect(body).to.have.property('id');
            expect(body).to.have.property('userName');
            expect(body).to.have.property('normalizedUserName');
            expect(body).to.have.property('email');
            expect(body).to.have.property('normalizedEmail');
            expect(body).to.have.property('emailConfirmed');
            expect(body).to.have.property('passwordHash');
            expect(body).to.have.property('securityStamp');
            expect(body).to.have.property('concurrencyStamp');
            expect(body).to.have.property('phoneNumber');
            expect(body).to.have.property('phoneNumberConfirmed');
            expect(body).to.have.property('twoFactorEnabled');
            expect(body).to.have.property('lockoutEnd');
            expect(body).to.have.property('lockoutEnabled');
            expect(body).to.have.property('accessFailedCount');
        }
        else if (statusCode === '400' || statusCode === '401' || statusCode === '404') {
            // Assertions for error response
            
            const expectedResponses = responseBody.filter(res => res.StatusCode === statusCode);
            const expectedValues = expectedResponses.map(res => res.ExpectedValue)
            const body = response.body;

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

            // Access the invalidUserId alias and perform assertions (if available)
            //  cy.getInvalidUserId();
            
        }
    })
})