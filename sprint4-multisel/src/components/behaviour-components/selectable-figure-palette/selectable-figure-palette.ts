import { registerComponent } from 'aframe';
import { clonePodiumId } from "../../../utils/constants";
import { duplicateFigure } from "../../../helpers/figure-helper";

export const selectableFigurePaletteAttr = 'selectable-figure-palette';

export function registerSelectableFigurePalette() {
    const selectableFigurePaletteComponent = {
        dependencies: ['raycaster'],
        init: function () {
            const figSelected = this.el;
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
                            const tableDest = document.querySelector('#'+clonePodiumId);
                            duplicateFigure(figSelected, tableDest);
                        }
                        lastClick = null;
                    }
                }
            });
        }
    };
    registerComponent(selectableFigurePaletteAttr, selectableFigurePaletteComponent);
}
