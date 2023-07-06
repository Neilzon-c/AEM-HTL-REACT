// Example of how a component should be initialized via JavaScript
// This script logs the value of the component's text property model message to the console
import HelloWorldText from "./HelloWorldText.jsx";
import React from 'react';
import { createRoot } from 'react-dom/client';

(function() {
    "use strict";

    // Best practice:
    // For a good separation of concerns, don't rely on the DOM structure or CSS selectors,
    // but use dedicated data attributes to identify all elements that the script needs to
    // interact with.
    var selectors = {
        self:      '[data-cmp-is="helloworld"]',
        property:  '[data-cmp-hook-helloworld="property"]',
        message:   '[data-cmp-hook-helloworld="model"]',
        text:   '[data-cmp-hook-helloworld-text]' //from authoring
    };

    function HelloWorld(config) {

        function init(config) {
            // Best practice:
            // To prevents multiple initialization, remove the main data attribute that
            // identified the component.
            config.element.removeAttribute("data-cmp-is");

            var property = config.element.querySelectorAll(selectors.property);
            property = property.length == 1 ? property[0].textContent : null;

            var model = config.element.querySelectorAll(selectors.message);
            model = model.length == 1 ? model[0].textContent : null;

            let text = config.element.querySelectorAll(selectors.text);
            text = text.length == 1 ? text[0].textContent : null;

            const domNode = document.getElementById('cmp-helloworld-root');
            const root = createRoot(domNode);

            root.render(<HelloWorldText text={property}/>); //HelloWorldText is a jsx (react js)
        }

        if (config && config.element) {
            init(config);
        }
    }

    // Best practice:
    // Use a method like this mutation obeserver to also properly initialize the component
    // when an author drops it onto the page or modified it with the dialog.
    // * These are all from the boiler plate, but it just a way to append the element to the DOM 111

    function onDocumentReady() {
        var elements = document.querySelectorAll(selectors.self);
        for (var i = 0; i < elements.length; i++) {
            new HelloWorld({ element: elements[i] });
        }

        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var body             = document.querySelector("body");
        var observer         = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // needed for IE
                var nodesArray = [].slice.call(mutation.addedNodes);
                if (nodesArray.length > 0) {
                    nodesArray.forEach(function(addedNode) {
                        if (addedNode.querySelectorAll) {
                            var elementsArray = [].slice.call(addedNode.querySelectorAll(selectors.self));
                            elementsArray.forEach(function(element) {
                                new HelloWorld({ element: element });
                            });
                        }
                    });
                }
            });
        });

        observer.observe(body, {
            subtree: true,
            childList: true,
            characterData: true
        });
    }

    if (document.readyState !== "loading") {
        onDocumentReady();
    } else {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    }

}());
