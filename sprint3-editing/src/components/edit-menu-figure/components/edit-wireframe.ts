import {Figures} from "../../../models/figures";
import {createLabel, createToggle} from "../../../utils/gui-utils";

export function addControlEditWireframe(parentMenu: HTMLElement, figure: Figures) {
    // Create Slider
    const wireframeControl = createToggle({
        checked: false
    });

    // Interaction
    const customAction = 'setWireframe';
    wireframeControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        figure.toggleWireframe();
    }

    parentMenu.appendChild(wireframeControl);
}