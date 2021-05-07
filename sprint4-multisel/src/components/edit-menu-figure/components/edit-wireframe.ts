import {Figure} from "../../../models/figure";
import {createToggle} from "../../../helpers/gui-helper";

export function addControlEditWireframe(parentMenu: HTMLElement, figure: Figure) {
    // Create Toggle
    const wireframeControl = createToggle({
        value: 'Wireframe'
    });

    // Interaction
    const customAction = 'setWireframe' + new Date().getTime();
    wireframeControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            const wireframeStatus = figure.htmlRef.getAttribute('wireframe') === "true";
            figure.setWireframe(!wireframeStatus);
        }
    }

    parentMenu.appendChild(wireframeControl);
}
