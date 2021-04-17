// Global imports
import 'aframe';
import 'aframe-event-set-component';
import 'aframe-environment-component';
import 'super-hands';
import 'aframe-gui';

import { Box, Cone, Cylinder, Figure, Plane, Sphere } from './models/figure';
import { SceneRef } from './services/scene-ref';
import { appendFigure } from './helpers/figure-helper';
import { textures } from './utils/constants';
import { LightScene } from './components/light-scene/light-scene';
import { FiguresPalette } from './components/figures-palette/figures-palette';

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded");

    const sceneEl = SceneRef.getInstance().getSceneEl();

    new LightScene({
        type: 'directional',
        castShadow: true,
        intensity: 0.98,
        shadowCameraVisible: false,
        position: "1 2 1.8"
    });

    // Render table to append cloned figures
    const table = new Plane({
        color: 'purple',
        height: 1,
        width: 2,
        rotation: '-90 0 0'
    });
    appendFigure(table, '-0.8 0.01 1.8', sceneEl);

    const initialFigures: Array<Figure> = [
        new Cone({
            'radius-bottom': 0.3,
            height: 1,
            material: {
                src: textures.GRASS,
                roughness: 1
            }
        }),
        new Cylinder({
            radius: 0.3,
            height: 1,
            material: {
                src: textures.PAPER,
                roughness: 1
            }
        }),
        new Sphere({
            radius: 0.3,
            material: {
                src: textures.WOODEN,
                roughness: 1
            }
        }),
        new Box({
            height: 0.5,
            width: 0.5,
            depth: 0.5,
            material: {
                src: textures.WALLBRICK,
                roughness: 1
            }
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

});

