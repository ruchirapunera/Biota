import { updateUserInformationPayload } from '../requestPayloads/ApiPayload/updateUserInformationPayload'
const api = require('../../fixtures/json/api.json')
const authorization = require('../../fixtures/json/authorization.json')
const baseUrl = require('../../fixtures/json/baseUrl.json')
const responseBody = require('../../fixtures/json/requestBody.json')
import requestUtils from '../requestPayloads/commonRequest/requestUtils'



class updateUserInformationAPI {


    updateUserInformationRequest(field) {


        const apiEndpoint = requestUtils.getEndpoint('updateUserAPi');


        cy.fixture("json/baseUrl").then((baseUrlData) => {
            const baseURL = baseUrlData[0].baseUrl;

            cy.fixture("json/authorization").then((authorizationData) => {
                const authUsername = authorizationData[0].username;
                const authPassword = authorizationData[0].password;

                const requestData = requestUtils.getRequestFieldValue(field);
                let Payload = field === 'valid details' ? updateUserInformationPayload.updateUserInformation : { ...updateUserInformationPayload.updateUserInformation };

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
                    case 'invalid email format':
                        payload.email = requestUtils.getRequestFieldValue('invalidemailformat');
                        break;
                    case 'invalid contact number':
                        payload.contactNumber = requestUtils.getRequestFieldValue('invalidcontactnumber');
                        break;
                    case 'first name blank':
                        payload.firstName = requestUtils.getRequestFieldValue('firstnameblank');
                        break;
                    case 'last name blank':
                        payload.lastName = requestUtils.getRequestFieldValue('lastnameblank');
                        break;
                    case 'invalid first name':
                        payload.firstName = requestUtils.getRequestFieldValue('invalidfirstname');
                        break;
                    case 'invalid last name':
                        payload.lastName = requestUtils.getRequestFieldValue('invalidlastname');
                        break;
                    case 'email blank':
                        payload.email = requestUtils.getRequestFieldValue('emailblank');
                        break;
                    case 'contact number blank':
                        payload.contactNumber = requestUtils.getRequestFieldValue('contactnumberblank');
                        break;
                    case 'invalid userId':
                        payload.userId = requestUtils.getRequestFieldValue('invalidid');
                        break;
                    case 'blank userId':
                        payload.userId = requestUtils.getRequestFieldValue('blankid');
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
                    .as('updateUserInformationResponse').then((Response) => {
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





export default updateUserInformationAPI;