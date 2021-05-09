import {Figure} from "../../../models/figure";
import {createButton} from "../../../helpers/gui-helper";
import {duplicateFigure} from "../../../helpers/figure-helper";

export function addControlCloneFigure(parentMenu: HTMLElement, figure: Figure) {
    // Create Button
    const cloneControl = createButton({
        value: 'Clone',
        margin: '0 0 0.05 0',
        width: '0.5'
    });

    // Interaction
    const customAction = 'closeMenu' + new Date().getTime();;
    cloneControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            const tableDest = document.querySelector(`a-plane`);
            duplicateFigure(figure.htmlRef, tableDest);
        }
    }

    parentMenu.appendChild(cloneControl);
}