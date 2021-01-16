import {
    createContainer,
} from '../../helpers/gui-helper';
import {addControlEditOpacity} from "./components/edit-opacity";
import {addControlEditColor} from "./components/edit-color";
import {addControlEditSize} from "./components/edit-size";
import {Figure} from "../../models/figure";
import {addControlEditWireframe} from "./components/edit-wireframe";
import {addControlEditMaterial} from "./components/edit-material";

class EditMenuFigure {

    private entityRef: HTMLElement;
    private readonly figure: Figure;

    constructor(fig: Figure) {
        this.figure = fig;

        this.createMenuContainer();

        // Add controls properties
        // addControlEditColor(this.entityRef, fig);
        // addControlEditOpacity(this.entityRef, fig);
        // addControlEditSize(this.entityRef, fig);
        // addControlEditWireframe(this.entityRef, fig);
        addControlEditMaterial(this.entityRef, fig);
    }

    private createMenuContainer() {
        this.entityRef = createContainer({
            width: '0.7',
            height: '1',
            position: '0 1.5 0'
        });
        this.figure.htmlRef.appendChild(this.entityRef);
    }

}

export { EditMenuFigure }
