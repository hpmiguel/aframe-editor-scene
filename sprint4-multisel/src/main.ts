// Global imports
import 'aframe';
import 'aframe-event-set-component';
import 'aframe-environment-component';
import 'super-hands';
import 'aframe-gui';

import $ from "jquery";

import { Box, Cone, Cylinder, Figure, Plane, Sphere } from './models/figure';
import { SceneRef } from './services/scene-ref';
import { appendFigure } from './helpers/figure-helper';
import { textures } from './utils/constants';
import { LightScene } from './components/light-scene/light-scene';
import { FiguresPalette } from './components/figures-palette/figures-palette';
import { GlobalMenu } from "./components/global-menu/global-menu";
import {GlobalState} from "./services/global-state";

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

    const sceneEl = SceneRef.getInstance().getSceneEl();
    const globalState = GlobalState.getInstance();

    new LightScene({
        type: 'directional',
        castShadow: true,
        intensity: 0.98,
        shadowCameraVisible: false,
        position: "1 2 1.8"
    });

    // Render table to append cloned figures
    const table = new Plane({
        height: 1,
        width: 2,
        rotation: '-90 0 0',
        material: {
            src: textures.WOODEN,
            roughness: 1
        }
    });
    appendFigure(table, '-0.8 0.01 1.8', sceneEl);

    const initialFigures: Array<Figure> = [
        new Cone({
            'radius-bottom': 0.3,
            height: 0.8,
            color: 'red'
        }),
        new Cylinder({
            radius: 0.3,
            height: 0.8,
            color: 'blue'
        }),
        new Sphere({
            radius: 0.3,
            color: 'yellow'
        }),
        new Box({
            height: 0.5,
            width: 0.5,
            depth: 0.5,
            color: 'green'
        })
    ];

    // Render figures palette
    new FiguresPalette(
        {
            position: "0 0.5 0",
            rotation: "0 0 0"
        },
        initialFigures
    );

    // Caching global figure models
    globalState.setSceneFigures(initialFigures);

    // Global Menu
    new GlobalMenu();

});

