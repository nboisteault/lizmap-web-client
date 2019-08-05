/**
 * Export global objects needed by lizmap components and classes
 */

import eventDispatcher from './eventDispatcher.js';
import lizmapMap from './lizmapMap.js';

const mainEventDispatcher = new eventDispatcher();
const mainLizmapMap = new lizmapMap();

export  {
    mainEventDispatcher,
    mainLizmapMap
};
