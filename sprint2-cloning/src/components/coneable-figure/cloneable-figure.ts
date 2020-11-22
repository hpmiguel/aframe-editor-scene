import {Component, registerComponent, Schema} from 'aframe';

function _cloneProperties(node) {
    const attributes = node.attributes;
    let originalAttrs = {};
    for(let i = 0; i < attributes.length; i++) {
        const attr = attributes.item(i);
        originalAttrs[attr.nodeName] = attr.nodeValue;
    }
    return originalAttrs;
}

function _duplicateFigure(el) {

}

export const selectableFigureAttr = 'selectable-check';

export function registerSelectableFigure() {
    const selectableFigureComponent = {
        dependencies: ['raycaster'],
        init: function () {
            const figSelected = this.el;
            // const originalAttrs: any = _cloneProperties(figSelected);

            this.el.addEventListener('click', function (evt) {
                console.log('I was clicked at: ', figSelected);
            });
        }
    }
    registerComponent(selectableFigureAttr, selectableFigureComponent);
}
