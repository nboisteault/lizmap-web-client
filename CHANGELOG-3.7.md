# Changelog Lizmap 3.7

<!--
Format from https://keepachangelog.com/en/1.0.0/
added, fixed, changed, removed, deprecated, security
with some extra keywords: backend, tests, test, translation, funders, important
-->

## Unreleased

## 3.7.0-beta.1 - 2023-10-13

### Added

* Add some content in the footer of the main landing page. It's set in the administration interface, then "Landing page"
* New password security checker
* Add possibility to log with an email
* Review of the permalink feature
* Add the possibility to authenticate with the email
* Draw text on the map canvas :
  * Rotation
  * Scaling

### Changed

* Treeview: scale dependent visibility of legend items
* Fix increase the login length in the database in order to use email as logins
* The minimal length of password is now 12 characters to improve the security

### Fixed

* When the layer has an accent :
  * Fix the export of the layer
  * Fix filtered features disappear from map* Do not display child plot in popup when there is no data
* Fix loading of the editing form having a nullable checkbox
* Review the popup order according to the list of layers
* Fix PHP notice about CRS variable
* Fix permalink generation when there isn't any layer checked
* Fix loading relations from embedded layers in a project
* Fix home page title in the top bar of the UI
* When creating/editing a geometry, check the spatial constraint 
* Fix an error about GetFeatureInfo and GetFilterToken requests to QGIS server
* Fix cascade layer's filter to use the parent WMS name instead of the layer name
* Fix latest features about QGIS layouts : groups allowed, order etc
* Fix getting the table for sub-queries with escaped double-quotes

### Translations

* Update translated strings from the Transifex website :
  * [Lizmap Web Client](https://www.transifex.com/3liz-1/lizmap-locales/dashboard/)
  * [Jelix](https://www.transifex.com/3liz-1/jelix/dashboard/)

### Backend

* Upgrade OpenLayers to version 8.1

### Funders

* [WPD](https://www.wpd.fr/)
* [Calvados province in France](https://www.calvados.fr/) 
* [Vaucluse province in France](https://www.vaucluse.fr/)
* [Faunalia](https://www.faunalia.eu/fr)

## 3.7.0-alpha.2 - 2023-08-28

### Fixed

* Use the layer name defined in the Lizmap CFG file if defined instead of the one in the legend
* Editing & Filter - Fix editing right access from popup
* Refresh WMS layer after edition follow up
* Fix some regressions about the new legend : 
  * Option "Group as layer"
  * External layer
  * Handle QGIS `Control rendering order`
* Check if the scale is `0` in the Lizmap CFG file before doing a division
* Use layer name as option label for locate-by-layer selector in mobile
* Support for [OpenTopoMap](https://opentopomap.org/)
* Editing & Filter - Fix editing right access from popup
* Fix a visibility error for a QGIS preset/theme
* Warning about "qgsmtime" for an embedded layer
* Improve the checklist when installing Lizmap Web Client about QGIS Server
* Do not display child plot in popup when there is no data

### Changed

* The keyword `overview` for a group in the legend is not case-sensitive
* Improve the QGIS project panel in the administration :
  * Add some colours in the legend
  * Improve the display, better UX

### Removed

* Some code about OpenLayers 2

### Backend

* Upgrade OpenLayers to version 7.5.1
* Fix some PHP notice when running PHP 8, contribution from @Antoviscomi

### Translations

* Update translated strings from the Transifex website :
  * [Lizmap Web Client](https://www.transifex.com/3liz-1/lizmap-locales/dashboard/)
  * [Jelix](https://www.transifex.com/3liz-1/jelix/dashboard/)

## 3.7.0-alpha.1 - 2023-07-25

### Added

* Refactoring of the legend:
  * Add checkbox in the legend to enable/disable some symbols within the layer
  * Add symbols of the legend item by default for all layers and rendering rules
  * Group `project-background-color` to display the default background color
  * Use any base layer as a background, the usage of legacy keywords `osm-mapnik` etc. is now deprecated
  * These new background layers must be in a group called `baselayers`.
* Improve the "QGIS theme"
* Editing capabilities: Better user experience with 1-n relations: the data tables of the related child layers
  now respect the position configured in the QGIS editing drag&drop designer.
* Popup/Editing - Add a combobox in the popup to allow creating a new child feature for the related
  layers. This will allow creating child features directly from the parent popup.
* New display for measurements on the map when drawing
* Better management of **QGIS projects** about versions (desktop, plugin versions, etc.)
* **Form filter**: Allow using a second field for the numeric type like it is already possible for dates.
  This is useful when the layer features contain two fields describing a minimum and maximum value of the same property.
* **Action module**:
  * New support for `project` and `layer` scopes: the actions can now be used outside the popup, for a specific chosen layer or as a generic project action.
    - A **new web component** `<lizmap-action-selector>` is used to let the user choose an action and run it (for the layer and project scopes)
    - A **new dock** is available and shows the list of the **project actions**, with buttons to run an action and another to reset the results.
    - For the layers with actions configured, a click on the layer in the legend also shows the action selector and buttons and allows running this **layer actions**
  * An **SVG icon** can be used instead of a bootstrap icon as a background of the popup action buttons
  * the current **map extent** and **map center** are sent as parameters in `WKT` format (projection `EPSG:4326`) and can be used in the PostgreSQL function
  * Actions can be run from external **JavaScript** scripts, for example:
    ```javascript
    // Run an action
    lizMap.mainLizmap.action.runLizmapAction(actionName, scope = 'feature', layerId = null, featureId = null, wkt = null);
    // Reset the action
    lizMap.mainLizmap.action.resetLizmapAction()
    ```
  * A WKT in `EPSG:4326` can also be sent as an **additional parameter**.
    This is only possible when running the action with JavaScript.
    This allows to **send a geometry** to be used by the PostgreSQL action
    (for example, to get data from another table with geometries intersecting this passed WKT geometry)
  * The **JavaScript and HTML code** has been **modernized** (no more jQuery calls, usage of web components, etc.)
* **Dataviz** The editor can now configure how the plots will be organized in the web interface.
  * A new **Drag & Drop layout** tab has been added in Lizmap plugin Dataviz tab,
    which allows to create **tabs and groups** like it can be done for forms.
* New print configurations. For each layout, you can:
  * enable/disable it
  * set allowed groups
  * set formats and default one
  * set DPIs and default one
  * set a custom icon for a QGIS atlas layout in the feature's popup
* New display of print options
  * print area is now displayed as a [mask on the map](https://user-images.githubusercontent.com/2145040/216579235-8b438ea5-7ea3-4549-95fa-398dea1450e8.png)
  * an advanced panel allows you to:
    * set X/Y parameters for the grid
    * set main map rotation
    * set DPI
* Add a button to paste a geometry
* Add [MGRS](https://en.wikipedia.org/wiki/Military_Grid_Reference_System) coordinates display on the map

### Fixed

* The "locate by layer" selector shows the layer title when unselected on mobile
* Display the reverse geometry button only for linestring and polygons, not for points

### Changed

* Avoid downloading the default project image multiple times. This improves the first load of the project page
* Update home page title configuration

### Updated

* New drawing toolbar, migration from OpenLayers 2 to OpenLayers 6
* Update Plotly.js to 2.16.3
* Update proj4 library

### Translations

* Update translated strings from the Transifex website

### Deprecated

* The AtlasPrint QGIS server plugin should be removed from the installation. It's not used anymore.
* Layers called `osm-mapnik`, `ign-photo`, `google-satellite` etc
  * See the documentation about these ["legacy" layers](https://docs.lizmap.com/3.6/en/publish/configuration/print.html#allow-printing-of-external-baselayers)

### Backend

* A lot of JavaScript code cleanups
* Update some JavaScript dependencies
* Remove some old code about QGIS Server 2
* Update the OpenLayers library to version 7.3.0
* Fix some issues when deployed with Docker
* Switch to PHP 8.1 in the docker image
* Upgrade Lizmap Web Client target minimum version to 3.4

### Funders

* **[Avignon](https://www.avignon.fr)**
* **[Calvados](https://www.calvados.fr)**
* **[ICRC](https://www.icrc.org/)**
* **[Geolab.re](https://geolab.re/)**
* **[Le Grand Narbonne](https://www.legrandnarbonne.com/)**
* **[Parc naturel régional du Haut-Jura](http://www.parc-haut-jura.fr/)**
* **[Tenergie](https://tenergie.fr/)**
* **[Terre de Provence Agglomération](https://www.terredeprovence-agglo.com)**
