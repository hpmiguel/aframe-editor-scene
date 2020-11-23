import { registerComponent } from 'aframe';

export const selectableFigureAttr = 'selectable-check';

export function registerSelectableFigure(idDest: string) {
    const tableDest = document.querySelector(`#${idDest}`);
    const selectableFigureComponent = {
        dependencies: ['raycaster'],
        init: function () {
            const figSelected = this.el;


            this.el.addEventListener('click', function (evt) {
                _duplicateFigure(figSelected, tableDest);
            });
        }
    }
    registerComponent(selectableFigureAttr, selectableFigureComponent);
}

function _duplicateFigure(figEl: HTMLElement, parent: HTMLElement) {
    // Cloning figure
    const clonedFigureEl = figEl.cloneNode() as HTMLElement;

    // // Setting destination position
    // const {x, y, z} = parent.getAttribute('position') as any;
    // const figCoords = `${x} ${y-1} ${z}`;
    // clonedFigureEl.setAttribute('position', figCoords);

    // Append to dest
    parent.appendChild(clonedFigureEl);
}
