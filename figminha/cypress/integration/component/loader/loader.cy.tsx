describe('Loading screen', () => {
  it('should render', () => {
    cy.visit('/');
    cy.get('div[id="loader"]').should('exist').and('be.visible');
  });
});
