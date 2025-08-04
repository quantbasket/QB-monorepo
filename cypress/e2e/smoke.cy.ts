// cypress/e2e/smoke.cy.ts

describe('Smoke Test', () => {
  it('successfully loads the home page', () => {
    // Cypress will visit the baseUrl, which defaults to your local server
    cy.visit('http://localhost:8080');

    // Check if an element containing "Quant Basket" exists and is visible
    cy.contains('Quant Basket').should('be.visible');
  });
});