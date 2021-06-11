describe('Form edition', function() {
    beforeEach(function(){
        cy.intercept('**/index.php/lizmap/service/?repository=testsrepository&project=time_manager&LAYERS**').as('images_intercepted')
        cy.visit('/index.php/view/map/?repository=testsrepository&project=time_manager')
    })

    it.only('Project load', function(){
        //Three points with `2007-01-01`, `2012-01-01`, `2017-01-01` should be visible
        
        cy.fixture('time_manager_all_dates.png').then((image) => {
            console.log('@image')
            cy.wait('@images_intercepted', (req) => {
                req.continue((res) => {
                    console.log(res)
                    expect(res.body).to.eq('@image')
                })
            })
        })
    })
    

    it('Time manager tool', function(){
        cy.intercept('**/index.php/**').as('map')
        //Activate Time Manager tool in the left menu (clock icon)
        cy.get('#button-timemanager').click()
        //A slider beginning with 2007 should appear. Only 2007-01-01 point should be visible
        cy.get('#mini-dock').should('be.visible')
        cy.get('@map').then((interception) => {

        })
    })

    it('Time manager tool, next and previous buttons', function(){
        //Activate Time Manager tool in the left menu (clock icon)
        cy.get('#button-timemanager').click()
        cy.wait(1000)
        //Clicking **Next** button should move slider to middle and 2012 value should appear. Only 2012-01-01 point should be visible
        cy.get('#tmNext').click()
        cy.wait(1000)
        cy.get('#map').matchImageSnapshot('time_manager_next_slider_middle_2012-01-01_visible')
        //Clicking **Next** button should move slider to end and 2017 value should appear. Only 2017-01-01 point should be visible
        cy.get('#tmNext').click()
        cy.wait(1000)
        cy.get('#map').matchImageSnapshot('time_manager_next_slider_end_2017-01-01_visible')
        //Clicking **Previous** button should move slider to middle and 2012 value should appear. Only 2012-01-01 point should be visible
        cy.get('#tmPrev').click()
        cy.wait(1000)
        cy.get('#map').matchImageSnapshot('time_manager_previous_slider_middle_2012-01-01_visible')
        //Clicking **Previous** button should move slider to begin and 2007 value should appear. Only 2007-01-01 point should be visible
        cy.get('#tmPrev').click()
        cy.wait(1000)
        cy.get('#map').matchImageSnapshot('time_manager_previous_slider_begin_2007-01-01_visible')
    })

    it('Time manager tool, play button', function(){
        //Activate Time Manager tool in the left menu (clock icon)
        cy.get('#button-timemanager').click()
        cy.wait(1000)
        //Clicking **Play** button should move slider from 2007 to 2012 to 2017 to 2007 with 1 second steps and stop. Only corresponding point should be visible
        cy.get('#tmTogglePlay').click()
        //cy.wait(250)
        cy.get('#map').matchImageSnapshot('time_manager_play_2007-01-01_visible')
        cy.wait(950)
        cy.get('#map').matchImageSnapshot('time_manager_play_slider_middle_2012-01-01_visible')
        cy.wait(700)
        cy.get('#map').matchImageSnapshot('time_manager_play_slider_end_2017-01-01_visible')
        cy.wait(2000)
        cy.get('#map').matchImageSnapshot('time_manager_play_end_2007-01-01_visible')
    })
})
