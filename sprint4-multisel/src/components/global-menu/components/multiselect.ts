import {createToggle} from "../../../helpers/gui-helper";
import {GlobalState} from "../../../services/global-state";

export function addControlEnableMultiselect(parentMenu: HTMLElement) {
    // Create Toggle
    const multiselectControl = createToggle({
        value: 'Multiselect'
    });

    // Interaction
    const customAction = 'setWireframe' + new Date().getTime();
    multiselectControl.setAttribute('onclick', customAction);

    const globalState = GlobalState.getInstance();

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            const multiselectEnable = globalState.getMultiselectEnable();
            globalState.setMultiselectEnable(!multiselectEnable);
        }
    }

    parentMenu.appendChild(multiselectControl);
}