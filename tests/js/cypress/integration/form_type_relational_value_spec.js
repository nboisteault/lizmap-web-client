describe('Form edition', function() {
    beforeEach(function(){
        cy.visit('/index.php/view/map/?repository=testsrepository&project=form_type_relational_value')
    })

    it('test part', function(){
        //Click on the only point and start the update field
        cy.get('#map').click(537,317)
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > span > button.btn.btn-mini.popup-layer-feature-edit').click()
        //Check that the field `test` is not required and not have an empty value in the list
        cy.get('#jforms_view_edition_test_label').should('not.have.class','jforms-required')
        cy.get('#jforms_view_edition_test_label').filter('label').filter(':contains("")').should('not.have.length')
        //Check that the field `Test constraint not null only` is required and not have an empty value in the list
        cy.get('#jforms_view_edition_test_not_null_only_label').should('have.class','jforms-required')
        cy.get('#jforms_view_edition_test_not_null_only_label').filter('label').filter(':contains("")').should('not.have.length')
        //Check that the field `Test with empty value only` is not required but have an empty value in the list
        cy.get('#jforms_view_edition_test_empty_value_only_label').should('not.have.class','jforms-required')
        cy.get('#jforms_view_edition_test_empty_value_only_label').filter('label').filter(':contains("")').should('have.length', 1)
    })

})
