TexLoader
=========

An api to turn a tex expression into a graphic.

Inside html, all data inside of the <eq> tags are converted into tex images.
Font size and color is preserved by using the browser calculated font-size and
color.

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
Similary, you can generate a tex image:
```js
haodev.tex.equation('x^{y+z}', 25, 'ffff0000');
```
The above code returns an image that will generate an equation with a red size
25 font.

Calling the service directly
----------------------------
Finally, you can make an HTTP GET request to http://texloader.herokuapp.com/tex
to download the image. You must include the following url parameters:
- formula: The urlencoded formula of the tex equation
- size: The font size of the formula
- color: The color of the text, aarrggbb hexadecimal string
The returned tex equation will be in PNG format.

License
-------

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Copyright 2014, 2015 Yuhao Ma
