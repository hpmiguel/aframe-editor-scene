import {createToggle} from "../../../helpers/gui-helper";
import {GlobalState} from "../../../services/global-state";
import {markFigureAsSelected} from "../../../helpers/figure-helper";

export function addControlEnableMultiselect(parentMenu: HTMLElement) {
    // Create Toggle
    const multiselectControl = createToggle({
        value: 'Multiselect Mode',
        width: '1'
    });

    // Interaction
    const customAction = 'setMultiSelect' + new Date().getTime();
    multiselectControl.setAttribute('onclick', customAction);

    const globalState = GlobalState.getInstance();

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            const multiselectEnable = globalState.getMultiselectEnable();
            globalState.setMultiselectEnable(!multiselectEnable);
            if (multiselectEnable) {
                const selFigs = globalState.getSelectedFigures();
                selFigs.forEach(fig => {
                    markFigureAsSelected(fig.htmlRef);
                });
            }
        }
    }

    parentMenu.appendChild(multiselectControl);
}