describe('Form edition', function() {
    beforeEach(function(){
        cy.visit('/index.php/view/')
    })

    it('', function(){
        //Activate search by tags in the search bar by clicking the 'T' button
        cy.get('#toggle-search').click()
        //It should switch to '#'
        cy.get('#toggle-search').should('have.value','#')
        //Those two projects should display keywords in their metadata when hovering their illustration image
        cy.get('#content > ul:nth-child(6) > li:nth-child(28) > div.thumbnail').trigger('mouseover')

        //Check if your search with the tag `nature` you have the two projects
        cy.get('#search-project').type('nature')

        //Check if your search with the tag `tree` you have the only one project
        cy.get('#search-project').type('tree')

        //Check if your search with the tag `flower` you have the only one project
        cy.get('#search-project').type('flower')

    })
})