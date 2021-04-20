describe('Form edition', function() {
    beforeEach(function(){
        cy.visit('/index.php/view/map/?repository=testsrepository&project=popup')
    })

    it('click on the shape to show the popup', function(){
        cy.get('#OpenLayers_Layer_Vector_78 > canvas:nth-child(1)').click()
        cy.get('#liz_layer_popup').should('be.visible')
    })

    it('change popup s tab', function(){
        cy.get('#OpenLayers_Layer_Vector_78 > canvas:nth-child(1)').click()
        cy.get('.container > ul:nth-child(2) > li:nth-child(2)').click()
        cy.get('#popup_dd_1_tab2').should('have.class', 'active')
    })


})
