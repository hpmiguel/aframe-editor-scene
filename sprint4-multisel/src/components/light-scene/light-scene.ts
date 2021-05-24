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

    setPosition(pos: string) {
        this.props.position = pos;
        this.setLightConfig();
    }

    timelapse() {
        const originalPos = this.props.position.split(' ');
        const originalIntensity = this.props.intensity;

        const initPosX = -8;
        const finalPosX = 8;

        // offset on loop
        let intensity = 0.01;
        let posX = initPosX;

        const frames = 50;
        const duration = 3000; //ms

        const timeInterval = duration / frames;
        const posXIncrease = (Math.abs(initPosX) + Math.abs(finalPosX)) / frames;
        const intensityIncrease = (1 - intensity) / frames;

        const self = this; // caching context

        let i = 0;

        function scheduleSetIntervalState() {
            setTimeout(() => {
                if (i <= frames) {
                    // last recover initial pos and intensity
                    if (i === frames) {
                        self.setIntensity(originalIntensity);
                        self.setPosition(originalPos.join(' '));
                    } else {
                        self.setIntensity(intensity);
                        self.setPosition(`${posX} ${originalPos[1]} ${originalPos[2]}`);
                        if (intensity < 1) {
                            intensity = intensity + (intensityIncrease * 2);
                        } else {
                            intensity = intensity - (intensityIncrease * 2);
                        }
                        posX = posX + posXIncrease;
                        i++;
                        scheduleSetIntervalState();
                    }
                }
            }, timeInterval);
        }
        scheduleSetIntervalState(); // initial call

    }
}

type LightProps = {
    type: string,
    castShadow: boolean,
    intensity: number,
    shadowCameraVisible: boolean,
    position: string
}
