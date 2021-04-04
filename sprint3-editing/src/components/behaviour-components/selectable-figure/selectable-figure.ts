import { registerComponent } from 'aframe';
import {cloneProperties, duplicateFigure} from '../../../helpers/figure-helper';

export const selectableFigureAttr = 'selectable-check';

export function registerSelectableFigure() {
    const tableDest = document.querySelector(`a-plane`);
    const selectableFigureComponent = {
        dependencies: ['raycaster'],
        init: function () {
            const figSelected = this.el;
            const originalAttrs: any = cloneProperties(figSelected);
            let lastClick = null;

            // Clone figure
            // this.el.addEventListener('click', function (evt) {
            //     console.log('click!!!', evt)
            //
            //     // Detect double click manually implementation
            //     if(evt instanceof MouseEvent) {
            //         if (!lastClick) {
            //             lastClick = new Date().getTime();
            //         } else {
            //             const thisClick = new Date().getTime();
            //             const isDblClick = thisClick - lastClick < 400;
            //             if (isDblClick) {
            //                 duplicateFigure(figSelected, tableDest);
            //             }
            //             lastClick = null;
            //         }
            //     }
            // });

            // Show menu edit figure
            // this.el.addEventListener('click', function (evt) {
            //     const menuRef = figSelected.childNodes[0];
            //     const visibleState = Boolean(menuRef.getAttribute('visible'));
            //     // !visibleState && figSelected.childNodes[0].setAttribute('visible', 'true');
            //     console.log('---------visibleState', visibleState)
            //     console.log('---------child', figSelected.childNodes[0])
            //     figSelected.childNodes[0].setAttribute('visible', !visibleState);
            // });

            // Hover styles
            // this.el.addEventListener('mouseover', function (evt) {
            //     figSelected.setAttribute('color', 'cyan');
            // });
            //
            // this.el.addEventListener('mouseleave', function (evt) {
            //     const originalColor = originalAttrs.color === undefined ? originalAttrs.color : 'white';
            //     figSelected.setAttribute('color', originalColor);
            // });
        }
    };
    registerComponent(selectableFigureAttr, selectableFigureComponent);
}
