import {
    createContainer,
} from '../../utils/gui-utils';
import {addControlEditOpacity} from "./components/edit-opacity";
import {addControlEditColor} from "./components/edit-color";

class EditMenuFigure {

    private entityRef: HTMLElement;
    private readonly figure: HTMLElement;

    constructor(figEditNode: HTMLElement) {
        this.figure = figEditNode;

        this.createMenuContainer();

        // Add controls properties
        // addControlEditColor(this.entityRef, figEditNode);
        addControlEditOpacity(this.entityRef, figEditNode);
    }

    private createMenuContainer() {
        this.entityRef = createContainer({
            width: '0.7',
            height: '3',
            position: '0 1.5 0'
        });
        this.figure.appendChild(this.entityRef);
    }

}

export { EditMenuFigure }
