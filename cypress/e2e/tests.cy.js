/// <reference types="Cypress" />

describe(' personal info page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/multi-step-form/');
  });

  it('info page is rendered', () => {
    cy.url().should('eq', 'http://localhost:3000/multi-step-form/');
    cy.hash().should('be.empty');
  });

  it('should render an error message above any input field that is left blank after clicking on the next step', () => {
    cy.contains('Next Step').click();
    cy.get('[data-cy="info-error-name"]').should('exist');
    cy.get('[data-cy="info-error-email"]').should('exist');
    cy.get('[data-cy="info-error-phone"]').should('exist');

    cy.visit('http://localhost:3000/multi-step-form/');
    cy.get('#email').type('stephenking@lorem.com');
    cy.contains('Next Step').click();
    cy.get('[data-cy="info-error-name"]').should('exist');
    cy.get('[data-cy="info-error-email"]').should('not.exist');
    cy.get('[data-cy="info-error-phone"]').should('exist');
  });
})

describe('plan page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/multi-step-form/');
    cy.get('[data-cy="info-name"]').type('Stephen King')
    cy.get('[data-cy="info-email"]').type('stephenking@lorem.com');
    cy.get('[data-cy="info-phone"]').type('1234567890');
    cy.contains('Next Step').click();
  });

  it('plan page is rendered', () => {
    cy.hash().should('eq', '#/plan');
  })

  it('plan pricing should be set according to the billing option selected', () => {
    cy.get('label').click();
    cy.get('div').contains('Advanced').click();
    cy.get('[data-cy="plan-pricing"]').eq(1).should('contain', '$120/yr');

    cy.get('label').click();
    cy.get('[data-cy="plan-pricing"]').eq(1).should('contain', '$12/mo');

  });
});

describe('add ons page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/multi-step-form/');
    cy.get('[data-cy="info-name"]').type('Stephen King')
    cy.get('[data-cy="info-email"]').type('stephenking@lorem.com');
    cy.get('[data-cy="info-phone"]').type('1234567890');
    cy.contains('Next Step').click();
    cy.get('[data-cy="plan-pricing"]').eq(1).contains('$12/mo').click();
    cy.contains('Next Step').click();
  });

  it('add ons page is rendered', () => {
    cy.hash().should('eq', '#/add-ons');
  });
});

describe('summary page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/multi-step-form/');
    cy.get('[data-cy="info-name"]').type('Stephen King')
    cy.get('[data-cy="info-email"]').type('stephenking@lorem.com');
    cy.get('[data-cy="info-phone"]').type('1234567890');
    cy.contains('Next Step').click();
  });

  it('summary page is rendered', () => {
    cy.get('[data-cy="plan-pricing"]').eq(1).contains('$12/mo').click();
    cy.contains('Next Step').click();
    cy.contains('Online service').click();
    cy.contains('Customizable profile').click();
    cy.contains('Next Step').click();
    cy.hash().should('eq', '#/summary');
  });

  it('clicking on "change" should navigate user to the plan page to update their selection', () => {
    cy.get('[data-cy="plan-pricing"]').eq(1).contains('$12/mo').click();
    cy.contains('Next Step').click();
    cy.contains('Online service').click();
    cy.contains('Customizable profile').click();
    cy.contains('Next Step').click();
    cy.contains('Change').click();
    cy.hash().should('eq', '#/plan');
  });

  it('the correct prices are displayed according to the selected billing option', () => {
    cy.get('[data-cy="plan-pricing"]').eq(1).contains('$12/mo').click();
    cy.contains('Next Step').click();
    cy.contains('Online service').click();
    cy.contains('Customizable profile').click();
    cy.contains('Next Step').click();
    cy.get('[data-cy="summary-plan-cost"]').should('contain', '$12/mo');


    cy.visit('http://localhost:3000/multi-step-form/');
    cy.get('[data-cy="info-name"]').type('Stephen King')
    cy.get('[data-cy="info-email"]').type('stephenking@lorem.com');
    cy.get('[data-cy="info-phone"]').type('1234567890');
    cy.contains('Next Step').click();
    cy.get('label').click();
    cy.get('[data-cy="plan-pricing"]').eq(2).contains('$150/yr').click();
    cy.contains('Next Step').click();
    cy.contains('Online service').click();
    cy.contains('Customizable profile').click();
    cy.contains('Next Step').click();
    cy.get('[data-cy="summary-plan-cost"]').should('contain', '$150/yr');

  });

  it('the totat cost should be the sum of the billing option plus any add-ons', () => {
    cy.get('label').click();
    cy.get('[data-cy="plan-pricing"]').eq(1).contains('$120/yr').click();
    cy.contains('Next Step').click();
    cy.contains('Customizable profile').click();
    cy.contains('Next Step').click();
    cy.get('[data-cy="summary-total"]').should('contain', '$140/yr');


    cy.visit('http://localhost:3000/multi-step-form/');
    cy.get('[data-cy="info-name"]').type('Stephen King')
    cy.get('[data-cy="info-email"]').type('stephenking@lorem.com');
    cy.get('[data-cy="info-phone"]').type('1234567890');
    cy.contains('Next Step').click();
    cy.get('[data-cy="plan-pricing"]').eq(2).contains('$15/mo').click();
    cy.contains('Next Step').click();
    cy.contains('Online service').click();
    cy.contains('Larger storage').click();
    cy.contains('Customizable profile').click();
    cy.contains('Next Step').click();
    cy.get('[data-cy="summary-total"]').should('contain', '$20/mo');
  });
});

describe('active page', () => {
  it('the bullet that corresponds to a page in the sidebar should be highlighted when the user is on that page', () => {
    cy.visit('http://localhost:3000/multi-step-form/');
    cy.get('[data-cy="info-name"]').type('Stephen King')
    cy.get('[data-cy="info-email"]').type('stephenking@lorem.com');
    cy.get('[data-cy="info-phone"]').type('1234567890');
    cy.contains('Next Step').click();
    cy.get('[data-cy="sidebar-bullet-plan"]').should('have.css', 'background-color', 'rgb(190, 226, 253)');
    cy.get('[data-cy="plan-pricing"]').eq(0).contains('$9/mo').click();
    cy.contains('Next Step').click();
    cy.contains('Online service').click();
    cy.contains('Next Step').click();
    cy.get('[data-cy="sidebar-bullet-summary"]').should('have.css', 'background-color', 'rgb(190, 226, 253)');
    cy.get('[data-cy="sidebar-bullet-info"]').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    cy.get('[data-cy="sidebar-bullet-plan"]').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    cy.get('[data-cy="sidebar-bullet-add-ons"]').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
  });
});

describe('navigation', () => {
  it('clicking on "Go Back" redirects to the previous page the user was on with any entered information persisted', () => {
    cy.visit('http://localhost:3000/multi-step-form/');
    cy.get('[data-cy="info-name"]').type('Stephen King')
    cy.get('[data-cy="info-email"]').type('stephenking@lorem.com');
    cy.get('[data-cy="info-phone"]').type('1234567890');
    cy.contains('Next Step').click();
    cy.hash().should('eq', '#/plan');
    cy.contains('Go Back').click();
    cy.url().should('eq', 'http://localhost:3000/multi-step-form/#/');
    cy.get('[data-cy="info-name"]').should('have.value', 'Stephen King');
    cy.get('[data-cy="info-email"]').should('have.value', 'stephenking@lorem.com');
    cy.get('[data-cy="info-phone"]').should('have.value', '1234567890');

    cy.contains('Next Step').click();
    cy.get('[data-cy="plan-pricing"]').eq(0).contains('$9/mo').click();
    cy.contains('Next Step').click();
    cy.hash().should('eq', '#/add-ons');
    cy.contains('Larger storage').click();
    cy.contains('Customizable profile').click();
    cy.contains('Next Step').click();
    cy.hash().should('eq', '#/summary');
    cy.contains('Go Back').click();
    cy.hash().should('eq', '#/add-ons');
  });
});
