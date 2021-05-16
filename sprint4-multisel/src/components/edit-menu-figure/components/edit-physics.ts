import {Figure} from "../../../models/figure";
import {createToggle} from "../../../helpers/gui-helper";

export function addControlPhysicsFigure(parentMenu: HTMLElement, figure: Figure) {
    // Create Toggle
    const physicsControl = createToggle({
        value: 'Gravity'
    });

    // Interaction
    const customAction = 'setPhysics' + new Date().getTime();
    physicsControl.setAttribute('onclick', customAction);

    window[customAction] = function (event) {
        event.stopPropagation();
        if (event instanceof CustomEvent) {
            const physicsActive = Boolean(figure.htmlRef.getAttribute('ammo-body'));
            if (physicsActive) {
                figure.setPhysics(null);
            } else {
                figure.setPhysics({
                    body: 'dynamic',
                    shape: 'box'
                });
            }
        }
    }

    parentMenu.appendChild(physicsControl);
}