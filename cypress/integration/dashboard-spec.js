describe('dashboard',() => {
  beforeEach(() => {
    cy.fixture('./orders.json').then((allOrders) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        body: allOrders
      })
    cy.visit('http://localhost:3000/');
  })
})

  it('should properly intercept network request', () => {
  cy.contains('Alex')
    .should('not.exist')
  })

  it('should visit dashboard and render order names', () => {
    cy.contains('Pat')
      .should('exist')
    cy.contains('Sam')
      .should('exist')
    })

  it('should contain a header', () => {
    cy.get('h1')
      .contains('Burrito Builder')
  })

  it('should render a form', () => {
    cy.get('form')
      .should('exist')
  })

  it('each order should render a name and ingredients', () => {
    cy.get(':nth-child(1) > h3')
      .contains('Pat')
    cy.get(':nth-child(1) > .ingredient-list')
      .contains('beans')
    cy.get(':nth-child(1) > .ingredient-list')
      .contains('lettuce')
    cy.get(':nth-child(1) > .ingredient-list')
      .contains('carnitas')
    cy.get(':nth-child(1) > .ingredient-list')
      .contains('queso fresco')
    cy.get(':nth-child(1) > .ingredient-list')
      .contains('jalapeno')
  })

  it('each order should contain a delete button', () => {
    cy.get('section > :nth-child(1) > button')
      .should('exist')
    cy.get('section > :nth-child(2) > button')
      .should('exist')
  })
})