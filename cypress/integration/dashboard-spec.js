describe('main page',() => {
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

  it('should visit dashboard and render orders', () => {
    cy.contains('Pat')
      .should('exist')
    cy.contains('Sam')
      .should('exist')
    })
})