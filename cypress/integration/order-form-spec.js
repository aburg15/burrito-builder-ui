describe('order-form',() => {
  beforeEach(() => {
    cy.fixture('./orders.json').then((allOrders) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        body: allOrders
      })
    cy.visit('http://localhost:3000/');
  })
})

it('the form should contain a name input and a list of ingredients to choose from', () => {
  cy.get('form')
    .get('input')
      .should('exist')
    .get('[name="beans"]')
      .should('exist')
    .get('[name="steak"]')
      .should('exist')
    .get('[name="carnitas"]')
      .should('exist')
    .get('[name="sofritas"]')
      .should('exist')
    .get('[name="lettuce"]')
      .should('exist')
})

it('when a name is typed into the form, the value is reflected in the input', () => {
  cy.get('form')
    .get('input').type('Adam')
  cy.get('input').should('have.value', 'Adam')
})

it('when a user submits their order, it will render on the page', () => {
  cy.get('form')
    .get('input').type('Adam')
  cy.get('[name="beans"]').click()
  cy.get('[name="steak"]').click()
  cy.get('[name="lettuce"]').click()
  cy.get(':nth-child(15)').click()

  cy.get('section > :nth-child(3)')
    .should('exist')
  cy.get(':nth-child(3) > h3')
    .contains('Adam')
  cy.get(':nth-child(3) > .ingredient-list')
    .contains('beans')
  cy.get(':nth-child(3) > .ingredient-list')
    .contains('steak')
  cy.get(':nth-child(3) > .ingredient-list')
    .contains('lettuce')
})

it('user should not be able to submit the form unless there is at least one ingredient selected', () => {
  cy.get('form')
    .get('input').type('Adam')
    cy.get(':nth-child(15)').click()
  cy.contains('Adam')
      .should('not.exist')
})

it('user should not be able to submit the form unless there is a name entered', () => {
  cy.get('[name="beans"]').click()
  cy.get('[name="steak"]').click()
  cy.get('[name="lettuce"]').click()
  cy.get(':nth-child(15)').click()
  cy.get('section > :nth-child(3)')
      .should('not.exist')
})


})