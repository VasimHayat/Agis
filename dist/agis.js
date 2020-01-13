var AgisLibray = /** @class */ (function () {
    function AgisLibray() {
        var _this = this;
        this.nodes = [];
        this.select = function (parameter, context) {
            // Allow for spaces before or after
            parameter = parameter.replace(/^\s*/, '').replace(/\s*$/, '');
            if (/^</.test(parameter)) {
                return _this.generate(parameter);
            }
            return (context || document).querySelectorAll(parameter);
        };
        this.slice = function (pseudo) {
            // Check that it's not a valid object
            if (!pseudo ||
                pseudo.length === 0 ||
                typeof pseudo === 'string' ||
                pseudo.toString() === '[object Function]')
                return [];
            // Accept also a u() object (that has .nodes)
            return pseudo.length ? [].slice.call(pseudo.nodes || pseudo) : [pseudo];
        };
        this.generate = function (html) {
            // Table elements need to be child of <table> for some f***ed up reason
            if (/^\s*<tr[> ]/.test(html)) {
                return new AgisLibray().init(document.createElement('table')).html(html).children().children().nodes;
            }
            else if (/^\s*<t(h|d)[> ]/.test(html)) {
                return new AgisLibray().init(document.createElement('table')).html(html).children().children().children().nodes;
            }
            else if (/^\s*</.test(html)) {
                return new AgisLibray().init(document.createElement('div')).html(html).children().nodes;
            }
            else {
                return document.createTextNode(html);
            }
        };
        this.html = function (text) {
            // Needs to check undefined as it might be ""
            if (text === undefined) {
                return _this.first().innerHTML || '';
            }
            // If we're attempting to set some text
            // Loop through all the nodes
            return _this.each(function (node) {
                // Set the inner html to the node
                node.innerHTML = text;
            });
        };
        this.first = function () {
            return _this.nodes[0] || false;
        };
        this.each = function (callback) {
            if (!callback || typeof callback !== 'function')
                return;
            for (var i = 0; i < _this.nodes.length; i++) {
                callback(_this.nodes[i], i);
            }
        };
        this.empty = function () {
            return _this.each(function (node) {
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
            });
        };
        // .filter(selector)
        // Delete all of the nodes that don't pass the selector
        this.filter = function (selector, isNative) {
            // The default function if it's a CSS selector
            // Cannot change name to 'selector' since it'd mess with it inside this fn
            var callback = function (node) {
                // Make it compatible with some other browsers
                node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;
                // Check if it's the same element (or any element if no selector was passed)
                return node.matches(selector || '*');
            };
            // filter() receives a function as in .filter(e => u(e).children().length)
            if (typeof selector === 'function')
                callback = selector;
            // filter() receives an instance of Agis as in .filter(u('a'))
            if (selector instanceof AgisLibray) {
                callback = function (node) {
                    return (selector.nodes).indexOf(node) !== -1;
                };
            }
            return isNative ? _this.nodes.filter(callback) : new AgisLibray().init(_this.nodes.filter(callback));
        };
        // Find all the nodes children of the current ones matched by a selector
        this.find = function (selector) {
            return _this.map(function (node) {
                return new AgisLibray().init(selector || '*', node);
            });
        };
        this.map = function (callback) {
            return callback ? new AgisLibray().init(_this.array(callback)).unique() : _this;
        };
        // Merge all of the nodes that the callback return into a simple array
        this.array = function (callback) {
            callback = callback;
            var self = _this;
            return _this.nodes.reduce(function (list, node, i) {
                var val;
                if (callback) {
                    val = callback.call(self, node, i);
                    if (!val)
                        val = false;
                    if (typeof val === 'string')
                        val = new AgisLibray().init(val);
                    if (val instanceof AgisLibray)
                        val = val.nodes;
                }
                else {
                    val = node.innerHTML;
                }
                return list.concat(val !== false ? val : []);
            }, []);
        };
        // Removed duplicated nodes, used for some specific methods
        this.unique = function () {
            return new AgisLibray().init(_this.nodes.reduce(function (clean, node) {
                var istruthy = node !== null && node !== undefined && node !== false;
                return (istruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
            }, []));
        };
        // Add class(es) to the matched nodes
        this.addClass = function (args) {
            return _this.eacharg(args, function (el, name) {
                el.classList.add(args);
            });
        };
        // Loop through the combination of every node and every argument passed
        this.eacharg = function (args, callback) {
            return _this.each(function (node, i) {
                _this.args(args, node, i).forEach(function (arg) {
                    // Perform the callback for this node
                    // By doing callback.call we allow "this" to be the context for
                    // the callback (see http://stackoverflow.com/q/4065353 precisely)
                    callback(node, arg);
                }, _this);
            });
        };
        // Normalize the arguments to an array of strings
        // Allow for several class names like "a b, c" and several parameters
        this.args = function (args, node, i) {
            if (typeof args === 'function') {
                args = args(node, i);
            }
            // First flatten it all to a string http://stackoverflow.com/q/22920305
            // If we try to slice a string bad things happen: ['n', 'a', 'm', 'e']
            if (typeof args !== 'string') {
                args = _this.slice(args).map(_this.str(node, i));
            }
            // Then convert that string to an array of not-null strings
            return args.toString().split(/[\s,]+/).filter(function (e) {
                return e.length;
            });
        };
        this.str = function (node, i) {
            return function (arg) {
                // Call the function with the corresponding nodes
                if (typeof arg === 'function') {
                    return arg.call(_this, node, i);
                }
                // From an array or other 'weird' things
                return arg.toString();
            };
        };
        this.removeClass = function (args) {
            // Loop the combination of each node with each argument
            return _this.eacharg(args, function (el, name) {
                // Remove the class using the native method
                el.classList.remove(name);
            });
        };
        this.hasClass = function (args) {
            var nodeLen = _this.nodes.length;
            if (nodeLen == 0) {
                return false;
            }
            _this.each(function (ele, index) {
                if (ele.classList.contains(args)) {
                    return true;
                }
                if (index == nodeLen - 1) {
                    return false;
                }
            });
        };
        // Travel the matched elements one node up
        // parent_ = (selector?: any) => {
        //     return this.map((node: any) => {
        //         return node.parentNode;
        //     }).filter(selector);
        // }
        this._siblings = function (n, elem) {
            var matched = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    matched.push(n);
                }
            }
            return matched;
        };
        this.siblings = function (selector) {
            return _this.map(function (elem) {
                return _this._siblings((elem.parentNode || {}).firstChild, elem);
            }).filter(selector).nodes;
        };
        this.children = function (selector) {
            return _this.map(function (node) {
                return this.slice(node.children);
            }).filter(selector).nodes;
        };
        this.dir = function (elem, dir) {
            var matched = [];
            while ((elem = elem[dir]) && elem.nodeType !== 9) {
                if (elem.nodeType === 1) {
                    matched.push(elem);
                }
            }
            return matched;
        };
        this._parent = function (selector) {
            return _this.map(function (elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            }).filter(selector, true);
        };
        this.parent = function (selector) {
            return _this.map(function (elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            }).filter(selector, true);
        };
        this.parents = function (selector) {
            var parents = [];
            return _this.map(function (elem) {
                parents.push(_this.dir(elem, "parentNode"));
                return parents;
            }).filter(selector, true);
        };
    }
    AgisLibray.prototype.init = function (parameter, context) {
        if (!(this instanceof AgisLibray)) {
            return new AgisLibray().init(parameter, context);
        }
        if (parameter instanceof AgisLibray) {
            return parameter;
        }
        if (typeof parameter === 'string') {
            parameter = this.select(parameter, context);
        }
        // If we're referring a specific node as in on('click', function(){ u(this) })
        // or the select() function returned a single node such as in '#id'
        if (parameter && parameter.nodeName) {
            parameter = [parameter];
        }
        // Convert to an array, since there are many 'array-like' stuff in js-land
        this.nodes = this.slice(parameter);
        return this;
    };
    return AgisLibray;
}());
var Agis = new AgisLibray().init;
