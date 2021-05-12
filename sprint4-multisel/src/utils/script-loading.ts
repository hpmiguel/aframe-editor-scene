import $ from "jquery";

export function loadScript(script: string) {
    $('body').append(`<script src="./src/vendor/${script}.js"></script>`)
}