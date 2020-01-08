var AgisLibrary = /** @class */ (function () {
    function AgisLibrary() {
        var _this = this;
        this.init = function (selector) {
            _this.isIdSelector = _this.isId(selector);
            if (_this.isIdSelector) {
                selector = selector.substr(1, selector.length);
                _this.element = document.getElementById(selector);
            }
            else {
                _this.elements = document.querySelectorAll(selector);
            }
            return _this;
        };
        this.addClass = function (classList) {
            if (_this.isIdSelector) {
                _this.element.classList.add(classList);
            }
            else {
                _this.elements.forEach(function (ele) {
                    ele.classList.add(classList);
                });
            }
            return _this;
        };
        this.removeClass = function (classList) {
            if (_this.isIdSelector) {
                _this.element.classList.remove(classList);
            }
            else {
                _this.elements.forEach(function (ele) {
                    ele.classList.remove(classList);
                });
            }
            return _this;
        };
        this.hasClass = function (className) {
            if (_this.isIdSelector) {
                return _this.element.classList.contains(className);
            }
            else {
                var nodeLen = _this.elements.length;
                if (nodeLen == 0) {
                    return false;
                }
                for (var i = 0; i < nodeLen; i++) {
                    if (_this.elements[i].classList.contains(className)) {
                        return true;
                    }
                    if (i == nodeLen - 1) {
                        return false;
                    }
                }
            }
        };
    }
    AgisLibrary.prototype.startsWith = function (stringVal, key) {
        return stringVal.substr(0, 1) == key;
    };
    AgisLibrary.prototype.isId = function (selector) {
        return this.startsWith(selector, "#");
    };
    return AgisLibrary;
}());
var Agis = new AgisLibrary().init;
