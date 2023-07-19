describe('Collection Agent', function(){
    it('Test Wrap', function(){
        cy.wrap(1)
        .then((num) => {
          cy.wrap(num).should('equal', 1) // true
        })
        .should('equal', 1) // true
    })
})