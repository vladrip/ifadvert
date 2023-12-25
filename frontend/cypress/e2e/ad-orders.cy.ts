function editAndCheckFirstAdOrder(name: string, budget: string, onlyDesignNow: boolean, type: string) {
  cy.get('#name').clear().type(name)
    .get('#budget input').clear().clear().type(budget)
    .get('#only-design .p-checkbox').click();
  cy.get('#' + type.toLowerCase()).click();
  cy.get('button[type="submit"]').click();

  cy.get('tbody tr').eq(0).contains('$').then(td => {
    expect(td.text().replace(/[$|,]/g, "")).to.eq(budget);
  });
  cy.get('tbody tr').eq(0).contains(type.substring(1)).should('exist');
  cy.get('tbody tr').eq(0).find('boolean-icon').should('have.attr', 'ng-reflect-value', !onlyDesignNow ? 'true' : 'false');
}

describe('Ad order create/edit form', () => {
  beforeEach(() => cy.loginClient());

  it('Should create ad order', () => {
    cy.get('.p-button-success').click();
    cy.get('#name').type('Some ad')
      .get('#budget input').type('13000')
      .get('#only-design .p-checkbox').click();
    cy.get('#broadcast').click();
    cy.get('button[type="submit"]').click();

    cy.get('tbody tr').contains('Some ad').should('exist');
  });

  it('Should not validate and should set budget to acceptable range', () => {
    cy.get('.p-button-success').click();
    cy.get('#budget input').type('10')
      .get('button[type="submit"]').click();

    cy.get('#budget input').should('have.attr', 'aria-valuenow', 50);
    cy.get('#name').should('have.class', 'ng-invalid');
  });

  it('Should edit ad order and edit back', () => {
    cy.get('tbody tr').eq(0).rightclick();
    cy.get('p-contextmenu .fa-pencil').click();
    cy.get('form').then(form => {
      const name = form.find('#name').attr('ng-reflect-model');
      const type = form.find('#transport').attr('ng-reflect-model');
      const budget = form.find('#budget').attr('ng-reflect-model');
      const onlyDesign = form.find('#only-design').attr('ng-reflect-model') === 'true';

      editAndCheckFirstAdOrder('Some order', '777', onlyDesign, 'broadcast');
      cy.get('tbody tr').eq(0).rightclick();
      cy.get('p-contextmenu .fa-pencil').click();
      editAndCheckFirstAdOrder(name!, budget!, !onlyDesign, type!.toLowerCase());
    });
  });
});

describe('Ad order view', () => {
  beforeEach(() => {
    cy.loginClient();
    cy.get('tbody tr').eq(0).rightclick();
    cy.get('p-contextmenu .fa-eye').click();
  });

  it('Should view ad order and navigate to edit form and back', () => {
    cy.url().should('include', '/view/1');
    cy.get('p-button[icon*="fa-pencil"]').eq(0).click();
    cy.url().should('include', '/item/1');
    cy.get('p-button[icon*="fa-arrow-left"]').click();
    cy.url().should('include', '/view/1');
  });

  it('Should navigate to next design by pressing item navigators or indicators', () => {
    cy.get('.p-galleria-indicators li').eq(0).should('have.attr', 'aria-selected', 'true');
    cy.get('.p-galleria-indicators li').eq(1).click();
    cy.get('.p-galleria-indicators li').eq(0).should('have.attr', 'aria-selected', 'false');
    cy.get('.p-galleria-indicators li').eq(1).should('have.attr', 'aria-selected', 'true');

    cy.get('.p-galleria-item-prev').click({ force: true });
    cy.get('.p-galleria-indicators li').eq(0).should('have.attr', 'aria-selected', 'true');
    cy.get('.p-galleria-indicators li').eq(1).should('have.attr', 'aria-selected', 'false');
  });

  it('Should open and close image fullscreen in placements table', () => {
    cy.get('tbody tr p-image').eq(0).click();
    cy.get('.p-image-preview').should('exist');
    cy.get('.p-image-action timesicon').parent().click();
    cy.get('.p-image-preview').should('not.exist');
  });
});
