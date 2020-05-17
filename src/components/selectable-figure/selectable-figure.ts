import { cloneDeep as _cloneDeep } from 'lodash';

const AFRAME = (window as any).AFRAME;

function _cloneProperties(node) {
    const attributes = node.attributes;
    let originalAttrs = {};
    for(let i = 0; i < attributes.length; i++) {
        const attr = attributes.item(i);
        originalAttrs[attr.nodeName] = attr.nodeValue;
    }
    return originalAttrs;
}

export function registerSelectableFigure() {
    AFRAME.registerComponent('selectable-check', {
        dependencies: ['raycaster'],

        init: function () {

            const figSelected = this.el;
            const originalAttrs: any = _cloneProperties(figSelected);

            // Use events to figure out what raycaster is listening so we don't have to
            // hardcode the raycaster.
            this.el.addEventListener('raycaster-intersected', evt => {
                figSelected.setAttribute('color', 'cyan');
                this.raycaster = evt.detail.el;
            });
            this.el.addEventListener('raycaster-intersected-cleared', evt => {
                figSelected.setAttribute('color', originalAttrs.color);
                this.raycaster = null;
            });
        },

        // tick: function () {
        //     if (!this.raycaster) { return; }  // Not intersecting.
        //
        //     let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
        //     console.log('tick intersection', intersection);
        //
        //     if (!intersection) { return; }
        // }
    });
}
