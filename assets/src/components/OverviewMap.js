import { mainLizmap } from '../modules/Globals.js';
import olOverviewMap from 'ol/control/OverviewMap';

export default class OverviewMap extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._olOverviewMap = new olOverviewMap({
            target: this
        });

        mainLizmap.map._olMap.addControl(
            this._olOverviewMap
        );
    }

    disconnectedCallback() {
        mainLizmap.map._olMap.removeControl(
            this._olOverviewMap
        );
    }
}
