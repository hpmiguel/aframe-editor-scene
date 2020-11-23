class SceneRef {
    private static instance: SceneRef;

    private sceneEl = document.querySelector('a-scene');

    private constructor() {}

    static getInstance(): SceneRef {
        if (!SceneRef.instance) {
            SceneRef.instance = new SceneRef();
        }
        return SceneRef.instance;
    }

    public getSceneEl() {
        return this.sceneEl;
    }
}

export { SceneRef }
