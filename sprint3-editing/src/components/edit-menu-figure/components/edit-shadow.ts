import {Figure} from '../../../models/figure';
import {createToggle} from '../../../helpers/gui-helper';

export function addControlEditShadow(parentMenu: HTMLElement, figure: Figure) {
    // Create Toggle
    const shadowControl = createToggle({
        value: 'Shadow'
    });

    // Interaction
    const customAction = 'setShadow';
    shadowControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        const shadowStatus = figure.htmlRef.getAttribute('shadow')['receive'];
        figure.setShadow(!shadowStatus);
    }

    parentMenu.appendChild(shadowControl);
}
