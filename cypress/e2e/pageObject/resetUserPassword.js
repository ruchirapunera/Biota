import { resetUserPasswordPayload } from '../requestPayloads/ApiPayload/resetUserPasswordPayload'
const api = require('../../fixtures/json/api.json')
const authorization = require('../../fixtures/json/authorization.json')
const baseUrl = require('../../fixtures/json/baseUrl.json')
const responseBody = require('../../fixtures/json/requestBody.json')
import requestUtils from '../requestPayloads/commonRequest/requestUtils'



class resetUserPasswordAPI {


    resetUserPasswordRequest(field) {


        const apiEndpoint = requestUtils.getEndpoint('resetPasswordApi');


        cy.fixture("json/baseUrl").then((baseUrlData) => {
            const baseURL = baseUrlData[0].baseUrl;

            cy.fixture("json/authorization").then((authorizationData) => {
                const authUsername = authorizationData[0].username;
                const authPassword = authorizationData[0].password;

                const requestData = requestUtils.getRequestFieldValue(field);
                let Payload = field === 'valid details' ? resetUserPasswordPayload.resetUserPassword : { ...resetUserPasswordPayload.resetUserPassword };

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
                        payload.id = requestUtils.getRequestFieldValue('invalidid');
                        break;
                    case 'blank userId':
                        payload.id = requestUtils.getRequestFieldValue('blankid');
                        break;
                    case 'password blank':
                        payload.password = requestUtils.getRequestFieldValue('passwordblank');
                        break;
                    case 'invalid password':
                        payload.password = requestUtils.getRequestFieldValue('invalidpassword');
                        break;
                    case 'invalid confirm password':
                        payload.confirmPassword = requestUtils.getRequestFieldValue('invalidconfirmpassword');
                        break;
                    case 'confirm password blank':
                        payload.confirmPassword = requestUtils.getRequestFieldValue('confirmpasswordblank');
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
                    method: 'PUT',
                    url: `${baseURL}${endpoint}`,
                    body: payload,
                    auth: requestAuth,
                    failOnStatusCode: false
                })
                    .as('resetUserPasswordResponse').then((Response) => {
                        //exception handled
                        if (field === 'valid details') {
                            const statusCode = Response.status;
                            if (statusCode !== 200) {
                                throw new Error(`Unexpected status code: ${statusCode}`);
                            }
                        }

                        return Response;
                    })
                    .then((Response) => {
                        cy.log(Response.requestBody);
                        cy.log(JSON.stringify(Response.body));
                    });
            });
        });
    }
}





export default resetUserPasswordAPI;