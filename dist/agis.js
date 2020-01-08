var AgisLibrary = /** @class */ (function () {
    function AgisLibrary() {
        var _this = this;
        this.addClass = function (classList) {
            _this._element.classList.add(classList);
            return _this;
        };
        this.removeClass = function (classList) {
            _this._element.classList.remove(classList);
            return _this;
        };
        this.init = function (id) {
            _this._element = document.getElementById(id);
            return _this;
        };
    }
    return AgisLibrary;
}());
var Agis = new AgisLibrary().init;
