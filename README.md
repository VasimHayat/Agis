You probably need awesome and lightweight, modern and performant javascript library. This does:

- DOM traversal (selector, filter, find, each, etc.)
- DOM editing (classes & attributes, html, before, etc.)

A couple of simple examples:

```js
// Simple add/remove class like jQuery
Agis("button").addClass("red")

Agis("button").removeClass("red")

// Handle parent/child node
Agis('#mydiv').parents().forEach(function(parentNode){
    // todo
} )
```


## Getting started

There are few ways to use Agis JS:


### Play with it

Instead of installing it, you can just play with it in JSFiddle:

[**Try on JSFiddle**](https://jsfiddle.net/agis/)

  

### Install with `npm`

Using npm is a front-end package manager that makes it super-easy to add a new package:

```
npm i agis
``` 

### Download it

If you like it or prefer to try it locally, just download `agis.js`:

[**Download Agis JS**] (https://raw.githubusercontent.com/VasimHayat/Agis/master/dist/agis.js)

Add it to your project:

```html
<script src="agis.js"></script>
```



## Support: IE10+

Current usage for IE 10+
 



## Alternatives

- [jQuery](https://jquery.com/)

- [Zepto](http://zeptojs.com/)

- [Bliss](http://blissfuljs.com/)

- [NodeList](https://github.com/eorroe/NodeList.js)

- [Micro Framework (many)](http://microjs.com/)
