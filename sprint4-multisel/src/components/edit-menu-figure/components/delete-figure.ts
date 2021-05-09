import {Figure} from "../../../models/figure";
import {createButton} from "../../../helpers/gui-helper";

export function addControlDeleteFigure(parentMenu: HTMLElement, figure: Figure) {
    // Create Button
    const cloneControl = createButton({
        value: 'Delete',
        margin: '0 0 0.05 0',
        width: '0.5',
        'background-color': 'red'
    });

    // Interaction
    const customAction = 'deleteFigure' + new Date().getTime();;
    cloneControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            figure.htmlRef.remove();
        }
    }

    parentMenu.appendChild(cloneControl);
}