import {createContainer, createLabel} from "../../helpers/gui-helper";
import {SceneRef} from "../../services/scene-ref";
import {addControlEnableMultiselect} from "./components/multiselect";
import {addControlEditSize} from "../edit-menu-figure/components/edit-size";
import {addControlImportExport} from "./components/import-export-scene";
import {addControlLightIntensity} from "./components/light-intensity";
import {addControlLightTimelapse} from "./components/light-timelapse";
import {addControlChangeScene} from "./components/change-scene";

export class GlobalMenu {

    private entityRef: HTMLElement;
    private props: any;

    constructor(props) {
        this.props = props;

        this.createMenuContainer();

        // Title
        const title = createLabel('Scene Menu', {margin: '0 0 0.1 0', width: '1.3'});
        this.entityRef.appendChild(title);

        // Controls
        addControlChangeScene(this.entityRef);
        addControlLightIntensity(this.entityRef);
        addControlLightTimelapse(this.entityRef);
        addControlImportExport(this.entityRef);
        addControlEnableMultiselect(this.entityRef);

        // Multiselect Ops
        addControlEditSize(this.entityRef, null);
    }

    private createMenuContainer() {
        this.entityRef = createContainer(this.props);

        const sceneEl = SceneRef.getInstance().getSceneEl();
        sceneEl.appendChild(this.entityRef);
    }

}