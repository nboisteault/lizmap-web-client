describe('Form edition all field type', function() {
    beforeEach(function(){
        // Runs before each tests in the block
        cy.visit('/index.php/view/map/?repository=testsrepository&project=form_edition_all_field_type')
        // Start by launching feature form
        cy.get('#button-edition').click()
        cy.get('#edition-draw').click()
    })

    it('should submit multiple selections with integer array field', function () {
        // Select two values
        cy.get('#jforms_view_edition_integer_array_0').click()
        cy.get('#jforms_view_edition_integer_array_1').click()
        cy.get('#jforms_view_edition__submit_submit').click()

        // Assert both values are selected when editing previously submitted feature
        cy.get('#button-attributeLayers').click()
        cy.get('#attribute-layer-list-table > tbody > tr > td:nth-child(2) > button').click({force: true})

        cy.get('#attribute-layer-table-form_edition_all_fields_types tr:last button.attribute-layer-feature-edit').click({ force: true })

        cy.get("#jforms_view_edition_integer_array_0").should('be.checked')
        cy.get("#jforms_view_edition_integer_array_1").should('be.checked')
    })

    it('should submit multiple selections with text field', function () {
        // Select two values
        cy.get('#jforms_view_edition_text_0').click()
        cy.get('#jforms_view_edition_text_1').click()
        cy.get('#jforms_view_edition__submit_submit').click()

        // Assert both values are selected when editing previously submitted feature
        cy.get('#button-attributeLayers').click()
        cy.get('#attribute-layer-list-table > tbody > tr > td:nth-child(2) > button').click({ force: true })

        cy.get('#attribute-layer-table-form_edition_all_fields_types tr:last button.attribute-layer-feature-edit').click({ force: true })

        cy.get("#jforms_view_edition_text_0").should('be.checked')
        cy.get("#jforms_view_edition_text_1").should('be.checked')
    })

    it('expects error, string in integer field', function(){
        // Typing text `foo` in `integer_field` and submit
        cy.get('#jforms_view_edition_integer_field').type('foo')
        cy.get('#jforms_view_edition__submit_submit').click()
        // An error message should warn about invalidity
        cy.get('#jforms_view_edition_errors > p').should('have.class', 'error')
    })

    it('expects error, value too big', function(){
        // Typing `2147483648` value (too big) in `integer_field` and submit
        cy.get('#jforms_view_edition_integer_field').type('2147483648')
        cy.get('#jforms_view_edition__submit_submit').click()
        // An error message should warn about invalidity
        cy.get('#jforms_view_edition_errors > p').should('have.class', 'error')
    })

    it('expects error, negative value too big', function(){
        // Typing `-2147483649` value (negative too big) in `integer_field` and submit
        cy.get('#jforms_view_edition_integer_field').type('-2147483649')
        cy.get('#jforms_view_edition__submit_submit').click()
        // An error message should warn about invalidity
        cy.get('#jforms_view_edition_errors > p').should('have.class', 'error')
    })

    it('success, negative value', function(){
        // Typing negative value `-1` in `integer_field` and submit
        cy.get('#jforms_view_edition_integer_field').type('-1')
        cy.get('#jforms_view_edition__submit_submit').click()
        // A message should confirm form had been saved
        cy.get('#lizmap-edition-message').should('be.visible')
    })

    it('success, zero value', function(){
        // Typing zero value in `integer_field` and submit
        cy.get('#jforms_view_edition_integer_field').type('0')
        cy.get('#jforms_view_edition__submit_submit').click()
        // A message should confirm form had been saved
        cy.get('#lizmap-edition-message').should('be.visible')
    })

    it('success, positive value', function(){
        // Typing positive value (e.g. '1') in `integer_field` and submit
        cy.get('#jforms_view_edition_integer_field').type('1')
        cy.get('#jforms_view_edition__submit_submit').click()
        // A message should confirm form had been saved
        cy.get('#lizmap-edition-message').should('be.visible')
    })

    it('boolean, dropdown menu', function () {
        // `boolean_nullable` should show a dropdown menu with :
        // * an empty value
        cy.get('#jforms_view_edition_boolean_nullable').select('')
        cy.get('#jforms_view_edition_boolean_nullable').should('have.value', '')
        // * a true value
        cy.get('#jforms_view_edition_boolean_nullable').select('True')
        cy.get('#jforms_view_edition_boolean_nullable').should('have.value', 'true')
        // * a false value
        cy.get('#jforms_view_edition_boolean_nullable').select('False')
        cy.get('#jforms_view_edition_boolean_nullable').should('have.value', 'false')
    })

    it('boolean, not null', function () {
        cy.get('#jforms_view_edition_boolean_notnull_for_checkbox').should('have.class', 'jforms-ctrl-checkbox')
        cy.get('#jforms_view_edition__submit_submit').click()
        // A message should confirm form had been saved
        cy.get('#lizmap-edition-message').should('be.visible')

        // Assert checkbox is not checked when editing previously submitted feature
        cy.get('#button-attributeLayers').click()
        cy.get('#attribute-layer-list-table > tbody > tr > td:nth-child(2) > button').click({ force: true })

        cy.get('#attribute-layer-table-form_edition_all_fields_types tr:last button.attribute-layer-feature-edit').click({ force: true })

        cy.get("#jforms_view_edition_boolean_notnull_for_checkbox").should('not.be.checked')
    })

    it('time', function () {
        // Time has HH:mm:ss format
        cy.get('#jforms_view_edition_time_field').should(($input) => {
            const value = $input.val()

            expect(value).to.match(/^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])$/)
        })

        cy.get('#jforms_view_edition__submit_submit').click()
        // A message should confirm form had been saved
        cy.get('#lizmap-edition-message').should('be.visible')

        // Assert time has still HH:mm:ss format when editing previously submitted feature
        cy.get('#button-attributeLayers').click()
        cy.get('#attribute-layer-list-table > tbody > tr > td:nth-child(2) > button').click({ force: true })

        cy.get('#attribute-layer-table-form_edition_all_fields_types tr:last button.attribute-layer-feature-edit').click({ force: true })

        cy.get('#jforms_view_edition_time_field').should(($input) => {
            const value = $input.val()

            expect(value).to.match(/^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])$/)
        })
    })
})
