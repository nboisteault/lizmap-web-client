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
        cy.get('#map').matchImageSnapshot('test_kml_multilinestring', {clip: {x: 150, y:260, width: 970, height: 200}})
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
        cy.get('#map').matchImageSnapshot('test_kml_multipoint', {clip: {x: 150, y:260, width: 970, height: 200}})
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
        cy.get('#button-draw').click()
        cy.get('#map').matchImageSnapshot('test_kml_multipolygon', {clip: {x: 260, y:70, width: 730, height: 580}})
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
        cy.get('#button-draw').click()
        cy.get('#map').matchImageSnapshot('test_kml_polygon', {clip: {x: 120, y:50, width: 898, height: 620}})
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
        cy.get('#map').matchImageSnapshot('test_kml_without_xml_header', {clip: {x: 613, y:350, width: 25, height: 25}})
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
        cy.get('#map').matchImageSnapshot('test_kml_with_xml_header', {clip: {x: 613, y:350, width: 25, height: 25}})
    })
})
