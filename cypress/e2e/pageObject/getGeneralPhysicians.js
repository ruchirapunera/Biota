const api = require("../../fixtures/json/api.json");
const authorization = require('../../fixtures/json/authorization.json')
const baseUrl = require('../../fixtures/json/baseUrl.json')
const requestBody = require('../../fixtures/json/requestBody.json')
const responseBody = require('../../fixtures/json/responseBody.json')
import requestUtils from '../requestPayloads/commonRequest/requestUtils';

class generalPhysiciansAPI {

    generalPhysiciansrequest(field) {

        const apiEndpoint = requestUtils.getEndpoint('generalPhysiciansApi');

            cy.fixture("json/baseUrl").then((baseUrlData) => {
                const baseURL = baseUrlData[0].baseUrl;

                cy.fixture("json/authorization").then((authorizationData) => {
                    const authUsername = authorizationData[0].username;
                    const authPassword = authorizationData[0].password;
     
                        let endpoint = apiEndpoint;
                        let requestAuth = {
                            username: authUsername,
                            password: authPassword
                        };

                        switch (field) {
                            case 'valid details':
                                break;
                            case 'invalid URL':
                                endpoint = baseUrlData[0].invalidUrl;
                                break;
                            case 'invalid autorization':
                                const invalidAuthUsername = authorizationData[0].invalidusername;
                                const invalidAuthPassword = authorizationData[0].invalidpassword;
                                requestAuth = {
                                    username: invalidAuthUsername,
                                    password: invalidAuthPassword
                                };
                                break;
                            case 'without autorization':
                                const withoutAuthUsername = authorizationData[0].withoutusername;
                                const withoutAuthPassword = authorizationData[0].withoutpassword;
                                requestAuth = {
                                    username: withoutAuthUsername,
                                    password: withoutAuthPassword
                                };
                                break;
                            default:
                                throw new Error(`Invalid fields: ${field}`);
                        }

                        cy.request({
                            method: 'GET',
                            url: `${baseURL}${endpoint}`,
                            auth: requestAuth,
                            failOnStatusCode: false
                        })
                            .as('generateResponse').then((Response) => {
                                cy.log(Response.requestBody)
                                cy.log(JSON.stringify(Response.body))
                            });
                    });
                })
    }
}

export default generalPhysiciansAPI;