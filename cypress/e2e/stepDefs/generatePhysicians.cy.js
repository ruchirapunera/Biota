import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import assertion from "../requestPayloads/commonRequest/assertion";
import generalPhysiciansAPI from "../pageObject/getGeneralPhysicians";
import responseBody from '../../fixtures/json/responseBody.json';

const generate = new generalPhysiciansAPI();
const assert = new assertion();


Given('GET request to the General Physicians endpoint with valid and invalid {string}', (field) => {

    generate.generalPhysiciansrequest(field);

})

Then("General Physicians status code {string} and should return the correct reponse", function (statusCode) {

    assert.assertStatusCode('@generateResponse', statusCode);

    cy.get('@generateResponse').should((response) => {
        const body = response.body;


        if (statusCode === '200') {
            expect(body).to.be.an('array').and.not.to.be.empty;

            body.forEach((item) => {
                
                expect(item).to.have.property('email');
                expect(item).to.have.property('doctorId');
                expect(item).to.have.property('firstName');
                expect(item).to.have.property('lastName');
                expect(item).to.have.property('clinicId');
                expect(item).to.have.property('contactNumber');
                expect(item).to.have.property('pulmonologistName');
            })
        }
        else if (statusCode === '400' || statusCode === '401' || statusCode === '404' || statusCode === '500') {
            // Assertions for error response

            const expectedResponses = responseBody.filter(res => res.StatusCode === statusCode);
            const expectedValues = expectedResponses.map(res => res.ExpectedValue)
            const body = response.body;

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
            // assert.assertResponseBody('@generateResponse', statusCode);


        }
    })
})

