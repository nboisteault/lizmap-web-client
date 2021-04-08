describe('Form edition', function() {
    beforeEach(function(){
        cy.visit('/index.php/view/map/?repository=testsrepository&project=layer_treeview')
    })

    it('click layer button', function(){
        cy.get('#layer-layer_treeview > td:nth-child(1) > button:nth-child(2)').click()
        cy.get('#layer-layer_treeview > td:nth-child(1) > button:nth-child(2)').should('not.have.class', 'checked')
        cy.get('#group-group1 > td:nth-child(1) > button:nth-child(2)').should('not.have.class', 'checked')
    })

    it('click layer expander', function(){
        cy.get('#layer-layer_treeview > td:nth-child(1) > a:nth-child(1)').click()
        cy.get('#layer-layer_treeview').should('have.class','expanded')
    })

    it('click group informations', function(){
        cy.get('#group-group1 > td:nth-child(1) > span:nth-child(3)').click()
        cy.get('#group-group1').should('have.class','selected')
    })

    it('click close button', function(){
        cy.get('#dock-close').click()
        cy.get('li.switcher').should('not.have.class','active')
    })

    it('click group button', function(){
        cy.get('#group-group1 > td:nth-child(1) > button:nth-child(2)').click()
        cy.get('#group-group1 > td:nth-child(1) > button:nth-child(2)').should('not.have.class', 'checked')
        cy.get('#layer-layer_treeview > td:nth-child(1) > button:nth-child(2)').should('not.have.class', 'checked')
    })

    it('click on another mutually exclusive layout', function(){
        cy.get('#layer-layer_mut_2 > td:nth-child(1) > button:nth-child(2)').click()
        cy.get('#layer-layer_mut_2 > td:nth-child(1) > button:nth-child(2)').should('have.class','checked')
        cy.get('#layer-layer_mut_1 > td:nth-child(1) > button:nth-child(2)').should('not.have.class','checked')
    })

    it('click on subgroup after mutually exclusive layout', function(){
        cy.get('#group-sub_group_mut > td:nth-child(1) > button:nth-child(2)').click()
        cy.get('#group-sub_group_mut > td:nth-child(1) > button:nth-child(2)').should('have.class','checked')
        cy.get('#layer-layer_mut_1 > td:nth-child(1) > button:nth-child(2)').should('not.have.class','checked')
    })

    it.only('unchecked layer', function(){
        cy.get('#layer-layer_treeview > td:nth-child(1) > button:nth-child(2)').click()
        cy.get('#layer-layer_treeview > td:nth-child(1) > button:nth-child(2)').should('not.have.class', 'checked')
        cy.get('#OpenLayers_Layer_WMS_2').should('not.be.visible')
    })

    it('map snapshot', () => {
        cy.wait(1000)
        // match element snapshot
        cy.get('#map').matchImageSnapshot('map')
      })
})
