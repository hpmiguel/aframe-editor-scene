// Singleton pattern

class SceneRef {
    private static instance: SceneRef;

    private sceneEl: HTMLElement = document.querySelector('a-scene');

    private constructor() {}

    static getInstance(): SceneRef {
        if (!SceneRef.instance) {
            SceneRef.instance = new SceneRef();
        }
        return SceneRef.instance;
    }

    public getSceneEl(): HTMLElement {
        return this.sceneEl;
    }
}

export { SceneRef }
