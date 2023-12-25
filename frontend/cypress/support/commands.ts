// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import credentials from '../fixtures/credentials.json';

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(email: string, password: string, wait?: boolean): Chainable<null>;
      loginClient(wait?: boolean): Chainable<null>;
      logout(): Chainable<null>;
      register(email: string, password: string, passwordConfirm: string, firstname: string, lastname: string, phone: string, wait?: boolean): Chainable<null>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string, wait: boolean = true) => {
  cy.intercept('POST', '/api/auth/login').as('login');
  cy.visit('/login')
    .get('#email').type(email)
    .get('#password').type(password)
    .get('button[type="submit"]').click();
  if (wait) cy.wait('@login').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('loginClient', (wait: boolean = true) => {
  cy.login(credentials.client.email, credentials.client.password, wait);
})

Cypress.Commands.add('logout', () => {
  cy.get('p-avatar').click();
  cy.get('app-layout-header p-menu .fa-right-from-bracket').click();
  cy.url().should('include', '/login');
});

Cypress.Commands.add('register', (email: string, password: string, passwordConfirm: string, firstname: string, lastname: string, phone: string, wait: boolean = true) => {
  cy.intercept('POST', '/api/auth/register').as('register');
  cy.visit('/register')
    .get('#email').type(email)
    .get('#password').type(password)
    .get('.auth-card').click() //to remove focus from password
    .get('#passwordConfirm').type(passwordConfirm);
  if (firstname != '') cy.get('#firstname').type(firstname);
  if (lastname != '') cy.get('#lastname').type(lastname);
  cy.get('#phone').type(phone)
    .get('button[type="submit"]').click();
  if (wait) cy.wait('@register').its('response.statusCode').should('eq', 200);
});
