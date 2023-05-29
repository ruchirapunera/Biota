const api = require('../../../fixtures/json/api.json')
const requestBody = require('../../../fixtures/json/requestBody.json')

let phoneNumberCounter = 0;
let emailNumberCounter = 0;

class requestUtils {

    static getEndpoint(apiname) {
        const requestapi = api.find(item => item.apis === apiname);
        return requestapi ? requestapi.endpoints : '';
    }

    static getRequestFieldValue(field) {

        const requestField = requestBody.find(item => item.requestFields === field);
        return requestField ? requestField.values : '';
    }

    static incrementContactNumber(contactNumber) {
        const incrementedNumber = parseInt(contactNumber) + 1;
        return incrementedNumber.toString();
      }

    static incrementEmail(email) {
        const [username, domain] = email.split('@');
        const usernameNumber = parseInt(username.replace(/[^\d]/g, ''));
        const incrementedUsername = (usernameNumber + 1).toString();
        return `${incrementedUsername}@${domain}`;
    }

    static incrementRegistartionNumber(registrationNumber) {
        const prefix = registrationNumber.substring(0, registrationNumber.length - 3); // Extract the prefix part of the registration number
        const number = parseInt(registrationNumber.substring(registrationNumber.length - 3)); // Extract the numeric part of the registration number
        const incrementedNumber = number + 1; // Increment the numeric part by 1
        const paddedNumber = String(incrementedNumber).padStart(3, '0'); // Pad the incremented number with leading zeros if necessary
        return `${prefix}${paddedNumber}`; // Combine the prefix and incremented number to form the new registration number
      }
}

export default requestUtils;