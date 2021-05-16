import { registerComponent } from 'aframe';
import {showFigureMenu, markFigureAsSelected, cloneProperties} from '../../../helpers/figure-helper';
import {GlobalState} from "../../../services/global-state";

export const selectableFigureSceneAttr = 'selectable-figure-scene';

export function registerSelectableFigureScene() {
    const selectableFigureSceneComponent = {
        dependencies: ['raycaster'],
        init: function () {
            const figSelected = this.el;
            let cachedProps: any;
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

            const opacityReduction = 0.2;

            // Hover
            this.el.addEventListener('mouseover', function (evt) {
                cachedProps = cloneProperties(figSelected);
                const figOpacity = Number(cachedProps.opacity);
                const opacityHover = figOpacity - opacityReduction;
                figSelected.setAttribute('opacity', opacityHover.toString());
            });

            this.el.addEventListener('mouseleave', function (evt) {
                const figOpacityNow = Number(figSelected.getAttribute('opacity'));
                const figOpacityCached = Number(cachedProps.opacity);
                const opacityChanged = figOpacityNow !== (figOpacityCached - opacityReduction);
                const opacityRollback = opacityChanged ? figOpacityNow : figOpacityNow + opacityReduction;
                figSelected.setAttribute('opacity', opacityRollback.toString());
            });
        }
    };
    registerComponent(selectableFigureSceneAttr, selectableFigureSceneComponent);
}
