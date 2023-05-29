import { getUserInformationPayload } from '../requestPayloads/ApiPayload/getUserInformationPayload';
const api = require("../../fixtures/json/api.json");
const authorization = require('../../fixtures/json/authorization.json')
const baseUrl = require('../../fixtures/json/baseUrl.json')
const requestBody = require('../../fixtures/json/requestBody.json')
import requestUtils from '../requestPayloads/commonRequest/requestUtils';

class getUserInformationAPI {

    getUserInformationrequest(field) {

        const apiEndpoint = requestUtils.getEndpoint('getUserInformationAPi');

            cy.fixture("json/baseUrl").then((baseUrlData) => {
                const baseURL = baseUrlData[0].baseUrl;

                cy.fixture("json/authorization").then((authorizationData) => {
                    const authUsername = authorizationData[0].username;
                    const authPassword = authorizationData[0].password;

                    const requestData = requestUtils.getRequestFieldValue(field);
                    let Payload = field === 'valid details' ? getUserInformationPayload.getUserInformation : { ...getUserInformationPayload.getUserInformation };
                        
                    let payload = Payload;
                        let endpoint = apiEndpoint;
                        let requestAuth = {
                            username: authUsername,
                            password: authPassword
                        };

                        switch (field) {
                            case 'valid details':
                                payload = Payload;
                                break;
                            case 'invalid userId':
                                payload = { userId: requestUtils.getRequestFieldValue('invalidid') };
                                break;
                            case 'blank userId':
                                payload = { userId: requestUtils.getRequestFieldValue('blankid') };
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

                        const queryParams = new URLSearchParams({
                            userId: payload.userId
                        }).toString();


                        cy.request({
                            method: 'GET',
                            url: `${baseURL}${endpoint}?${queryParams}`,
                            auth: requestAuth,
                            failOnStatusCode: false
                        })
                            .as('getUserInformationResponse').then((response) => {
                                
                                cy.log(response.requestBody)
                                cy.log(JSON.stringify(response.body))
                            });
                    });
                })
    }
}

export default getUserInformationAPI;