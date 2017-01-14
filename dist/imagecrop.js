'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _draghandler = require('./draghandler');

var _draghandler2 = _interopRequireDefault(_draghandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageCrop = function () {
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

exports.default = ImageCrop;