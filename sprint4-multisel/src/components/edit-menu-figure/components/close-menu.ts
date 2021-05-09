import {Figure} from "../../../models/figure";
import {createButton, createLabel} from "../../../helpers/gui-helper";

export function addControlCloseMenu(parentMenu: HTMLElement, figure: Figure) {
    // Create Button
    const closeControl = createButton({
        value: 'X',
        margin: '0 0 0.1 0',
        'background-color': '#c41b1b'
    });

    // Interaction
    const customAction = 'closeMenu' + new Date().getTime();
    closeControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            const menuRef = figure.htmlRef.childNodes[0] as HTMLElement;
            menuRef.setAttribute('visible', 'false');
        }
    }

    parentMenu.appendChild(closeControl);
}