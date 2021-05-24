// Singleton pattern

import {Figure} from "../models/figure";
import {LightScene} from "../components/light-scene/light-scene";

export class GlobalState {

    private static instance: GlobalState;

    private lightScene: LightScene;

    private sceneFigures: Array<Figure> = new Array<Figure>();

    private multiselectEnable: boolean = false;
    private selectedFigures: Array<Figure> = new Array<Figure>();

    private constructor() {}

    static getInstance(): GlobalState {
        if (!GlobalState.instance) {
            GlobalState.instance = new GlobalState();
        }
        return GlobalState.instance;
    }

    // lightScene
    public getLightScene() {
        return this.lightScene;
    }

    public setLightScene(lightScene: LightScene) {
        this.lightScene = lightScene;
    }

    // sceneFigures

    public getSceneFigures(): Array<Figure> {
        return this.sceneFigures;
    }

    public setSceneFigures(figures: Array<Figure>) {
        this.sceneFigures = figures;
    }

    public removeSceneFigure(figEl: HTMLElement) {
        this.sceneFigures.filter(sel => sel.htmlRef.innerHTML !== figEl.innerHTML);
    }

    // multiselectEnable

    public getMultiselectEnable(): boolean {
        return this.multiselectEnable;
    }

    public setMultiselectEnable(enable: boolean) {
        this.multiselectEnable = enable;
    }

    // selectedFigures

    public getSelectedFigures(): Array<Figure> {
        return this.selectedFigures;
    }

    public setSelectedFigures(selFigs: Array<Figure>) {
        this.selectedFigures = selFigs;
    }

    public deselectFigure(figEl: HTMLElement) {
        this.selectedFigures = this.selectedFigures.filter(sel => sel.htmlRef.innerHTML !== figEl.innerHTML);
    }

    public resetState() {
        this.setSceneFigures([]);
        this.setSelectedFigures([]);
    }

}