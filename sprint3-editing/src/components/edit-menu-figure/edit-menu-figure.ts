import {
    createContainer,
} from '../../utils/gui-utils';
import {addControlEditOpacity} from "./components/edit-opacity";
import {addControlEditColor} from "./components/edit-color";
import {addControlEditSize} from "./components/edit-size";
import {Figures} from "../../models/figures";
import {addControlEditWireframe} from "./components/edit-wireframe";

class EditMenuFigure {

    private entityRef: HTMLElement;
    private readonly figure: Figures;

    constructor(fig: Figures) {
        this.figure = fig;

        this.createMenuContainer();

        // Add controls properties
        // addControlEditColor(this.entityRef, fig);
        // addControlEditOpacity(this.entityRef, fig);
        // addControlEditSize(this.entityRef, fig);
        addControlEditWireframe(this.entityRef, fig);
    }

    private createMenuContainer() {
        this.entityRef = createContainer({
            width: '0.7',
            height: '3',
            position: '0 1.5 0'
        });
        this.figure.htmlRef.appendChild(this.entityRef);
    }

}

export { EditMenuFigure }
