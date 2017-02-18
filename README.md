# Calculator-js #
[![Build Status](https://travis-ci.org/eliasem/calculator-js.svg?branch=master)](https://travis-ci.org/eliasem/calculator-js)

The purpose of Calculator-js is to create a HTML calculator that can be used inside any HTML page. It should resemble 
calculator applications on operating systems except embeded inside a website.

Jquery is the only dependency for Calculator-js. Jquery is packed inside Calculator-js.

## Demo ##
The demo site is located here: http://eliasem.github.io/calculator-js/

## How to use ##

Create a new ```Calculator``` and append ```$el``` to the DOM. 

```javascript
$(document).ready(function(){
	$('body').append(new Calculator().$el);
});
```

## License ##

MIT © [Elias El-Moujaber](https://github.com/eliasem)