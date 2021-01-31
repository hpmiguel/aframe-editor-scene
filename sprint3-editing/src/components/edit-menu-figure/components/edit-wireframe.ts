import {Figure} from "../../../models/figure";
import {createToggle} from "../../../helpers/gui-helper";

export function addControlEditWireframe(parentMenu: HTMLElement, figure: Figure) {
    // Create Toggle
    const wireframeControl = createToggle({
        value: 'Wireframe'
    });

    // Interaction
    const customAction = 'setWireframe';
    wireframeControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        figure.toggleWireframe();
    }

    parentMenu.appendChild(wireframeControl);
}
