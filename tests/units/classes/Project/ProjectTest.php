<?php

require('ProjectForTests.php');

use PHPUnit\Framework\TestCase;
use Lizmap\Project;

class ProjectTest extends TestCase
{
    protected $qgis_default;

    public function setUp()
    {
        $data = array(
            'WMSInformation' => array(),
            'xml' => new SimpleXMLElement('<root></root>'),
            'layers' => array(),
        );
        $this->qgis_default = new Project\QgisProject(__FILE__, new lizmapServices(null, null, false, '', ''), $data);
    }

    public function testReadProject()
    {
        $props = array(
            'repository' => 'key',
            'id' => 'test',
            'title' => 'Test',
            'abstract' => '',
            'proj' => 'EPSG:4242',
            'bbox' => '42.42, 21.21, 20.2, 48.84'
        );
        $rep = new lizmapRepository('key', array(), null, null, null);
        $proj = new ProjectForTests();
        $cfg = json_decode(file_get_contents(__DIR__.'/Ressources/readProject.qgs.cfg'));
        $config = new Project\ProjectConfig('', array('cfgContent' => $cfg, 'options' => $cfg->options));
        $proj->setCfg($config);
        $proj->setQgis($this->qgis_default);
        $proj->readProjectForTest('test', $rep);
        foreach ($props as $prop => $expectedValue) {
            $this->assertEquals($expectedValue, $proj->getData($prop));
        }
    }

    public function getQgisPathData()
    {
        return array(
            array('/srv/lzm/tests/qgis-projects/demoqgis', 'montpellier', '/srv/lzm/tests/qgis-projects/demoqgis/montpellier.qgs'),
            array('/srv/lzm/tests/qgis-projects/notexisting', 'montpellier', false),
            array(__DIR__.'/../false', 'montpellier', false),
        );
    }

    /**
     * @dataProvider getQgisPathData
     */
    public function testGetQgisPath($repPath, $key, $expectedPath)
    {
        $rep = new lizmapRepository($key, array('path' => $repPath), null, null, null);
        $proj = new ProjectForTests();
        $proj->setRepo($rep);
        $proj->setKey($key);
        $this->assertEquals($expectedPath, $proj->getQgisPath());
    }

    public function getRelativeQgisPathData()
    {
        return array(
            array('', null, '/srv/lzm/absolute/path', '/srv/lzm/absolute/path'),
            array('1', '/srv/lzm/repo/root/path', '/srv/lzm/repo/root/path/project.qgs', 'project.qgs'),
            array('1', '/srv/lzm/repo/root/path', '/srv/lzm/not/the/same/project.qgs', '/srv/lzm/not/the/same/project.qgs'),
        );
    }

    /**
     * @dataProvider getRelativeQgisPathData
     */
    public function testGetRelativeQgisPath($relative, $root, $file, $expectedPath)
    {
        $services = new lizmapServices(array('services' => array('relativeWMSPath' => $relative, 'rootRepositories' => $root)), null, false, null, null);
        $proj = new ProjectForTests();
        $proj->setRepo(new lizmapRepository(null, array('path' => ''), null, null, null));
        $proj->setServices($services);
        $proj->setFile($file);
        $path = $proj->getRelativeQgisPath();
        $this->assertEquals($expectedPath, $path);
    }

    public function getAttributeLayersData()
    {
        $aLayer1 = (object)array(
            'layer1' => (object)array('hideLayer' => 'true'),
            'layer2' => (object)array('hideLayer' => 'true'),
            'layer3' => (object)array('hideLayer' => 'true'),
        );
        $aLayer2 = (object)array(
            'layer1' => (object)array('hideLayer' => 'false'),
            'layer2' => (object)array('hideLayer' => 'false'),
            'layer3' => (object)array('hideLayer' => 'false'),
        );
        $aLayer3 = (object)array(
            'layer1' => (object)array('UnknownProp' => ''),
            'layer2' => (object)array('UnknownProp' => ''),
            'layer3' => (object)array('UnknownProp' => ''),
        );
        return array(
            array(true, $aLayer1, false),
            array(false, $aLayer1, true),
            array(true, $aLayer2, true),
            array(false, $aLayer2, true),
            array(true, $aLayer3, true),
            array(false, $aLayer3, true),
            array(false, (object)array(), false),
            array(true, (object)array(), false),
        );
    }

    /**
     * @dataProvider getAttributeLayersData
     */
    public function testHasAttributeLayer($only, $attributeLayers, $expectedReturn)
    {
        $config = new Project\ProjectConfig(null, array('attributeLayers' => $attributeLayers));
        $proj = new ProjectForTests();
        $proj->setCfg($config);
        $this->assertEquals($expectedReturn, $proj->hasAttributeLayers($only));
    }

    public function getEditionLayersData()
    {
        $eLayers = (object)array(
            'layer1' => (object)array(
                'acl' => '',
                'order' => 0
            ),
            'layer2' => (object)array(
                'acl' => 'group1, other',
                'order' => 0
            ),
            'layer3' => (object)array(
                'acl' => 'group2, other',
                'order' => 0
            ),
        );
        $acl1 = array(
            'lizmap.tools.edition.use' => true,
            'lizmap.admin.repositories.delete' => false,
            'groups' => array('group1')
        );
        $acl2 = array('lizmap.tools.edition.use' => false);
        $acl3 = array(
            'lizmap.tools.edition.use' => true,
            'lizmap.admin.repositories.delete' => true,
            'groups' => array('none')
        );
        $acl4 = array(
            'lizmap.tools.edition.use' => true,
            'lizmap.admin.repositories.delete' => false,
            'groups' => array('none')
        );
        $unset1 = array(
            'layer2' => false,
            'layer3' => true,
        );
        $unset3 = array(
            'layer2' => false,
            'layer3' => false,
        );
        $unset4 = array(
            'layer2' => true,
            'layer3' => true,
        );
        return array(
            array($eLayers, $acl1, $unset1, true),
            array($eLayers, $acl2, array(), false),
            array($eLayers, $acl3, $unset3, true),
            array($eLayers, $acl4, $unset4, true),
        );
    }

    /**
     * @dataProvider getEditionLayersData
     */
    public function testHasEditionLayers($editionLayers, $acl, $unset, $expectedRet)
    {
        $eLayers = clone $editionLayers;
        foreach ($editionLayers as $key => $obj) {
            $eLayers->$key = clone $obj;
        }
        $config = new Project\ProjectConfig(null, array('editionLayers' => $eLayers));
        $rep = new lizmapRepository(null, array(), null, null, null);
        $context = new testContext();
        $context->setResult($acl);
        $proj = new ProjectForTests($context);
        $proj->setRepo($rep);
        $proj->setCfg($config);
        $this->assertEquals($expectedRet, $proj->hasEditionLayers());
        $eLayer = $proj->getEditionLayers();
        foreach ($unset as $key => $value) {
            if ($value) {
                $this->assertFalse(isset($eLayer->$key));
            } else {
                $this->assertFalse(isset($eLayer->$key->acl));
            }
        }
    }

    public function getLoginFilteredData()
    {
        $layers = (object)array(
            'layer1' => (object)array(
                'name' => 'layer1',
                'typeName' => 'layer1'
            )
        );
        $lfLayers = (object)array(
            'layer1' => 'layer1'
        );
        return array(
            array($lfLayers, $layers, 'layer1', 'layer1'),
            array($lfLayers, $layers, null, null),
            array($lfLayers, $layers, 'layer3', null),
        );
    }

    /**
     * @dataProvider getLoginFilteredData
     */
    public function testGetLoginFilteredConfig($lfLayers, $layers, $ln, $expectedLn)
    {
        $config = new Project\ProjectConfig(null, array('cfgContent' => (object)array('loginFilteredLayers' => $lfLayers, 'layers' => $layers)));
        $proj = new ProjectForTests();
        $proj->setCfg($config);
        $this->assertEquals($expectedLn, $proj->getLoginFilteredConfig($ln));
    }

    public function getFiltersData()
    {
        $aclData1 = array(
            'userIsConnected' => true,
            'userSession' => (object)array('login' => 'admin'),
            'groups' => array('admin', 'groups', 'lizmap')
        );
        $aclData2 = array(
            'userIsConnected' => false,
        );
        $filter1 = '"group" IN ( \'admin\' , \'groups\' , \'lizmap\' , \'all\' )';
        $filter2 = '"group" = \'all\'';
        return array(
            array($aclData1, $filter1),
            array($aclData2, $filter2),
        );
    }

    /**
     * @dataProvider getFiltersData
     */
    public function testGetLoginFilters($aclData, $expectedFilters)
    {
        $file = __DIR__.'/Ressources/montpellier_filtered.qgs.cfg';
        $expectedFilters = array(
            'edition_line' => array_merge(json_decode(file_get_contents($file), true)['loginFilteredLayers']['edition_line'], array('layername' => 'edition_line', 'filter' => $expectedFilters))
        );
        $config = new Project\ProjectConfig($file);
        $context = new testContext();
        $context->setResult($aclData);
        $proj = new ProjectForTests($context);
        $proj->setCfg($config);
        $filters = $proj->getLoginFilters(array('edition_line'));
        $this->assertEquals($expectedFilters, $filters);
    }
}
