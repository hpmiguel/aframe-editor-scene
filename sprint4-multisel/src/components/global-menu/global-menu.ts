import {createContainer, createLabel} from "../../helpers/gui-helper";
import {SceneRef} from "../../services/scene-ref";
import {addControlEnableMultiselect} from "./components/multiselect";
import {addControlEditSize} from "../edit-menu-figure/components/edit-size";
import {addControlImportExport} from "./components/importExportScene";

export class GlobalMenu {

    private entityRef: HTMLElement;

    constructor() {
        this.createMenuContainer();

        // Title
        const title = createLabel('Scene');
        this.entityRef.appendChild(title);

        // Controls
        addControlImportExport(this.entityRef);
        addControlEnableMultiselect(this.entityRef);

        // Multiselect Ops
        const labelMulti = createLabel('Multi');
        this.entityRef.appendChild(labelMulti);

        addControlEditSize(this.entityRef, null);
    }

    private createMenuContainer() {
        this.entityRef = createContainer({
            width: '1.3',
            height: '1.6',
            position: '-3.6 1.5 1.5',
            rotation: '0 20 0'
            // 'panel-color': '#93b2e8'
        });

        const sceneEl = SceneRef.getInstance().getSceneEl();
        sceneEl.appendChild(this.entityRef);
    }

}