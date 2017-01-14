
/**
 * Move the cropbox by an offset value
 * @param  {Object} cropbox contains x1, y1, x2, y2, imageWidth and imageHeight
 * @param  {Object} offset  x and y offset
 * @return {Object}         x1, y1, x2, y2 after it is moved
 */
export const move = (cropbox, offset) => {
  let { x1, y1, x2, y2, imageWidth, imageHeight } = cropbox
  let x = offset.x * 100 / imageWidth
  let y = offset.y * 100 / imageHeight

  x1 += x
  y1 += y
  x2 += x
  y2 += y

  if (x1 < 0) {
    // When the box is moved outside the left boundary
    var xOffset = - x1
    x1 = 0
    x2 += xOffset
  }

  if (y1 < 0) {
    // When the box is moved outside the top boundary
    var yOffset = - y1
    y1 = 0
    y2 += yOffset
  }

  if (x2 > 100) {
    // When the box is moved outside the right boundary
    var xOffset = x2 - 100
    x2 = 100
    x1 -= xOffset
  }

  if (y2 > 100) {
    // When the box is moved outside the bottom boundary
    var yOffset = y2 - 100
    y2 = 100
    y1 -= yOffset
  }

  return { ...cropbox, x1, y1, x2, y2 }
}

/**
 * Resize the cropbox by an offset value
 * @param  {Object} cropbox contains x1, y1, x2, y2, imageWidth and imageHeight
 * @param  {Object} offset  x and y offset
 * @return {Object}         x1, y1, x2, y2 after it is moved
 */
export const resize = (cropbox, offset) => {
  let { x1, y1, x2, y2, imageWidth, imageHeight, aspectRatio } = cropbox
  let x = offset.x * 100 / imageWidth
  let y = offset.y * 100 / imageHeight

  x2 += x
  y2 += y

  if (x2 > 100) {
    // When the box is resized outside the right boundary
    x2 = 100
  }

  if (y2 > 100) {
    // When the box is resized outside the bottom boundary
    y2 = 100
  }

  if (aspectRatio) {
    // If an aspect ratio is specified adjust the x2 and y2 coordinates
    let width = (x2 - x1) * imageWidth / 100
    let height = width / aspectRatio
    y2 = y1 + (height * 100 / imageHeight)

    if (y2 > 100) {
      y2 = 100
      height = (y2 - y1) * imageHeight / 100
      width = height * aspectRatio
    }

    x2 = x1 + (width * 100 / imageWidth)
    y2 = y1 + (height * 100 / imageHeight)
  }

  if (x2 < x1) {
    // x2 coordinate cannot be less than x1
    x2 = x1
  }

  if (y2 < y1) {
    // y2 coordinate cannot be less than y1
    y2 = y1
  }

  return { ...cropbox, x1, y1, x2, y2 }
}
