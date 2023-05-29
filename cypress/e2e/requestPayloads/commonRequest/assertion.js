

const responseBody = require('../../../fixtures/json/responseBody.json')

class assertion {


  assertStatusCode(response, statusCode) {

    cy.get(response).should((Response) => {
      expect(Response.status).to.equal(parseInt(statusCode));
    });

  }

  assertResponseBody(response, statusCode) {
    cy.get(response).its('body').should((body) => {

      if (Array.isArray(responseBody)) {
      const expectedResponses = responseBody.filter(res => res.StatusCode === statusCode);
      const expectedValues = expectedResponses.map(res => res.ExpectedValue);
      // const body = response.body;

      if (expectedValues.includes(body)) {
        const expectedValue = expectedValues.find(val => val === body);
        expect(body).to.equal(expectedValue);

      }

      else {
        // Assert based on the matching status code and expected value
        switch (statusCode) {

          case '200':
            const expectedValue = expectedValues.find(val => val === body);
            expect(body).to.equal(expectedValue);

            break;
          case '400':
          case '404':
          case '401':

            expect(body).to.have.property('type');
            expect(body).to.have.property('title');
            expect(body).to.have.property('status');
            expect(body).to.have.property('traceId');
            if (body.errors) {
              expect(body).to.have.property('errors');
            }

            break;

          case '500':
            expect(body).to.have.property('errorMessage', 'Internal Server Error');
            break;

          default:
            expect(body).to.have.property('type');
            expect(body).to.have.property('title');
            expect(body).to.have.property('status');
            expect(body).to.have.property('traceId');
            if (body.errors) {
              expect(body).to.have.property('errors');
            }
         }
      }
    }
    else {
      throw new Error('responseBody is not an array');
    }
     })

   }

 }




export default assertion;