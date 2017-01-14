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