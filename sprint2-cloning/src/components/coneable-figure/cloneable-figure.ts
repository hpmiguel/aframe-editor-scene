import {registerComponent} from 'aframe';
import {SceneRef} from '../../services/scene-ref';

export const selectableFigureAttr = 'selectable-check';

export function registerSelectableFigure() {
    const selectableFigureComponent = {
        dependencies: ['raycaster'],
        init: function () {
            const figSelected = this.el;

            this.el.addEventListener('click', function (evt) {
                _duplicateFigure(figSelected);
            });
        }
    }
    registerComponent(selectableFigureAttr, selectableFigureComponent);
}

function _duplicateFigure(figEl: HTMLElement) {
    const sceneEl = SceneRef.getInstance().getSceneEl();
    const figCoords = '0 0.5 1';
    const clonedFigureEl = figEl.cloneNode() as HTMLElement;
    clonedFigureEl.setAttribute('position', figCoords);
    sceneEl.appendChild(clonedFigureEl);
}
