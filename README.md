TexLoader
=========

An api to turn a tex expression into a graphic.

Inside html, all data inside of the <eq> tags are converted into tex images.
Font size is preserved by using the browser calculated font-size.

To run, simply load the library (closure or non closure depending on your usage)
and run

```js
haodev.tex.convertEquations();
```

to convert all the <eq> tags into the corresponding images.

Converting all equations
------------------------
You can convert all equations inside an element into a tex representation.
```js
haodev.tex.convertEquations('span.eq', document.getElementById('container'));
```
The above code finds all span elements with the class name "eq" inside the 
element with the id "container" and converts them into tex equations.

Generating an image programatically
-----------------------------------
Similary, you can generate an image by hand:
```js
haodev.tex.equation('x^{y+z}', 25);
```
The above code returns an image that will generate the given equation.

Calling the service directly
----------------------------
Finally, you can make an HTTP GET request to http://texloader.herokuapp.com/tex
to download the image. You must include the following url parameters:
- formula: The urlencoded formula of the tex equation
- size: The font size of the formula
The returned tex equation will be in PNG format.

