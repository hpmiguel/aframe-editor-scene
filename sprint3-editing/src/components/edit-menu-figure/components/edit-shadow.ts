import {Figure} from '../../../models/figure';
import {createToggle} from '../../../helpers/gui-helper';

export function addControlEditShadow(parentMenu: HTMLElement, figure: Figure) {
    // Create Toggle
    const shadowControl = createToggle({
        checked: false
    });

    // Interaction
    const customAction = 'setShadow';
    shadowControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        figure.toggleShadow();
    }

    parentMenu.appendChild(shadowControl);
}
