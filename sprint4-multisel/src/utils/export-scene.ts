import Jquery from "jquery";
import {clonePodiumId} from "./constants";
import {recoverPropsFigure} from "../helpers/figure-helper";
import {EditMenuFigure} from "../components/edit-menu-figure/edit-menu-figure";
import {GlobalState} from "../services/global-state";

const globalState = GlobalState.getInstance();

function replaceScene(htmlScene: string) {
    // Fixing scene
    const entityImport = document.createElement('a-entity');
    entityImport.setAttribute('rotation', '90 0 0');
    entityImport.setAttribute('position', '0 0 1');
    entityImport.innerHTML = htmlScene;

    // Inserting import scene
    Jquery('#'+clonePodiumId).html(entityImport);

    cachingFigures();
}

function cachingFigures() {
    globalState.resetState();

    const sceneElements = Array.from(Jquery(`#${clonePodiumId} a-entity`).children()) as Array<HTMLElement>;

    sceneElements.forEach((node, i) => {
        // Recreate figure model from DOM
        const figModel = recoverPropsFigure(node);

        // Adding Menu to cloned figure
        new EditMenuFigure(figModel);

        // Caching model figures on global state
        globalState.getSceneFigures().push(figModel);

        // Distributing around podium
        node.setAttribute('position', `${(-0.8 * i) + 1.8} 0 1`);
    });
}

export function defineImportEvent() {
    document.getElementById('inputSceneFile').addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function(){
            const fileContent: string = fr.result.toString();
            replaceScene(fileContent);
        }
        fr.readAsText((this as any).files[0]);
    });
}

function getInnerHtml(target: HTMLElement) {
    const clonedTarget = target.cloneNode() as HTMLElement;
    const wrap = document.createElement('div');
    wrap.appendChild(clonedTarget);
    return wrap.innerHTML.toString();
}

export function exportSceneAsHtml() {
    // Getting html scene
    const sceneElements = Array.from(Jquery('#'+clonePodiumId).children()) as Array<HTMLElement>;

    let htmlToExport = '';
    sceneElements.forEach(node => {
        const htmlStrNode = getInnerHtml(node);
        htmlToExport += htmlStrNode;
    });

    //Building downloadable file
    const a = document.createElement('a') as unknown as HTMLAnchorElement;
    const fileName = `scene_${new Date().toISOString()}.html`;
    const blob = new Blob([htmlToExport], { type: 'text/html' });
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}

export function importScene() {
    Jquery('#inputSceneFile').click();
}
