import { Viewer, Ion } from "cesium";
var View = /** @class */ (function () {
    function View(props) {
        Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNGQ4OTdhMC0zMjAwLTRkYzMtYTZlMi03YTljM2JiMDBhZDkiLCJpZCI6NDMxNzcsImlhdCI6MTYxMjI4NDk0OX0.BkbalpDSkjTNl4DD3g4vhnf7L53C4gTXMaTf98e5Psk';
        this.viewer = new Viewer(props.el, props.options);
        this.scene = this.viewer.scene;
        this.camera = this.viewer.camera;
        this.container = this.viewer.cesiumWidget.creditContainer;
        this.container.style.display = "none";
    }
    // 销毁部件
    View.prototype.destroyParts = function () {
        if (!this.viewer.isDestroyed()) {
            this.viewer.destroy();
        }
    };
    return View;
}());
export default View;
