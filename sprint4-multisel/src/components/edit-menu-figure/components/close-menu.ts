import {Figure} from "../../../models/figure";
import {createButton, createLabel} from "../../../helpers/gui-helper";

export function addControlCloseMenu(parentMenu: HTMLElement, figure: Figure) {
    // Create Button
    const closeControl = createButton({
        value: 'X',
        margin: '0 0 0.05 0',
        'background-color': '#e07979'
    });
    // 'margin-left': '1'

    // Interaction
    const customAction = 'closeMenu' + new Date().getTime();
    closeControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        event.stopPropagation();
        const menuRef = figure.htmlRef.childNodes[0] as HTMLElement;
        menuRef.setAttribute('visible', 'false');
    }

    parentMenu.appendChild(closeControl);
}