goog.provide('haodev.tex');
/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * Copyright 2014, 2015 Yuhao Ma
 */

goog.require('goog.dom');


/**
 * Converts all <eq> tags into latex expressions. It takes the calculated font
 * size and color of the <eq> tag.
 * @param {string=} opt_query The query to look for, defaults to all eq tags
 * @param {Element=} opt_container Only look inside this element, if provided.
 */
haodev.tex.convertEquations = function(opt_query, opt_container) {
  var container = opt_container || document;
  var elements = container.querySelectorAll(opt_query || 'eq');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var formula = goog.dom.getTextContent(element).trim();
    var fontSizeString = window.getComputedStyle(element).fontSize;
    var fontSize = fontSizeString.substring(0, fontSizeString.length - 2);
    var colorString = haodev.tex.hexString_(
        window.getComputedStyle(element).color);
    var imageTag = haodev.tex.equation(formula, fontSize, colorString);
    imageTag.onload = goog.bind(haodev.tex.onLoaded_, imageTag, element);
    goog.dom.insertSiblingAfter(imageTag, element);
  }
};


/**
 * Converts a string in the format rgb(r, g, b) or 
 * rgba(r, g, b, a) into a hex string.
 * @param {string} colorString the color string
 * @return {string} The hex string.
 * @private
 */
haodev.tex.hexString_ = function(colorString) {
  var colorRegex = /^rgba?\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*(,\s*([0-9]+\.?[0-9]*)\s*)?\)$/;
  var matches = colorRegex.exec(colorString);
  var r = parseInt(matches[1], 10) & 0xFF;
  var g = parseInt(matches[2], 10) & 0xFF;
  var b = parseInt(matches[3], 10) & 0xFF;
  var a = (matches[4] && matches[5])
      ? Math.floor(255 * parseFloat(matches[5]))
      : 255;
  return haodev.tex.hex_(a) + haodev.tex.hex_(r) + haodev.tex.hex_(g)
      + haodev.tex.hex_(b);
};


/**
 * Converts a positive integer < 256 into two hex digits.
 * @param {number} num The positive integer < 256 to convert
 * @return {string}
 * @private
 */
haodev.tex.hex_ = function(num) {
  var str = num.toString(16);
  return (str.length == 1 ? '0' : '') + str;
};


/** @type {string} */
haodev.tex.path_ = 'http://texloader.herokuapp.com/tex?';


/**
 * Builds an <img> tag out of the given formula, size, and color.
 * @param {string} formula
 * @param {string|number} fontSize
 * @param {string} color
 * @return {!Element}
 */
haodev.tex.equation = function(formula, fontSize, color) {
  var query = 'formula=' + encodeURIComponent(formula) + '&size='
      + encodeURIComponent(String(fontSize)) + '&color=' + color;
  return goog.dom.createDom('img', {
    'className': 'tex-img',
    'src': haodev.tex.path_ + query
  });
};


/**
 * Called when an image is loaded.
 * @param {!Element} eqElement
 * @private
 */
haodev.tex.onLoaded_ = function(eqElement) {
  goog.dom.removeNode(eqElement);
};
