import {createContainer, createLabel} from "../../helpers/gui-helper";
import {SceneRef} from "../../services/scene-ref";
import {addControlEnableMultiselect} from "./components/multiselect";
import {addControlEditSize} from "../edit-menu-figure/components/edit-size";
import {addControlImportExport} from "./components/importExportScene";
import {addControlLightIntensity} from "./components/lightIntensity";
import {addControlLightTimelapseControl} from "./components/lightTimelapse";

export class GlobalMenu {

    private entityRef: HTMLElement;

    constructor() {
        this.createMenuContainer();

        // Title
        const title = createLabel('Scene');
        this.entityRef.appendChild(title);

        // Controls
        addControlLightIntensity(this.entityRef);
        addControlLightTimelapseControl(this.entityRef);
        addControlImportExport(this.entityRef);
        addControlEnableMultiselect(this.entityRef);

        // Multiselect Ops
        addControlEditSize(this.entityRef, null);
    }

    private createMenuContainer() {
        this.entityRef = createContainer({
            width: '2.6',
            height: '2.2',
            position: '-3.6 1.5 1.5',
            rotation: '0 20 0'
            // 'panel-color': '#93b2e8'
        });

        const sceneEl = SceneRef.getInstance().getSceneEl();
        sceneEl.appendChild(this.entityRef);
    }

}