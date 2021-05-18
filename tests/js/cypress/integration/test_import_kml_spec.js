describe('Form edition', function() {
    beforeEach(function(){
        cy.visit('/index.php/view/map/?repository=testsrepository&project=test_import_kml')
        cy.get('#button-draw').click()
        cy.get('#draw > div > div > lizmap-digitizing > div > div:nth-child(6) > div.digitizing-import > label').click()
    })

    it('import kml_multilinestring', function(){
        cy.fixture('kml_multilinestring.kml').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'kml_multilinestring.kml',
                mimeType: 'kml'
            })
        })
        cy.wait(1000)
        cy.get('#map').matchImageSnapshot('test_kml_multilinestring')
    })

    it('import kml_multipoint', function(){
        cy.fixture('kml_multipoint.kml').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'kml_multipoint.kml',
                mimeType: 'kml'
            })
        })
        cy.wait(1000)
        cy.get('#map').matchImageSnapshot('test_kml_multipoint')
    })

    it('import kml_multipolygon', function(){
        cy.fixture('kml_multipolygon.kml').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'kml_multipolygon.kml',
                mimeType: 'kml'
            })
        })
        cy.wait(1000)
        cy.get('#map').matchImageSnapshot('test_kml_multipolygon')
    })

    it('import kml_polygon', function(){
        cy.fixture('kml_polygon.kml').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'kml_polygon.kml',
                mimeType: 'kml'
            })
        })
        cy.wait(1000)
        cy.get('#map').matchImageSnapshot('test_kml_polygon')
    })

    it('import kml_without_xml_header', function(){
        cy.fixture('kml_without_xml_header.kml').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'kml_without_xml_header.kml',
                mimeType: 'kml'
            })
        })
        cy.wait(1000)
        cy.get('#map').matchImageSnapshot('test_kml_without_xml_header')
    })

    it('import kml_with_xml_header', function(){
        cy.fixture('kml_with_xml_header.kml').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'kml_with_xml_header.kml',
                mimeType: 'kml'
            })
        })
        cy.wait(1000)
        cy.get('#map').matchImageSnapshot('test_kml_with_xml_header')
    })
})
