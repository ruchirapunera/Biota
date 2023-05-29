
import { changeUserPasswordPayload } from '../requestPayloads/ApiPayload/changeUserPassword'
const api = require('../../fixtures/json/api.json')
const authorization = require('../../fixtures/json/authorization.json')
const baseUrl = require('../../fixtures/json/baseUrl.json')
const responseBody = require('../../fixtures/json/requestBody.json')
import requestUtils from '../requestPayloads/commonRequest/requestUtils'



class changeUserPasswordAPI {


    changeUserPasswordRequest(field) {


        const apiEndpoint = requestUtils.getEndpoint('changeUserPasswordAPi');


        cy.fixture("json/baseUrl").then((baseUrlData) => {
            const baseURL = baseUrlData[0].baseUrl;

            cy.fixture("json/authorization").then((authorizationData) => {
                const authUsername = authorizationData[0].username;
                const authPassword = authorizationData[0].password;

                const requestData = requestUtils.getRequestFieldValue(field);
                let Payload = field === 'valid details' ? changeUserPasswordPayload.changeUserPassword : { ...changeUserPasswordPayload.changeUserPassword };

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
                    case 'old password blank':
                        payload.oldPassword = requestUtils.getRequestFieldValue('oldpasswordblank');
                        break;
                    case 'new password blank':
                        payload.newPassword = requestUtils.getRequestFieldValue('passwordblank');
                        break;
                    case 'invalid old password':
                        payload.oldPassword = requestUtils.getRequestFieldValue('invalidoldpassword');
                        break;
                    case 'invalid new password':
                        payload.newPassword = requestUtils.getRequestFieldValue('invalidpassword');
                        break;
                    case 'confirm password blank':
                        payload.newPassword = requestUtils.getRequestFieldValue('confirmpasswordblank');
                        break;
                    case 'invalid confirm password':
                        payload.confirmNewPassword = requestUtils.getRequestFieldValue('invalidconfirmpassword');
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
                    .as('changeUserPasswordResponse').then((Response) => {
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





export default changeUserPasswordAPI;