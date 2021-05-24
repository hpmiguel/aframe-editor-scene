import $ from "jquery";

export function loadScript(script: string) {
    $('body').append(`<script src="./src/vendor/${script}.js"></script>`)
}

export function loadPhysicsLibs() {
    loadScript('ammo.wasm');
    loadScript('aframe-physics-system.min');
}