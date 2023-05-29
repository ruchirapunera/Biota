import { changeUserStatusPayload } from '../requestPayloads/ApiPayload/changeUserStatusPayload';
const api = require("../../fixtures/json/api.json");
const authorization = require('../../fixtures/json/authorization.json')
const baseUrl = require('../../fixtures/json/baseUrl.json')
const requestBody = require('../../fixtures/json/requestBody.json')
const responseBody = require('../../fixtures/json/responseBody.json')
import requestUtils from '../requestPayloads/commonRequest/requestUtils';

class changeUserStatusAPI {

    changeUserStatusrequest(field) {

        const apiEndpoint = requestUtils.getEndpoint('changeUserStatusApi');

            cy.fixture("json/baseUrl").then((baseUrlData) => {
                const baseURL = baseUrlData[0].baseUrl;

                cy.fixture("json/authorization").then((authorizationData) => {
                    const authUsername = authorizationData[0].username;
                    const authPassword = authorizationData[0].password;

                    const requestData = requestUtils.getRequestFieldValue(field);
                    let Payload = field === 'valid details' ? changeUserStatusPayload.changeUserStatus : { ...changeUserStatusPayload.changeUserStatus};
                        
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
                            case 'invalid id':
                                payload.id = requestUtils.getRequestFieldValue('invalidid');
                                break;
                            case 'invalid isActive':
                                payload.isActive = requestUtils.getRequestFieldValue('invalidisactive');
                                break;
                            case 'blank id':
                                payload.id = requestUtils.getRequestFieldValue('blankid');
                                break;
                            case 'blank isActive':
                                payload.isActive = requestUtils.getRequestFieldValue('blankisactive') ;
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
                            id: payload.id,
                            isActive: payload.isActive
                        }).toString();


                        cy.request({
                            method: 'GET',
                            url: `${baseURL}${endpoint}?${queryParams}`,
                            auth: requestAuth,
                            failOnStatusCode: false
                        })
                            .as('changeUserStatusResponse').then((Response) => {
                                cy.log(Response.requestBody)
                                cy.log(JSON.stringify(Response.body))
                            });
                    });
                })
    }
}

export default changeUserStatusAPI;