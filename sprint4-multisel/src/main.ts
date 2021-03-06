// Global libs imports
import 'aframe';
import 'aframe-event-set-component';
import 'aframe-environment-component';
import 'super-hands';
import 'aframe-gui';

// Modules imports
import { Box, Cone, Cylinder, Figure, Plane, Sphere } from './models/figure';
import { SceneRef } from './services/scene-ref';
import { appendFigure } from './helpers/figure-helper';
import { clonePodiumId, textures } from './utils/constants';
import { LightScene } from './components/light-scene/light-scene';
import { FiguresPalette } from './components/figures-palette/figures-palette';
import { GlobalMenu } from "./components/global-menu/global-menu";
import { registerSelectableFigureScene } from "./components/behaviour-components/selectable-figure-scene/selectable-figure-scene";
import { loadPhysicsLibs } from "./utils/script-loading";
import { defineImportEvent } from "./utils/export-scene";
import { InfoMenu } from "./components/info-menu/info-menu";
import { GlobalState } from "./services/global-state";

// TODO import like modules, test compile ammo module to wasm
// import * as Ammo from './vendor/ammo.wasm' // compiled online
// import 'aframe-physics-system';

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

    // Building scene

    const physicsActive: boolean = true;

    // Asynchronous loading physics libs
    if (physicsActive) loadPhysicsLibs();

    defineImportEvent();

    const scene = SceneRef.getInstance().getSceneEl();
    const globalState = GlobalState.getInstance();

    const lightScene = new LightScene({
        type: 'directional',
        castShadow: true,
        intensity: 0.9,
        shadowCameraVisible: false,
        position: "0 3 4"
    });
    globalState.setLightScene(lightScene);

    const floor = new Plane({
        id: clonePodiumId,
        height: 3,
        width: 5,
        rotation: '-90 0 0',
        material: {
            src: textures.WOODEN,
            roughness: 1
        },
        physics: {
            body: 'static',
            shape: 'box'
        }
    });
    appendFigure(floor, '0 0.01 1.5', scene);
    registerSelectableFigureScene();

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
            position: "0.2 2.3 0",
            rotation: "0 0 0"
        },
        initialFigures
    );

    // Global Menu
    new GlobalMenu({
        width: '2.6',
        height: '2.6',
        position: '-3.6 2 1.5',
        rotation: '0 20 0'
        // 'panel-color': '#93b2e8'
    });

    // Info Menu
    new InfoMenu({
        width: '1.8',
        height: '1.8',
        position: '3 1.8 1.5',
        rotation: '0 -20 0'
        // 'panel-color': '#93b2e8'
    });

});

