import { registerComponent } from 'aframe';
import { showFigureMenu, markFigureAsSelected } from '../../../helpers/figure-helper';
import {GlobalState} from "../../../services/global-state";

export const selectableFigureAttr = 'selectable-custom';

export function registerSelectableFigure() {
    const selectableFigureComponent = {
        dependencies: ['raycaster'],
        init: function () {
            const figSelected = this.el;
            // const originalAttrs: any = cloneProperties(figSelected);
            let lastClick = null;
            const globalState = GlobalState.getInstance();

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
                            const multiselectEnable = globalState.getMultiselectEnable();
                            if (multiselectEnable) {
                                markFigureAsSelected(figSelected);
                            } else {
                                showFigureMenu(figSelected);
                            }
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
