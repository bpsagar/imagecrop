(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["imagecrop"] = factory(require("jQuery"));
	else
		root["imagecrop"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
	exports.ImageCrop = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _draghandler = __webpack_require__(2);
	
	var _draghandler2 = _interopRequireDefault(_draghandler);
	
	var _defaults = __webpack_require__(3);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _constants = __webpack_require__(4);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	__webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ImageCrop = exports.ImageCrop = function () {
	  function ImageCrop(id, options) {
	    _classCallCheck(this, ImageCrop);
	
	    this.id = id;
	    this.options = options || {};
	    this.$image = (0, _jquery2.default)('' + id);
	    this.options = _jquery2.default.extend(_defaults2.default, this.options);
	    this.initCropbox();
	
	    // Initialize everything once the image has been loaded
	    var img = document.querySelector(id);
	    if (img.complete) {
	      this.init();
	    } else {
	      img.addEventListener('load', this.init.bind(this));
	    }
	  }
	
	  _createClass(ImageCrop, [{
	    key: 'initCropbox',
	    value: function initCropbox() {
	      var _this = this;
	
	      this.cropbox = {};
	      var fields = ['x1', 'y1', 'x2', 'y2'];
	      fields.map(function (field) {
	        var value = _defaults2.default.cropbox[field];
	        if (_this.options.inputs[field]) {
	          value = parseFloat((0, _jquery2.default)(_this.options.inputs[field]).val(), 10) || value;
	        }
	        _this.cropbox[field] = value;
	      });
	    }
	  }, {
	    key: 'addDOM',
	    value: function addDOM() {
	      this.$image.wrap('<div class="' + _constants2.default.containerClass + '"></div>');
	      this.$container = this.$image.closest('.' + _constants2.default.containerClass);
	      this.$container.append('<div class="' + _constants2.default.overlayClass + '"></div>');
	      this.$container.append('<div class="' + _constants2.default.cropboxClass + '"></div>');
	      this.$cropbox = this.$container.find('.' + _constants2.default.cropboxClass);
	      this.$cropbox.append('<div class="' + _constants2.default.resizehandleClass + '">&varr;</div>');
	      this.$resizehandle = this.$cropbox.find('.' + _constants2.default.resizehandleClass);
	      this.$cropbox.css({ backgroundImage: 'url(' + this.$image.attr('src') + ')' });
	    }
	  }, {
	    key: 'positionCropbox',
	    value: function positionCropbox() {
	      var width = this.$image.width();
	      var height = this.$image.height();
	      var bpX = -(this.cropbox.x1 * width / 100);
	      var bpY = -(this.cropbox.y1 * height / 100);
	      this.$cropbox.css({
	        left: this.cropbox.x1 + '%',
	        top: this.cropbox.y1 + '%',
	        right: 100 - this.cropbox.x2 + '%',
	        bottom: 100 - this.cropbox.y2 + '%',
	        backgroundPosition: bpX + 'px ' + bpY + 'px',
	        backgroundSize: width + 'px ' + height + 'px'
	      });
	      this.updateFields();
	    }
	  }, {
	    key: 'moveCropbox',
	    value: function moveCropbox(offset) {
	      var x = offset.x * 100 / this.$image.width();
	      var y = offset.y * 100 / this.$image.height();
	      this.cropbox.x1 += x;
	      this.cropbox.y1 += y;
	      this.cropbox.x2 += x;
	      this.cropbox.y2 += y;
	
	      if (this.cropbox.x1 < 0) {
	        var xOffset = -this.cropbox.x1;
	        this.cropbox.x1 = 0;
	        this.cropbox.x2 += xOffset;
	      }
	
	      if (this.cropbox.y1 < 0) {
	        var yOffset = -this.cropbox.y1;
	        this.cropbox.y1 = 0;
	        this.cropbox.y2 += yOffset;
	      }
	
	      if (this.cropbox.x2 > 100) {
	        var xOffset = this.cropbox.x2 - 100;
	        this.cropbox.x2 = 100;
	        this.cropbox.x1 -= xOffset;
	      }
	
	      if (this.cropbox.y2 > 100) {
	        var yOffset = this.cropbox.y2 - 100;
	        this.cropbox.y2 = 100;
	        this.cropbox.y1 -= yOffset;
	      }
	
	      this.positionCropbox();
	    }
	  }, {
	    key: 'resizeCropbox',
	    value: function resizeCropbox(offset) {
	      var x = offset.x * 100 / this.$image.width();
	      var y = offset.y * 100 / this.$image.height();
	      this.cropbox.x2 += x;
	      this.cropbox.y2 += y;
	
	      if (this.cropbox.x2 > 100) {
	        this.cropbox.x2 = 100;
	      }
	
	      if (this.cropbox.y2 > 100) {
	        this.cropbox.y2 = 100;
	      }
	
	      this.positionCropbox();
	    }
	  }, {
	    key: 'updateFields',
	    value: function updateFields() {
	      for (var field in this.options.inputs) {
	        if (this.options.inputs[field]) {
	          var value = this.cropbox[field];
	          var factor = Math.pow(10, this.options.precision);
	          value = Math.round(value * factor) / factor;
	          (0, _jquery2.default)(this.options.inputs[field]).val(value);
	        }
	      }
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      this.addDOM();
	      this.positionCropbox();
	      this.cropboxDragHandler = new _draghandler2.default(this.$cropbox, this.moveCropbox.bind(this));
	      this.cropboxDragHandler.init();
	      this.resizehandleDragHandler = new _draghandler2.default(this.$resizehandle, this.resizeCropbox.bind(this));
	      this.resizehandleDragHandler.init();
	    }
	  }]);

	  return ImageCrop;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(1);
	
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
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  precision: 4,
	  cropbox: { x1: 0, y1: 0, x2: 50, y2: 50 },
	  inputs: {}
	};

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".imagecrop {\n  position: relative;\n  display: inline-block;\n  font-size: 0; }\n  .imagecrop .overlay {\n    position: absolute;\n    background-color: rgba(0, 0, 0, 0.8);\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0; }\n  .imagecrop .cropbox {\n    position: absolute;\n    cursor: move; }\n    .imagecrop .cropbox:after {\n      content: '';\n      position: absolute;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      border: 1px dashed #FFF; }\n    .imagecrop .cropbox .resizehandle {\n      position: absolute;\n      right: 0;\n      bottom: 0;\n      width: 30px;\n      height: 30px;\n      line-height: 30px;\n      font-size: 24px;\n      text-align: center;\n      color: #FFF;\n      background-color: rgba(0, 0, 0, 0.3);\n      border-radius: 50%;\n      z-index: 1;\n      cursor: se-resize;\n      margin: 2px;\n      transform: rotate(-45deg); }\n      .imagecrop .cropbox .resizehandle:hover {\n        background-color: rgba(0, 0, 0, 0.6); }\n", ""]);
	
	// exports


/***/ },
/* 7 */
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
/* 8 */
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.umd.js.map