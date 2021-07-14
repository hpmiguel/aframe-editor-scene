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
                const tableDest = document.querySelector('#'+clonePodiumId);
                duplicateFigure(figSelected, tableDest);
            });


            // this.el.addEventListener('raycaster-intersected', evt => {
            //     alert('intersected!!!')
            // });
        }
    };
    registerComponent(selectableFigurePaletteAttr, selectableFigurePaletteComponent);
}
