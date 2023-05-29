import requestUtils from "../requestPayloads/commonRequest/requestUtils";
import { forgetPasswordPayload } from "../requestPayloads/ApiPayload/forgetPasswordPayload";
const api = require("../../fixtures/json/api.json");
const authorization = require('../../fixtures/json/authorization.json')
const baseUrl = require('../../fixtures/json/baseUrl.json')
const requestBody = require('../../fixtures/json/requestBody.json')
const responseBody = require('../../fixtures/json/responseBody.json')


class forgetPasswordAPI {

    forgetPasswordrequest(field) {

        const apiEndpoint = requestUtils.getEndpoint('forgetApi');

            cy.fixture("json/baseUrl").then((baseUrlData) => {
                const baseURL = baseUrlData[0].baseUrl;

                cy.fixture("json/authorization").then((authorizationData) => {
                    const authUsername = authorizationData[0].username;
                    const authPassword = authorizationData[0].password;

                    const requestData = requestUtils.getRequestFieldValue(field);
                    let Payload = field === 'valid details' ? forgetPasswordPayload.forgetPassword : { ...forgetPasswordPayload.forgetPassword };
                        
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
                            case 'invalid username for Forget Password':
                                payload = { username: requestUtils.getRequestFieldValue('invalidusername') };
                                break;
                            case 'username blank  for Forget Password':
                                payload = { username: requestUtils.getRequestFieldValue('withoutusername') };
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
                            username: payload.username
                        }).toString();


                        cy.request({
                            method: 'GET',
                            url: `${baseURL}${endpoint}?${queryParams}`,
                            auth: requestAuth,
                            failOnStatusCode: false
                        })
                            .as('forgetPasswordResponse').then((Response) => {
                                cy.log(Response.requestBody)
                                cy.log(JSON.stringify(Response.body))
                            });
                    });
                })
    }
}

export default forgetPasswordAPI;