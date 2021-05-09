// Singleton pattern

import {Figure} from "../models/figure";

export class GlobalState {
    private static instance: GlobalState;

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

    public getSceneFigures(): Array<Figure> {
        return this.sceneFigures;
    }

    public setSceneFigures(figures: Array<Figure>) {
        this.sceneFigures = figures;
    }

    public getMultiselectEnable(): boolean {
        return this.multiselectEnable;
    }

    public setMultiselectEnable(enable: boolean) {
        this.multiselectEnable = enable;
    }

    public getSelectedFigures(): Array<Figure> {
        return this.selectedFigures;
    }

    public setSelectedFigures(selFigs: Array<Figure>) {
        this.selectedFigures = selFigs;
    }

}