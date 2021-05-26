import {createButton} from "../../../helpers/gui-helper";
import {GlobalState} from "../../../services/global-state";

export function addControlLightTimelapse(parent: HTMLElement) {
    // Create Button
    const buttonControl = createButton({
        value: 'Timelapse',
        width: '0.6',
        margin: '0 0 0.1 0'
    });

    // Interaction
    const customAction = 'timelapse' + new Date().getTime();
    buttonControl.setAttribute('onclick', customAction);

    const lightScene = GlobalState.getInstance().getLightScene();

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            lightScene.timelapse();
        }
    }

    parent.appendChild(buttonControl);
}