import { mainEventDispatcher } from "./lizmapGlobals";

export default class lizmapMap {

    constructor() {
        this._zoom = 2;
    }

    get zoom() {
        return this._zoom;
    }

    /**
     * @param {number} zoom
     */
    set zoom(zoom) {
        // Avoid infinite loop
        if (this._zoom !== zoom) {
            this._zoom = zoom;

            mainEventDispatcher.dispatch({
                type: "map-zoom-change",
                zoom: this._zoom
            });
        }
    }

}
