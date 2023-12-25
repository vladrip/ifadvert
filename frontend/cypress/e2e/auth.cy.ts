describe('Login', () => {
  it('Should login as client', () => {
    cy.loginClient();
    cy.url().should('include', '/app/ad-orders');
  });

  it('Should not login with invalid credentials', () => {
    cy.login('nonexistent@gmail.com', 'SomePass', false);
    cy.wait('@login').its('response.statusCode').should('eq', 403);
    cy.login('client@gmail.com', 'PasswordWrong', false);
    cy.wait('@login').its('response.statusCode').should('eq', 403);
  });

  it('Should not validate', () => {
    cy.login('@invalidEmail.gmail.com', 'Pass', false);
    cy.url().should('include', '/login');
    cy.get('div[ngxerror]:not([hidden])').should('have.length', 2);
  });

  it('Should redirect to register', () => {
    cy.visit('/login');
    cy.get('.auth-form-link').click();
    cy.url().should('include', '/register');
  });
});

describe('Logout', () => {
  it('Should logout from client', () => {
    cy.loginClient();
    cy.logout();
    cy.url().should('include', '/login');
  });
});

describe('Register', () => {
  it('Should register new client', () => {
    const randNum = Math.trunc(Math.random() * 1000000);
    cy.register(`client${randNum}@gmail.com`, 'Password1', 'Password1', 'Jonh', 'Doe', '+380991234567');
    cy.url().should('include', '/login');
  });

  it('Should not register existing client', () => {
    cy.register('client@gmail.com', 'Password1', 'Password1', 'Joe', 'Biden', '+12345678900', false);
    cy.wait('@register').its('response.statusCode').should('eq', 500);
  });

  it('Should not validate', () => {
    cy.register('@invalidEmail.gmail.com', 'pass', 'password', '', '', '+12345', false);
    cy.get('div[ngxerror]:not([hidden])').should('have.length', 4);
  });

  it('Should redirect to login', () => {
    cy.visit('/register');
    cy.get('.auth-form-link').click();
    cy.url().should('include', '/login');
  });
});
