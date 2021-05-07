import {Figure} from '../../../models/figure';
import {createToggle} from '../../../helpers/gui-helper';

export function addControlEditShadow(parentMenu: HTMLElement, figure: Figure) {
    // Create Toggle
    const shadowControl = createToggle({
        value: 'Shadow'
    });

    // Interaction
    const customAction = 'setShadow' + new Date().getTime();
    shadowControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            const shadowStatus = figure.htmlRef.getAttribute('shadow')['receive'];
            figure.setShadow(!shadowStatus);
        }
    }

    parentMenu.appendChild(shadowControl);
}
