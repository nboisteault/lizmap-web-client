import {mainLizmap, mainEventDispatcher} from '../modules/Globals.js';
import {html, render} from 'lit-html';

export default class GeolocationSurvey extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const mainTemplate = () => html`
        <div class="${mainLizmap.geolocation.isTracking && mainLizmap.geolocation.isLinkedToEdition && ['line', 'polygon'].includes(mainLizmap.edition.layerGeometry) ? '' : 'hide'}">
            <div class="control-group" style="text-align:center">
                <div class="btn-group">
                    <button class="btn ${mainLizmap.geolocationSurvey.beepMode ? 'active btn-success' : ''}" @click=${() => mainLizmap.geolocationSurvey.toggleBeepMode()}><i class="icon-music"></i></button>
                    <button class="btn ${mainLizmap.geolocationSurvey.vibrateMode ? 'active btn-success' : ''}" @click=${() => mainLizmap.geolocationSurvey.toggleVibrateMode()}>📳</button>
                </div>
            </div>
            <div class="control-group">
                <div><button class="btn ${mainLizmap.geolocationSurvey.distanceMode ? 'active btn-success' : ''}" @click=${() => mainLizmap.geolocationSurvey.toggleDistanceMode()}>Distance</button></div>
                <div class="controls">
                    <div class="input-append">
                        <input class="input-mini" type="number" min="0" @change=${ (event) => mainLizmap.geolocationSurvey.distanceLimit = parseInt(event.target.value)}><span class="add-on">m</span>
                    </div>
                    ${mainLizmap.geolocationSurvey.distanceMode ? html`${mainLizmap.edition.lastSegmentLength}` : ''}
                </div>
            </div>
            <div class="control-group">
                <div><button class="btn ${mainLizmap.geolocationSurvey.timeMode ? 'active btn-success' : ''}" @click=${() => mainLizmap.geolocationSurvey.toggleTimeMode()}>Time</button></div>
                <div class="controls">
                    <div class="input-append">
                        <input class="input-mini" type="number" min="0" @change=${ (event) => mainLizmap.geolocationSurvey.timeLimit = parseInt(event.target.value)}><span class="add-on">s</span>
                    </div>
                    ${mainLizmap.geolocationSurvey.timeMode ? 
                        html`<div class="input-append">
                                <input class="input-mini" type="text" disabled="disabled" value="${mainLizmap.geolocationSurvey.timeCount}">
                                <button class="btn ${mainLizmap.geolocationSurvey.timePauseMode ? 'active btn-success' : ''}" @click=${() => mainLizmap.geolocationSurvey.toggleTimePauseMode()}><i class="icon-pause"></i></button>
                            </div>` : ''
                    }
                </div>
            </div>
            <div class="control-group">
                <div><button class="btn ${mainLizmap.geolocationSurvey.accuracyMode ? 'active btn-success' : ''}" @click=${() => mainLizmap.geolocationSurvey.toggleAccuracyMode()}>Accuracy</button></div>
                <div class="controls">
                    <div class="input-append">
                        <input class="input-mini" type="number" min="0" @change=${ (event) => mainLizmap.geolocationSurvey.accuracyLimit = parseInt(event.target.value)}><span class="add-on">m</span>
                    </div>
                    ${mainLizmap.geolocationSurvey.accuracyMode ? html`${mainLizmap.geolocation.accuracy}` : ''}
                </div>
            </div>
            <div class="control-group">
                <div><button class="btn ${mainLizmap.geolocationSurvey.averageRecordMode ? 'active btn-success' : ''}" @click=${() => mainLizmap.geolocationSurvey.toggleAverageRecordMode()}>Average</button></div>
                <div class="controls">
                    <div class="input-append">
                        <input class="input-mini" type="number" min="0" @change=${ (event) => mainLizmap.geolocationSurvey.averageRecordLimit = parseInt(event.target.value)}><span class="add-on">s</span>
                    </div>
                </div>
            </div>
        </div>`;

        render(mainTemplate(), this);

        mainEventDispatcher.addListener(
            () => {
                render(mainTemplate(), this);
            },
            [
                'geolocation.isLinkedToEdition'
                , 'geolocation.isTracking'
                , 'geolocationSurvey.distanceMode'
                , 'geolocationSurvey.timeMode'
                , 'geolocationSurvey.timePauseMode'
                , 'geolocationSurvey.timeCount'
                , 'geolocationSurvey.accuracyMode'
                , 'geolocationSurvey.averageRecordMode'
                , 'geolocationSurvey.beepMode'
                , 'geolocationSurvey.vibrateMode'
            ]
        );

        // Handle apart listeners to events which occur often to avoid too much render() 
        mainEventDispatcher.addListener(
            () => {
                if (mainLizmap.geolocationSurvey.distanceMode) {
                    render(mainTemplate(), this);
                }
            },
            'edition.lastSegmentLength'
        );

        mainEventDispatcher.addListener(
            () => {
                if (mainLizmap.geolocationSurvey.accuracyMode) {
                    render(mainTemplate(), this);
                }
            },
            'geolocation.accuracy'
        );
    }

    disconnectedCallback() {
    }
}
