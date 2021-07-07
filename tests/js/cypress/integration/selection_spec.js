describe('Selection tool', function () {
    before(function () {
        // runs once before the first test in this block
        cy.visit('/index.php/view/map/?repository=montpellier&project=montpellier')
        // Todo wait for map to be fully loaded
        cy.wait(30000)

        cy.get('#button-selectiontool').click()

        // Activate polygon tool
        cy.get('#selectiontool .digitizing-buttons .dropdown-toggle').first().click()
        cy.get('#selectiontool .digitizing-polygon').click()
    })

    // Refresh before. Use intersects operator as default
    beforeEach(function () {
        cy.get('.selectiontool-type-refresh').click()
        cy.get('lizmap-selection-tool .selection-geom-operator').select('intersects')
    })

    it('opens selection tool', function () {
        cy.get('#selectiontool').should('be.visible')

        cy.get('.selectiontool-unselect').should('have.attr', 'disabled')
        cy.get('.selectiontool-filter').should('have.attr', 'test')
    })
})
