// ==UserScript==
// @name         Instant Slots
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes parts of slot  machine animation.
// @author       ZEM
// @match        https://www.torn.com/loader.php?sid=slots*
// @match        https://www.torn.com/page.php?sid=slots*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';


    const INSTANT_SPEED_MS = 50;

    const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
    const originalJSONParse = pageWindow.JSON.parse;

    pageWindow.JSON.parse = function(text, reviver) {
        const data = originalJSONParse.call(this, text, reviver);

        if (data && typeof data === 'object' && 'barrelsAnimationSpeed' in data) {
            data.barrelsAnimationSpeed = INSTANT_SPEED_MS;
        }

        return data;
    };
})();
