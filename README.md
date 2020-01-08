You probably need awesome CSS (like [Picnic CSS](http://picnicss.com/)) and a lightweight, modern and performant javascript library. This does:

- DOM traversal (selector, filter, find, each, etc.)
- DOM editing (classes & attributes, html, before, etc.)
- Event handling

A couple of simple examples:

```js
// Simple events like jQuery
u("button").on('click', e => {
  alert("Hello world");
});

// Handle form submissions
u('form.login').handle('submit', async e => {
  const user = await fetch('/login', {
    method: 'POST', body: new FormData(e.target)
  }).then(res => res.json());
  window.href = '/user/' + user.id;
});
```


## Getting started

There are few ways to use Umbrella JS:


### Play with it

Instead of installing it, you can just play with it in JSFiddle:

[**Try on JSFiddle**](https://jsfiddle.net/franciscop/mwpcqddj/)


### Use a CDN

jsdelivr.com is an awesome OSS service that hosts many open source projects so you don't need to even download the code:

```js
<script src="https://cdn.jsdelivr.net/npm/umbrellajs"></script>
```


### Install with `npm`

Using npm is a front-end package manager that makes it super-easy to add a new package:

```
npm install umbrellajs
```


### Module support

If you use a front-end module bundler like Webpack or Browserify, `u` is exposed as CommonJS exports. You can pull them in like so:

```js
// ES Modules/Webpack/etc
import u from 'umbrellajs';

// Commonjs
var u = require('umbrellajs');
```

### ES Module support

If you use an ES Module, `u` and `ajax` are exposed as ES Module exports.
You can pull them in like so:

```
import u from 'umbrellajs/umbrella.esm.js'
```

### Download it

If you like it or prefer to try it locally, just download `umbrella.min.js`:

[**Download Umbrella JS**](https://raw.githubusercontent.com/franciscop/umbrella/master/umbrella.min.js)

Add it to your project:

```html
<script src="umbrella.min.js"></script>
```



## Support: IE11+

Current usage for IE 10- is under 1% for each version (8, 9, 10) so it's not Umbrella's mission to support this. However, those extra seconds gained from loading faster on mobile might be even bigger than that percentage. You should probably test it.

Known, wontfix IE10- bugs:

- [Invalid target element for this operation](http://caniuse.com/#feat=insertadjacenthtml) when trying to use any of these methods on **table**, **tbody**, **thead** or **tr**. Check [the issue on StackOverflow](http://stackoverflow.com/q/8771498/938236). For those elements, this gives an error:
  - `.before()`
  - `.after()`
  - `.append()`
  - `.prepend()`


- [Unable to get property ____ of undefined or null reference](http://caniuse.com/#search=classList) since classList is not supported by IE9-. Just use `polyfill.js` and they will work. Affects:
  - `.addClass()`
  - `.removeClass()`
  - `.hasClass()`
  - `.toggleClass()`

- Choosing multiple options within `<select>` doesn't work with IE10- when using `.serialize()` (and thus `.ajax()`). No idea why, but it's a really corner case. Affects:
  - `.ajax()`
  - `.serialize()`



## Alternatives

- [jQuery](https://jquery.com/)

- [Zepto](http://zeptojs.com/)

- [Bliss](http://blissfuljs.com/)

- [NodeList](https://github.com/eorroe/NodeList.js)

- [Micro Framework (many)](http://microjs.com/)
