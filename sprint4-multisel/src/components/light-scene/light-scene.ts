import {propsInLine} from "../../helpers/figure-helper";
import {SceneRef} from "../../services/scene-ref";

export class LightScene {

    primitive: string = 'a-entity'
    htmlRef: HTMLElement;
    props: LightProps;

    constructor(props: LightProps) {
        this.props = props;
        this.createLightEntity();
    }

    private createLightEntity() {
        this.htmlRef = document.createElement(this.primitive);
        this.setLightConfig();
        const sceneEl = SceneRef.getInstance().getSceneEl();
        sceneEl.appendChild(this.htmlRef);
    }

    private setLightConfig() {
        const props = {...this.props};
        const position = props.position;
        delete props['position'];
        const lightValue = propsInLine(props);
        this.htmlRef.setAttribute('light', lightValue);
        this.htmlRef.setAttribute('position', position);
    }

    setIntensity(intensity: number) {
        this.props.intensity = intensity;
        this.setLightConfig();
    }
}

type LightProps = {
    type: string,
    castShadow: boolean,
    intensity: number,
    shadowCameraVisible: boolean,
    position: string
}
