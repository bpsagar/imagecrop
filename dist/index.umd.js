(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["imagecrop"] = factory(require("jQuery"));
	else
		root["imagecrop"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.discover = exports.create = undefined;
	
	__webpack_require__(1);
	
	var _jquery = __webpack_require__(5);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _imagecrop = __webpack_require__(6);
	
	var _imagecrop2 = _interopRequireDefault(_imagecrop);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var create = exports.create = function create(id, options) {
	  return new _imagecrop2.default(id, options);
	};
	
	var discover = exports.discover = function discover() {
	  (0, _jquery2.default)('[data-imagecrop]').each(function (index, image) {
	    var id = (0, _jquery2.default)(image).data('imagecrop');
	    var aspectRatio = parseFloat((0, _jquery2.default)(image).data('imagecrop-aspectratio'), 10) || null;
	    var precision = parseFloat((0, _jquery2.default)(image).data('imagecrop-precision'), 10) || null;
	    create('[data-imagecrop="' + id + '"', {
	      aspectRatio: aspectRatio,
	      precision: precision,
	      inputs: {
	        x1: '[data-imagecrop-x1="' + id + '"]',
	        y1: '[data-imagecrop-y1="' + id + '"]',
	        x2: '[data-imagecrop-x2="' + id + '"]',
	        y2: '[data-imagecrop-y2="' + id + '"]'
	      }
	    });
	  });
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".imagecrop {\n  position: relative;\n  display: inline-block;\n  font-size: 0; }\n  .imagecrop .overlay {\n    position: absolute;\n    background-color: rgba(0, 0, 0, 0.7);\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0; }\n  .imagecrop .cropbox {\n    position: absolute;\n    cursor: move; }\n    .imagecrop .cropbox:after {\n      content: '';\n      position: absolute;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      border: 1px dashed #FFF; }\n    .imagecrop .cropbox .resizehandle {\n      position: absolute;\n      right: 0px;\n      bottom: 0px;\n      width: 10px;\n      height: 10px;\n      background-color: #FFF;\n      border-radius: 50%;\n      z-index: 1;\n      cursor: se-resize;\n      transform: translateX(50%) translateY(50%); }\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(5);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _defaults = __webpack_require__(8);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _draghandler = __webpack_require__(9);
	
	var _draghandler2 = _interopRequireDefault(_draghandler);
	
	var _cropbox = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ImageCrop = function () {
	  function ImageCrop(id, options) {
	    var _this = this;
	
	    _classCallCheck(this, ImageCrop);
	
	    var $image = (0, _jquery2.default)('' + id);
	    options = options || {};
	    options = _jquery2.default.extend(_defaults2.default, options);
	
	    // Initialize everything once the image has been loaded
	    var img = document.querySelector(id);
	    if (img.complete) {
	      this.init($image, options);
	    } else {
	      img.addEventListener('load', function () {
	        _this.init($image, options);
	      });
	    }
	  }
	
	  /**
	   * Returns the initial x1, y1, x2, y2, image width, height and aspect ratio
	   * @param  {jQuery element} $image  image element
	   * @param  {Object}         options cropbox options
	   * @return {Object}         initial cropbox properties
	   */
	
	
	  _createClass(ImageCrop, [{
	    key: 'getInitCropbox',
	    value: function getInitCropbox($image, options) {
	      var cropbox = {
	        imageWidth: $image.width(),
	        imageHeight: $image.height(),
	        aspectRatio: options.aspectRatio
	      };
	      var fields = ['x1', 'y1', 'x2', 'y2'];
	      fields.map(function (field) {
	        var value = _defaults2.default.cropbox[field];
	        if (options.inputs[field]) {
	          value = parseFloat((0, _jquery2.default)(options.inputs[field]).val(), 10) || value;
	        }
	        cropbox[field] = value;
	      });
	      return cropbox;
	    }
	
	    /**
	     * Adding necessary DOM
	     * @param {jQuery element} $image image element
	     */
	
	  }, {
	    key: 'addDOM',
	    value: function addDOM($image) {
	      $image.wrap('<div class="' + _constants2.default.containerClass + '"></div>');
	      var $container = $image.closest('.' + _constants2.default.containerClass);
	      $container.append('<div class="' + _constants2.default.overlayClass + '"></div>');
	      $container.append('<div class="' + _constants2.default.cropboxClass + '"></div>');
	      var $cropbox = $container.find('.' + _constants2.default.cropboxClass);
	      $cropbox.append('<div class="' + _constants2.default.resizehandleClass + '"></div>');
	      var $resizehandle = $cropbox.find('.' + _constants2.default.resizehandleClass);
	      $cropbox.css({ backgroundImage: 'url(' + $image.attr('src') + ')' });
	      return [$container, $cropbox, $resizehandle];
	    }
	
	    /**
	     * Position the cropbox
	     * @param  {jQuery element} $cropbox image's cropbox element
	     * @param  {Object}         cropbox  cropbox properties
	     */
	
	  }, {
	    key: 'positionCropbox',
	    value: function positionCropbox($cropbox, cropbox) {
	      var bpX = -(cropbox.x1 * cropbox.imageWidth / 100);
	      var bpY = -(cropbox.y1 * cropbox.imageHeight / 100);
	      $cropbox.css({
	        left: cropbox.x1 + '%',
	        top: cropbox.y1 + '%',
	        right: 100 - cropbox.x2 + '%',
	        bottom: 100 - cropbox.y2 + '%',
	        backgroundPosition: bpX + 'px ' + bpY + 'px',
	        backgroundSize: cropbox.imageWidth + 'px ' + cropbox.imageHeight + 'px'
	      });
	    }
	
	    /**
	     * Update the cropbox properties to their input elements
	     * @param  {Object} cropbox cropbox properties
	     * @param  {Object} options cropbox options
	     */
	
	  }, {
	    key: 'updateFields',
	    value: function updateFields(cropbox, options) {
	      for (var field in options.inputs) {
	        if (options.inputs[field]) {
	          var value = cropbox[field];
	          var factor = Math.pow(10, options.precision);
	          value = Math.round(value * factor) / factor;
	          (0, _jquery2.default)(options.inputs[field]).val(value);
	        }
	      }
	    }
	  }, {
	    key: 'init',
	    value: function init($image, options) {
	      var _this2 = this;
	
	      var cropbox = this.getInitCropbox($image, options);
	
	      var _addDOM = this.addDOM($image),
	          _addDOM2 = _slicedToArray(_addDOM, 3),
	          $container = _addDOM2[0],
	          $cropbox = _addDOM2[1],
	          $resizehandle = _addDOM2[2];
	
	      cropbox = (0, _cropbox.resize)(cropbox, { x: 0, y: 0 });
	      this.positionCropbox($cropbox, cropbox);
	      this.updateFields(cropbox, options);
	      var cropboxDragHandler = new _draghandler2.default($cropbox, function (offset) {
	        cropbox = (0, _cropbox.move)(cropbox, offset);
	        _this2.positionCropbox($cropbox, cropbox);
	        _this2.updateFields(cropbox, options);
	      });
	      cropboxDragHandler.init();
	      var resizehandleDragHandler = new _draghandler2.default($resizehandle, function (offset) {
	        cropbox = (0, _cropbox.resize)(cropbox, offset);
	        _this2.positionCropbox($cropbox, cropbox);
	        _this2.updateFields(cropbox, options);
	      });
	      resizehandleDragHandler.init();
	    }
	  }]);
	
	  return ImageCrop;
	}();
	
	exports.default = ImageCrop;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  containerClass: 'imagecrop',
	  overlayClass: 'overlay',
	  cropboxClass: 'cropbox',
	  resizehandleClass: 'resizehandle'
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  precision: 4,
	  aspectRatio: null,
	  cropbox: { x1: 0, y1: 0, x2: 100, y2: 100 },
	  inputs: {}
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(5);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DragHandler = function () {
	  /**
	   * Create a drag handler for an element. The callback function is passed with
	   * the offset when it is moved
	   * @param  {jQuery}   element  element on which the drag events are handled
	   * @param  {Function} callback function called when the element is dragged
	   */
	  function DragHandler(element, callback) {
	    _classCallCheck(this, DragHandler);
	
	    this.$element = (0, _jquery2.default)(element);
	    this.callback = callback;
	    this.clicked = false;
	    this.cursor = { x: null, y: null };
	  }
	
	  /**
	   * handle drag start events
	   * @param  {event} e mousedown or touchstart event object
	   */
	
	
	  _createClass(DragHandler, [{
	    key: 'handleDragStart',
	    value: function handleDragStart(e) {
	      this.clicked = true;
	      this.cursor = { x: e.clientX, y: e.clientY };
	    }
	
	    /**
	     * handle drag events
	     * @param  {event} e mousemove or touchmove event object
	     */
	
	  }, {
	    key: 'handleDrag',
	    value: function handleDrag(e) {
	      if (!this.clicked) {
	        return;
	      }
	      var offset = { x: e.clientX - this.cursor.x, y: e.clientY - this.cursor.y };
	      this.cursor = { x: e.clientX, y: e.clientY };
	      this.callback(offset);
	    }
	
	    /**
	     * handle drag end events
	     * @param  {event} e mouseup or touchend event object
	     */
	
	  }, {
	    key: 'handleDragEnd',
	    value: function handleDragEnd(e) {
	      if (!this.clicked) {
	        return;
	      }
	      var offset = { x: e.clientX - this.cursor.x, y: e.clientY - this.cursor.y };
	      this.clicked = false;
	      this.cursor = { x: null, y: null };
	      this.callback(offset);
	    }
	
	    /**
	     * initialize all the event handlers
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this = this;
	
	      // Drag start events
	      this.$element.on('mousedown', function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        _this.handleDragStart(e);
	      });
	      this.$element.on('touchstart', function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        _this.handleDragStart(e.touches[0]);
	      });
	
	      // Drag events
	      (0, _jquery2.default)(document).on('mousemove', function (e) {
	        e.preventDefault();
	        _this.handleDrag(e);
	      });
	      (0, _jquery2.default)(document).on('touchmove', function (e) {
	        e.preventDefault();
	        _this.handleDrag(e.touches[0]);
	      });
	
	      // Drag end events
	      (0, _jquery2.default)(document).on('mouseup', function (e) {
	        e.preventDefault();
	        _this.handleDragEnd(e);
	      });
	      (0, _jquery2.default)(document).on('touchend', function (e) {
	        e.preventDefault();
	        _this.handleDragEnd(e.changedTouches[0]);
	      });
	    }
	  }]);
	
	  return DragHandler;
	}();
	
	exports.default = DragHandler;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	/**
	 * Move the cropbox by an offset value
	 * @param  {Object} cropbox contains x1, y1, x2, y2, imageWidth and imageHeight
	 * @param  {Object} offset  x and y offset
	 * @return {Object}         x1, y1, x2, y2 after it is moved
	 */
	var move = exports.move = function move(cropbox, offset) {
	  var x1 = cropbox.x1,
	      y1 = cropbox.y1,
	      x2 = cropbox.x2,
	      y2 = cropbox.y2,
	      imageWidth = cropbox.imageWidth,
	      imageHeight = cropbox.imageHeight;
	
	  var x = offset.x * 100 / imageWidth;
	  var y = offset.y * 100 / imageHeight;
	
	  x1 += x;
	  y1 += y;
	  x2 += x;
	  y2 += y;
	
	  if (x1 < 0) {
	    // When the box is moved outside the left boundary
	    var xOffset = -x1;
	    x1 = 0;
	    x2 += xOffset;
	  }
	
	  if (y1 < 0) {
	    // When the box is moved outside the top boundary
	    var yOffset = -y1;
	    y1 = 0;
	    y2 += yOffset;
	  }
	
	  if (x2 > 100) {
	    // When the box is moved outside the right boundary
	    var xOffset = x2 - 100;
	    x2 = 100;
	    x1 -= xOffset;
	  }
	
	  if (y2 > 100) {
	    // When the box is moved outside the bottom boundary
	    var yOffset = y2 - 100;
	    y2 = 100;
	    y1 -= yOffset;
	  }
	
	  return _extends({}, cropbox, { x1: x1, y1: y1, x2: x2, y2: y2 });
	};
	
	/**
	 * Resize the cropbox by an offset value
	 * @param  {Object} cropbox contains x1, y1, x2, y2, imageWidth and imageHeight
	 * @param  {Object} offset  x and y offset
	 * @return {Object}         x1, y1, x2, y2 after it is moved
	 */
	var resize = exports.resize = function resize(cropbox, offset) {
	  var x1 = cropbox.x1,
	      y1 = cropbox.y1,
	      x2 = cropbox.x2,
	      y2 = cropbox.y2,
	      imageWidth = cropbox.imageWidth,
	      imageHeight = cropbox.imageHeight,
	      aspectRatio = cropbox.aspectRatio;
	
	  var x = offset.x * 100 / imageWidth;
	  var y = offset.y * 100 / imageHeight;
	
	  x2 += x;
	  y2 += y;
	
	  if (x2 > 100) {
	    // When the box is resized outside the right boundary
	    x2 = 100;
	  }
	
	  if (y2 > 100) {
	    // When the box is resized outside the bottom boundary
	    y2 = 100;
	  }
	
	  if (aspectRatio) {
	    // If an aspect ratio is specified adjust the x2 and y2 coordinates
	    var width = (x2 - x1) * imageWidth / 100;
	    var height = width / aspectRatio;
	    y2 = y1 + height * 100 / imageHeight;
	
	    if (y2 > 100) {
	      y2 = 100;
	      height = (y2 - y1) * imageHeight / 100;
	      width = height * aspectRatio;
	    }
	
	    x2 = x1 + width * 100 / imageWidth;
	    y2 = y1 + height * 100 / imageHeight;
	  }
	
	  if (x2 < x1) {
	    // x2 coordinate cannot be less than x1
	    x2 = x1;
	  }
	
	  if (y2 < y1) {
	    // y2 coordinate cannot be less than y1
	    y2 = y1;
	  }
	
	  return _extends({}, cropbox, { x1: x1, y1: y1, x2: x2, y2: y2 });
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.umd.js.map