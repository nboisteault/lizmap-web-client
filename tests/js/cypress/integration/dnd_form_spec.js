describe('Form edition', function() {
    beforeEach(function(){
        cy.visit('/index.php/view/map/?repository=testsrepository&project=dnd_form')
    })

    it.only('update features', function(){
        //Click on the only one `dnd_form_geom` feature to open the popup
        cy.get('#map').trigger('mousedown', {which: 1, pageX: 600, pageY:700}).trigger('mousemove', {pageX: 0, pageY:-600}).trigger('mouseup', {force: true})
        cy.get('#map').click(600, 200)
        cy.get('#map').click(735, 683)
        //Check that `Field in` field should not be empty
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(2) > td').should('not.have.class','empty-data')
        //Check that `Field not in` field should not be empty
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(3)').should('not.have.class','empty-data')
        //Click edition button, save form without modification, click on the feature to display the popup
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > span > button.btn.btn-mini.popup-layer-feature-edit').click()
        cy.get('#jforms_view_edition__submit_submit').click()
        cy.get('').click()
        //Check that `Field in` field should not be empty
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(2)').should('not.have.class','empty-data')
        //Check that `Field not in` field should not be empty
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(3)').should('not.have.class','empty-data')
        //Click edition button, save form with `Field in` modification, click on the feature to display the popup
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > span > button.btn.btn-mini.popup-layer-feature-edit').click()
        cy.get('#jforms_view_edition-tabs > li:nth-child(2) > a').click()
        cy.get('#jforms_view_edition_field_in_dnd_form').type('test_geom_modified')
        cy.get('#jforms_view_edition__submit_submit').click()
        cy.get('').click()
        //Check that `Field in` field should be modified
        //* [ ] Check that `Field not in` field should not be empty and has not changed
        //Click edition button, move the point and save form without modification
        //* [ ] Check that the point has moved
  
        //Open attribute table tool then `dnd_form` layer details
        //* [ ] Click edition button and save form without modification
        //* [ ] Check that `Field not in` field should not be empty
        //* [ ] Click edition button and save form with `Field in` modification
        //* [ ] Check that `Field in` field should be modified
        //* [ ] Check that `Field not in` field should not be empty
    })

    it('create features', function(){
        //* [ ] Create a new `dnd_form_geom` feature
        //  * [ ] Set `Field in` input value and draw a point
        //  * [ ] Save the new `dnd_form_geom` feature and get no error message
        //  * [ ] Check that a new point is displayed on the map
        //* [ ] Click on the new `dnd_form_geom` feature
        //  * [ ] Check that `Field in`  field should not be empty
        //  * [ ] Check that `Field not in` field should be empty

        //* [ ] Open attribute table tool then `dnd_form` layer details
        //  * [ ] Click Add a feature button, set `Field in` input value and save
        //  * [ ] Check that a new line has been added to the table
        //  * [ ] Check that `Field in` field should not be empty
        //  * [ ] Check that `Field not in` field should be empty
    })

    it('display forms', function(){
        //* [ ] In desktop and mobile context, launch `dnd_form` edition and look at `dnd_form` form
        //  * [ ] `tab1` must display `id` input field and `tab2` must display `Field in` input

    })
})
