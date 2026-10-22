// ==UserScript==
// @name         Instan Slots
// @version      1.1
// @description  Uses ES6 Proxy engine to speed up slots. The most highly optimized and resource-efficient approach. Includes a 700ms safety lock.
// @author       ZEM
// @match        https://www.torn.com/loader.php?sid=slots*
// @match        https://www.torn.com/page.php?sid=slots*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    const win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

    win.JSON = new Proxy(win.JSON, {
        get(target, prop) {
            if (prop === 'parse') {
                return function(text, reviver) {
                    const data = target.parse(text, reviver);

                    if (data?.barrelsAnimationSpeed !== undefined) {
                        data.barrelsAnimationSpeed = 50;
                        delete data.error;
                        delete data.errorMsg;
                    }

                    return data;
                };
            }
            return target[prop];
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
        const betButtons = document.querySelectorAll('.slots-btn-list .betbtn');

        betButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                betButtons.forEach(b => {
                    b.style.pointerEvents = 'none';
                    b.style.opacity = '0.4';
                });

                setTimeout(() => {
                    betButtons.forEach(b => {
                        b.style.pointerEvents = 'auto';
                        b.style.opacity = '1';
                    });
                }, 700);
            });
        });
    });
})();
