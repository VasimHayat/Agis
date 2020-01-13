// export class Agis {
//     nodes: Array<any>;
//     constructor(parameter: any, context?: any) {
//         if (!(this instanceof Agis)) {
//             return new Agis(parameter, context);
//         }
//         if (parameter instanceof Agis) {
//             return parameter;
//         }
//         if (typeof parameter === 'string') {
//             parameter = this.select(parameter, context);
//         }
//         // If we're referring a specific node as in on('click', function(){ u(this) })
//         // or the select() function returned a single node such as in '#id'
//         if (parameter && parameter.nodeName) {
//             parameter = [parameter];
//         }
//         // Convert to an array, since there are many 'array-like' stuff in js-land
//         this.nodes = this.slice(parameter);
//     }
//     select = (parameter: any, context: any) => {
//         // Allow for spaces before or after
//         parameter = parameter.replace(/^\s*/, '').replace(/\s*$/, '');
//         if (/^</.test(parameter)) {
//             return this.generate(parameter);
//         }
//         return (context || document).querySelectorAll(parameter);
//     }
//     slice = (pseudo: any) => {
//         // Check that it's not a valid object
//         if (!pseudo ||
//             pseudo.length === 0 ||
//             typeof pseudo === 'string' ||
//             pseudo.toString() === '[object Function]') return [];
//         // Accept also a u() object (that has .nodes)
//         return pseudo.length ? [].slice.call(pseudo.nodes || pseudo) : [pseudo];
//     };
//     generate = (html: any) => {
//         // Table elements need to be child of <table> for some f***ed up reason
//         if (/^\s*<tr[> ]/.test(html)) {
//             return new Agis(document.createElement('table')).html(html).children().children().nodes;
//         } else if (/^\s*<t(h|d)[> ]/.test(html)) {
//             return new Agis(document.createElement('table')).html(html).children().children().children().nodes;
//         } else if (/^\s*</.test(html)) {
//             return new Agis(document.createElement('div')).html(html).children().nodes;
//         } else {
//             return document.createTextNode(html);
//         }
//     };
//     html = (text: any) => {
//         // Needs to check undefined as it might be ""
//         if (text === undefined) {
//             return this.first().innerHTML || '';
//         }
//         // If we're attempting to set some text
//         // Loop through all the nodes
//         return this.each((node: any) => {
//             // Set the inner html to the node
//             node.innerHTML = text;
//         });
//     };
//     first = () => {
//         return this.nodes[0] || false;
//     }
//     each = (callback: Function) => {
//         // By doing callback.call we allow "this" to be the context for
//         // the callback (see http://stackoverflow.com/q/4065353 precisely)
//         this.nodes.forEach(callback.bind(this));
//         return this;
//     }
//     empty = () => {
//         return this.each((node: any) => {
//             while (node.firstChild) {
//                 node.removeChild(node.firstChild);
//             }
//         });
//     }
//     // .filter(selector)
//     // Delete all of the nodes that don't pass the selector
//     filter = (selector: any) => {
//         // The default function if it's a CSS selector
//         // Cannot change name to 'selector' since it'd mess with it inside this fn
//         let callback = (node: any) => {
//             // Make it compatible with some other browsers
//             node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;
//             // Check if it's the same element (or any element if no selector was passed)
//             return node.matches(selector || '*');
//         };
//         // filter() receives a function as in .filter(e => u(e).children().length)
//         if (typeof selector === 'function') callback = selector;
//         // filter() receives an instance of Umbrella as in .filter(u('a'))
//         if (selector instanceof Agis) {
//             callback = function (node) {
//                 return (selector.nodes).indexOf(node) !== -1;
//             };
//         }
//         // Just a native filtering function for ultra-speed
//         return new Agis(this.nodes.filter(callback));
//     };
//     // Find all the nodes children of the current ones matched by a selector
//     find = (selector: any) => {
//         return this.map((node: any) => {
//             return new Agis(selector || '*', node);
//         });
//     }
//     map = (callback: Function) => {
//         return callback ? new Agis(this.array(callback)).unique() : this;
//     }
//     // Merge all of the nodes that the callback return into a simple array
//     array = (callback: Function) => {
//         callback = callback;
//         var self = this;
//         return this.nodes.reduce(function (list, node, i) {
//             var val;
//             if (callback) {
//                 val = callback.call(self, node, i);
//                 if (!val) val = false;
//                 if (typeof val === 'string') val = new Agis(val);
//                 if (val instanceof Agis) val = val.nodes;
//             } else {
//                 val = node.innerHTML;
//             }
//             return list.concat(val !== false ? val : []);
//         }, []);
//     }
//     // Removed duplicated nodes, used for some specific methods
//     unique = () => {
//         return new Agis(this.nodes.reduce(function (clean, node) {
//             var istruthy = node !== null && node !== undefined && node !== false;
//             return (istruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
//         }, []));
//     };
//     // Add class(es) to the matched nodes
//     addClass = (args: any) => {
//         return this.eacharg(args, (el: any, name: any) => {
//             el.classList.add(name);
//         });
//     }
//     // Loop through the combination of every node and every argument passed
//     eacharg = (args: any, callback: Function) => {
//         return this.each((node: any, i: number) => {
//             this.args(args, node, i).forEach((arg: any) => {
//                 // Perform the callback for this node
//                 // By doing callback.call we allow "this" to be the context for
//                 // the callback (see http://stackoverflow.com/q/4065353 precisely)
//                 callback.call(this, node, arg);
//             }, this);
//         });
//     }
//     // Normalize the arguments to an array of strings
//     // Allow for several class names like "a b, c" and several parameters
//     args = (args: any, node: any, i: number) => {
//         if (typeof args === 'function') {
//             args = args(node, i);
//         }
//         // First flatten it all to a string http://stackoverflow.com/q/22920305
//         // If we try to slice a string bad things happen: ['n', 'a', 'm', 'e']
//         if (typeof args !== 'string') {
//             args = this.slice(args).map(this.str(node, i));
//         }
//         // Then convert that string to an array of not-null strings
//         return args.toString().split(/[\s,]+/).filter((e: any) => {
//             return e.length;
//         });
//     }
//     str = (node: any, i: any) => {
//         return (arg: any) => {
//             // Call the function with the corresponding nodes
//             if (typeof arg === 'function') {
//                 return arg.call(this, node, i);
//             }
//             // From an array or other 'weird' things
//             return arg.toString();
//         };
//     }
//     removeClass = (args: any) => {
//         // Loop the combination of each node with each argument
//         return this.eacharg(args, (el: any, name: any) => {
//             // Remove the class using the native method
//             el.classList.remove(name);
//         });
//     };
// }
