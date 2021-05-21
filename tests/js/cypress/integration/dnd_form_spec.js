describe('Form edition', function() {
    beforeEach(function(){
        cy.visit('/index.php/view/map/?repository=testsrepository&project=dnd_form')
    })

    it.only('update features', function(){
        //Click on the only one `dnd_form_geom` feature to open the popup
        cy.get('#map').click(537, 320)

        //Check that `Field in` field should not be empty
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(2) > td').should('not.have.class','empty-data')
        
        //Check that `Field not in` field should not be empty
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(3)').should('not.have.class','empty-data')
        
        //Click edition button, save form without modification, click on the feature to display the popup
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > span > button.btn.btn-mini.popup-layer-feature-edit').click()
        cy.get('#jforms_view_edition__submit_submit').click()
        cy.get('#map').click(537, 320)
        
        //Check that `Field in` field should not be empty
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(2)').should('not.have.class','empty-data')
        
        //Check that `Field not in` field should not be empty
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(3)').should('not.have.class','empty-data')
        //Save the value to compare it after `Field_in` modification
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(3) > td').then(($field_not_in) => {
            const txt_field_not_in = $field_not_in.text()

            //Click popup button, edition button and tab2
            cy.get('#button-popupcontent > span.icon > i').click()
            cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > span > button.btn.btn-mini.popup-layer-feature-edit').click()
            cy.get('#jforms_view_edition-tabs > li:nth-child(2) > a').click()
            
            //Save form with `Field in` init, click on the feature to display the popup
            cy.get('#jforms_view_edition_field_in_dnd_form').type('{selectall}{backspace}')
            cy.get('#jforms_view_edition_field_in_dnd_form').type(Date.now())
            cy.get('#jforms_view_edition_field_in_dnd_form').then(($field_in) => {
                const value = $field_in.val()
                cy.get('#jforms_view_edition__submit_submit').click()
                cy.get('#map').click(537, 320)
                cy.get('#map').click(537, 320)
                //Check that `Field in` field should be modified
                cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(2) > td').should(($field_in2) => {
                    expect($field_in2.text()).to.eq(value)
                })
            })

            //Check that `Field not in` field should not be empty and has not changed
            cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(3)').should('not.have.class','empty-data')
            cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(3) > td').should(($field_not_in2) => {
                expect($field_not_in2.text()).to.eq(txt_field_not_in)
            })

        })
        
        //Click edition button, move the point and save form without modification
        cy.get('#map').trigger('mousedown', {which: 1, pageX: 537, pageY:320}).trigger('mousemove', {pageX: 0, pageY:-600}).trigger('mouseup', {force: true})
        cy.get('#map').click(200, 200)

        //Check that the point has moved
  

        //Open attribute table tool then `dnd_form` layer details
        
        
        //Click edition button and save form without modification

        
        //Check that `Field not in` field should not be empty
        
        
        //Click edition button and save form with `Field in` modification
        
        
        //Check that `Field in` field should be modified


        //Check that `Field not in` field should not be empty
        cy.get('#popupcontent > div > div > div.lizmapPopupSingleFeature > div > table > tbody > tr:nth-child(3)').should('not.have.class','empty-data')
    })

    it('create features', function(){
        //Create a new `dnd_form_geom` feature
        //Set `Field in` input value and draw a point
        //Save the new `dnd_form_geom` feature and get no error message
        //Check that a new point is displayed on the map
        //Click on the new `dnd_form_geom` feature
        //Check that `Field in`  field should not be empty
        //Check that `Field not in` field should be empty

        //Open attribute table tool then `dnd_form` layer details
        //Click Add a feature button, set `Field in` input value and save
        //Check that a new line has been added to the table
        //Check that `Field in` field should not be empty
        //Check that `Field not in` field should be empty
    })

    it('display forms', function(){
        //In desktop and mobile context, launch `dnd_form` edition and look at `dnd_form` form
        //`tab1` must display `id` input field and `tab2` must display `Field in` input

    })
})
