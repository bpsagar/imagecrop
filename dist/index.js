'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discover = exports.create = undefined;

require('./sass/style.scss');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _imagecrop = require('./imagecrop');

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
        y2: '[data-imagecrop-y2="' + id + '"]',
        file: '[data-imagecrop-file="' + id + '"]'
      }
    });
  });
};