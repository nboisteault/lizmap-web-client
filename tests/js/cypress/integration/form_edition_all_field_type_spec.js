describe('Form edition', function() {
    beforeEach(function(){
        cy.visit('/index.php/view/map/?repository=testsrepository&project=form_edition_all_field_type')
        cy.get('#button-edition').click() 
        cy.get('#edition-draw').click()
        cy.get('#jforms_view_edition_boolean_notnull_for_checkbox').click()
    })

    it('expected error, string', function(){
        cy.get('#jforms_view_edition_integer_field').type('foo')
        cy.get('#jforms_view_edition__submit_submit').click().should('be.visible', '#jforms_view_edition_errors > p')
    })

    it('expected error, value too big', function(){
        cy.get('#jforms_view_edition_integer_field').type('2147483648')
        cy.get('#jforms_view_edition__submit_submit').click().should('be.visible', '#jforms_view_edition_errors > p')
    })

    it('expected error, negative value too big', function(){
        cy.get('#jforms_view_edition_integer_field').type('-2147483649')
        cy.get('#jforms_view_edition__submit_submit').click().should('be.visible', '#jforms_view_edition_errors > p')
    })

    it('success, negative value', function(){
        cy.get('#jforms_view_edition_integer_field').type('-1')
        cy.get('#jforms_view_edition__submit_submit').click().should('be.visible', '#lizmap-edition-message')
    })

    it('success,zero value', function(){
        cy.get('#jforms_view_edition_integer_field').type('0')
        cy.get('#jforms_view_edition__submit_submit').click().should('be.visible', '#lizmap-edition-message')
    })

    it('success, positive value', function(){
        cy.get('#jforms_view_edition_integer_field').type('1')
        cy.get('#jforms_view_edition__submit_submit').click().should('be.visible', '#lizmap-edition-message')
    })


    /*
    ###  Boolean

        **Note from Etienne 14/01/21**, these 2 tests below are failing for now, and it seems expected for now :(

        * [ ] `boolean_notnull_for_checkbox` field should be submitted with or without being checked
    */
    it('boolean, ', function(){

    })

    it('boolean, dropdown menu', function(){
        cy.get('#jforms_view_edition_boolean_nullable').should('have.value','','<NULL>', 'True', 'False')
    })

})
