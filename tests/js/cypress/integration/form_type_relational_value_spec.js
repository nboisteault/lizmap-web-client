/*The field `type` for the `table_for_form` layer is a relational value field. The multiples' selection was allowed.

Click on the only point and start the update field
* [ ] Check that the field `test` is not required and not have an empty value in the list.

* [ ] Check that the field `Test constraint not null only` is required and not have an empty value in the list.

* [ ] Check that the field `Test with empty value only` is not required but have an empty value in the list.
*/

describe('Form edition', function() {
    beforeEach(function(){
        cy.visit('/index.php/view/map/?repository=testsrepository&project=form_type_relational_value')
        cy.get('#OpenLayers_Layer_WMS_4 > div > img').click() //pas bon
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > span > button.btn.btn-mini.popup-layer-feature-edit').click()
    })

    it('test part', function(){
        cy.get('#jforms_view_edition_test_not_null_only_0').click()
        cy.get('#jforms_view_edition__submit_submit').click()
        cy.get('#lizmap-edition-message > ul > li').should('be.visible')
        cy.get('#OpenLayers_Layer_Vector_257 > canvas').click() //pas bon du coup
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(3)').should('have.class', 'empty-data')
    })

})
