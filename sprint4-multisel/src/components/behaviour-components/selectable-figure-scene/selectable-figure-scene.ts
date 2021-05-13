import { registerComponent } from 'aframe';
import {showFigureMenu, markFigureAsSelected, cloneProperties} from '../../../helpers/figure-helper';
import {GlobalState} from "../../../services/global-state";

export const selectableFigureSceneAttr = 'selectable-figure-scene';

export function registerSelectableFigureScene() {
    const selectableFigureSceneComponent = {
        dependencies: ['raycaster'],
        init: function () {
            const figSelected = this.el;
            let originalAttrs: any = cloneProperties(figSelected);
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
                            console.log('doble click scene!!!!!!')
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
            this.el.addEventListener('mouseover', function (evt) {
                originalAttrs = cloneProperties(figSelected);
                figSelected.setAttribute('opacity', '0.7');
            });

            this.el.addEventListener('mouseleave', function (evt) {
                const originalOpacity = originalAttrs.opacity ?? '1';
                figSelected.setAttribute('opacity', originalOpacity);
            });
        }
    };
    registerComponent(selectableFigureSceneAttr, selectableFigureSceneComponent);
}
