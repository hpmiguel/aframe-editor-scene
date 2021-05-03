import {propsInLine} from "../../helpers/figure-helper";
import {SceneRef} from "../../services/scene-ref";

export class LightScene {

    primitive: string = 'a-entity'
    htmlRef: HTMLElement;
    props: any;

    constructor(props: any) {
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
        if (this.htmlRef && this.props && Object.keys(this.props)) {
            const props = {...this.props};
            const position = props.position;
            delete props['position'];
            const lightValue = propsInLine(props);
            this.htmlRef.setAttribute('light', lightValue);
            this.htmlRef.setAttribute('position', position);
        }
    }

    setProps(props: any) {
        if(props && Object.keys(props)) {
            this.props = props;
            this.setLightConfig();
        }
    }

    setActive(active: boolean) {
        if (active) {
            this.setLightConfig();
        } else {
            this.htmlRef.setAttribute('light', '');
        }
    }
}
