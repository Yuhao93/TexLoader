var haodev = haodev || {};
haodev.tex = haodev.tex || {};


/**
 * Converts all <eq> tags into latex expressions. It takes the calculated font
 * size of the <eq> tag.
 * @param {Element=} container Only look inside this element, if provided.
 */
haodev.tex.convertEquations = function(container) {
  var lookInside = container || document;
  var elements = lookInside.getElementsByTagName('eq');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var formula = element.textContent.trim();
    var fontSizeString = getComputedStyle(element).fontSize;
    var fontSize = fontSizeString.substring(0, fontSizeString.length - 2);
    var imageTag = haodev.tex.equation(formula, fontSize);
    imageTag.onload = haodev.tex.onLoaded_.bind(imageTag, element);
    element.parentNode.insertBefore(imageTag, element.nextSibling);
  }
};


/** @type {string} */
haodev.tex.path_ = 'http://texloader.herokuapp.com/tex?';


/**
 * Builds an <img> tag out of the given formula and size.
 * @param {string} formula
 * @param {number|string} fontSize
 * @return {!Element}
 */
haodev.tex.equation = function(formula, fontSize) {
  var query = 'formula=' + encodeURIComponent(formula) + '&size='
      + encodeURIComponent(String(fontSize));
  var imgTag = document.createElement('img');
  imgTag.className = 'tex-img';
  imgTag.src = haodev.tex.path_ + query;
  return imgTag;
};


/**
 * Called when an image is loaded.
 * @param {!Element} eqElement
 * @private
 */
haodev.tex.onLoaded_ = function(eqElement) {
  eqElement.parentElement.removeChild(eqElement);
};
