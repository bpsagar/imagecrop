'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _draghandler = require('./draghandler');

var _draghandler2 = _interopRequireDefault(_draghandler);

var _cropbox = require('./cropbox');

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
      var forceDefault = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var cropbox = {
        imageWidth: $image.width(),
        imageHeight: $image.height(),
        aspectRatio: options.aspectRatio
      };
      var fields = ['x1', 'y1', 'x2', 'y2'];
      fields.map(function (field) {
        var value = _defaults2.default.cropbox[field];
        if (options.inputs[field] && !forceDefault) {
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
      return [$container, $cropbox, $resizehandle];
    }

    /**
     * Position the cropbox
     * @param  {jQuery element} $cropbox image's cropbox element
     * @param  {Object}         cropbox  cropbox properties
     */

  }, {
    key: 'positionCropbox',
    value: function positionCropbox($cropbox, $image, cropbox) {
      var bpX = -(cropbox.x1 * cropbox.imageWidth / 100);
      var bpY = -(cropbox.y1 * cropbox.imageHeight / 100);
      $cropbox.css({
        left: cropbox.x1 + '%',
        top: cropbox.y1 + '%',
        right: 100 - cropbox.x2 + '%',
        bottom: 100 - cropbox.y2 + '%',
        backgroundImage: 'url(' + $image.attr('src') + ')',
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
        if (field == 'file') {
          continue;
        }
        if (options.inputs[field]) {
          var value = cropbox[field];
          var factor = Math.pow(10, options.precision);
          value = Math.round(value * factor) / factor;
          if (isNaN(value)) {
            value = 0;
          }
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
      this.positionCropbox($cropbox, $image, cropbox);
      this.updateFields(cropbox, options);
      var cropboxDragHandler = new _draghandler2.default($cropbox, function (offset) {
        cropbox = (0, _cropbox.move)(cropbox, offset);
        _this2.positionCropbox($cropbox, $image, cropbox);
        _this2.updateFields(cropbox, options);
      });
      cropboxDragHandler.init();
      var resizehandleDragHandler = new _draghandler2.default($resizehandle, function (offset) {
        console.log(offset);
        cropbox = (0, _cropbox.resize)(cropbox, offset);
        _this2.positionCropbox($cropbox, $image, cropbox);
        _this2.updateFields(cropbox, options);
      });
      resizehandleDragHandler.init();

      if (options.inputs.file && (0, _jquery2.default)(options.inputs.file).length) {
        (0, _jquery2.default)(document).on('change', options.inputs.file, function (e) {
          if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              $image.attr('src', e.target.result);
              $image[0].addEventListener('load', function () {
                cropbox = _this2.getInitCropbox($image, options, true);
                console.log(cropbox);
                cropbox = (0, _cropbox.move)(cropbox, { x: 0, y: 0 });
                cropbox = (0, _cropbox.resize)(cropbox, { x: 0, y: 0 });
                _this2.positionCropbox($cropbox, $image, cropbox);
                _this2.updateFields(cropbox, options);
              });
            };
            reader.readAsDataURL(e.target.files[0]);
          }
        });
      }
    }
  }]);

  return ImageCrop;
}();

exports.default = ImageCrop;