import $ from 'jquery'
import constants from './constants'
import defaults from './defaults'
import DragHandler from './draghandler'
import { move, resize } from './cropbox'

export default class ImageCrop {
  constructor (id, options) {
    let $image = $(`${id}`)
    options = options || {}
    options = $.extend(defaults, options)

    // Initialize everything once the image has been loaded
    let img = document.querySelector(id)
    if (img.complete) {
      this.init($image, options)
    }
    else {
      img.addEventListener('load', () => { this.init($image, options) })
    }
  }

  /**
   * Returns the initial x1, y1, x2, y2, image width, height and aspect ratio
   * @param  {jQuery element} $image  image element
   * @param  {Object}         options cropbox options
   * @return {Object}         initial cropbox properties
   */
  getInitCropbox ($image, options) {
    let cropbox = {
      imageWidth: $image.width(),
      imageHeight: $image.height(),
      aspectRatio: options.aspectRatio
    }
    let fields = ['x1', 'y1', 'x2', 'y2']
    fields.map(field => {
      let value = defaults.cropbox[field]
      if (options.inputs[field]) {
        value = parseFloat($(options.inputs[field]).val(), 10) || value 
      }
      cropbox[field] = value
    })
    return cropbox
  }

  /**
   * Adding necessary DOM
   * @param {jQuery element} $image image element
   */
  addDOM ($image) {
    $image.wrap(`<div class="${constants.containerClass}"></div>`)
    let $container = $image.closest(`.${constants.containerClass}`)
    $container.append(`<div class="${constants.overlayClass}"></div>`)
    $container.append(`<div class="${constants.cropboxClass}"></div>`)
    let $cropbox = $container.find(`.${constants.cropboxClass}`)
    $cropbox.append(`<div class="${constants.resizehandleClass}"></div>`)
    let $resizehandle = $cropbox.find(`.${constants.resizehandleClass}`)
    $cropbox.css({ backgroundImage: `url(${$image.attr('src')})` })
    return [$container, $cropbox, $resizehandle]
  }

  /**
   * Position the cropbox
   * @param  {jQuery element} $cropbox image's cropbox element
   * @param  {Object}         cropbox  cropbox properties
   */
  positionCropbox ($cropbox, cropbox) {
    let bpX = -(cropbox.x1 * cropbox.imageWidth / 100)
    let bpY = -(cropbox.y1 * cropbox.imageHeight / 100)
    $cropbox.css({
      left: `${cropbox.x1}%`,
      top: `${cropbox.y1}%`,
      right: `${(100 - cropbox.x2)}%`,
      bottom: `${(100 - cropbox.y2)}%`,
      backgroundPosition: `${bpX}px ${bpY}px`,
      backgroundSize: `${cropbox.imageWidth}px ${cropbox.imageHeight}px`,
    })
  }

  /**
   * Update the cropbox properties to their input elements
   * @param  {Object} cropbox cropbox properties
   * @param  {Object} options cropbox options
   */
  updateFields (cropbox, options) {
    for (let field in options.inputs) {
      if (options.inputs[field]) {
        let value = cropbox[field]
        let factor = Math.pow(10, options.precision)
        value = Math.round(value * factor) / factor
        $(options.inputs[field]).val(value)
      }
    }
  }

  init ($image, options) {
    let cropbox = this.getInitCropbox($image, options)
    let [$container, $cropbox, $resizehandle] = this.addDOM($image)
    cropbox = resize(cropbox, { x: 0, y: 0 })
    this.positionCropbox($cropbox, cropbox)
    this.updateFields(cropbox, options)
    let cropboxDragHandler = new DragHandler($cropbox, (offset) => {
      cropbox = move(cropbox, offset)
      this.positionCropbox($cropbox, cropbox)
      this.updateFields(cropbox, options)
    })
    cropboxDragHandler.init()
    let resizehandleDragHandler = new DragHandler($resizehandle, (offset) => {
      cropbox = resize(cropbox, offset)
      this.positionCropbox($cropbox, cropbox)
      this.updateFields(cropbox, options)
    })
    resizehandleDragHandler.init()
  }
}
