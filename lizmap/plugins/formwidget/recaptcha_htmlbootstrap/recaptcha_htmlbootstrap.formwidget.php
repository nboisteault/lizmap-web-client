<?php

/**
 * @package   lizmap
 * @subpackage  forms_widget_plugin
 * @author    3liz
 * @copyright 2018 3liz
 * @link      http://3liz.com
 * @license Mozilla Public License : http://www.mozilla.org/MPL/
 */
require_once(JELIX_LIB_PATH.'plugins/formwidget/recaptcha_html/recaptcha_html.formwidget.php');

class recaptcha_htmlbootstrapFormWidget extends recaptcha_htmlFormWidget {
    use \Lizmap\Form\WidgetTrait;
}
