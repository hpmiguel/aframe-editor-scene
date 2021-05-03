import { registerComponent } from 'aframe';
// import {cloneProperties, duplicateFigure} from '../../../helpers/figure-helper';

export const selectableFigureAttr = 'selectable-custom';

export function registerSelectableFigure() {
    const tableDest = document.querySelector(`a-plane`);
    const selectableFigureComponent = {
        dependencies: ['raycaster'],
        init: function () {
            const figSelected = this.el;
            // const originalAttrs: any = cloneProperties(figSelected);
            let lastClick = null;

            // Double click
            this.el.addEventListener('click', function (evt) {
                evt.stopPropagation();

                // Detect double click manually implementation
                if(evt instanceof MouseEvent) {
                    if (!lastClick) {
                        lastClick = new Date().getTime();
                    } else {
                        const thisClick = new Date().getTime();
                        const isDblClick = thisClick - lastClick < 400;
                        if (isDblClick) {
                            // duplicateFigure(figSelected, tableDest);

                            // hide figure menu
                            const menuRef = figSelected.childNodes[0];
                            menuRef.setAttribute('visible', 'true');
                        }
                        lastClick = null;
                    }
                }
            });

            // Hover
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
