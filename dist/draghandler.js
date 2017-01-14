'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

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