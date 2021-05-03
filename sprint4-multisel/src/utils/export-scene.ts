import $ from "jquery";

export function exportSceneAsHtml() {
    // Getting html scene
    const content = $('html').html();

    //Building downloadable file
    const a = document.createElement('a') as unknown as HTMLAnchorElement;
    const fileName = 'scene.html';
    const blob = new Blob([content], { type: 'text/html' });
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}
