import { registerComponent } from 'aframe';
import { cloneProperties } from '../../../helpers/figure-helper';

export const selectableFigureAttr = 'selectable-check';

export function registerSelectableFigure() {
    // const tableDest = document.querySelector(`#${idDest}`);
    const selectableFigureComponent = {
        dependencies: ['raycaster'],
        init: function () {
            const figSelected = this.el;
            const originalAttrs: any = cloneProperties(figSelected);
            let lastClick = null;

            // Clone figure
            // this.el.addEventListener('click', function (evt) {
            //     // Detect double click manually implementation
            //     if(evt instanceof MouseEvent) {
            //         if (!lastClick) {
            //             lastClick = new Date().getTime();
            //         } else {
            //             const thisClick = new Date().getTime();
            //             const isDblClick = thisClick - lastClick < 400;
            //             if (isDblClick) {
            //                 _duplicateFigure(figSelected, tableDest);
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
            //     figSelected.childNodes[0].setAttribute('visible', !visibleState);
            // });

            // Hover styles
            this.el.addEventListener('mouseover', function (evt) {
                figSelected.setAttribute('color', 'cyan');
            });

            this.el.addEventListener('mouseleave', function (evt) {
                figSelected.setAttribute('color', originalAttrs.color);
            });
        }
    };
    registerComponent(selectableFigureAttr, selectableFigureComponent);
}

function _duplicateFigure(figEl: HTMLElement, parent: HTMLElement) {
    // Cloning figure
    const clonedFigureEl = figEl.cloneNode() as HTMLElement;

    // Setting destination position
    clonedFigureEl.setAttribute('position', '0 0 0.5');
    clonedFigureEl.setAttribute('rotation', '90 0 0'); // Because plane is already rotated

    // Append to dest
    parent.appendChild(clonedFigureEl);
}
