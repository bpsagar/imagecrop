import $ from 'jquery'
import DragHandler from './draghandler'
import defaults from './defaults'
import constants from './constants'

import './sass/style.scss'

export class ImageCrop {
  constructor (id, options) {
    this.id = id
    this.options = options || {}
    this.$image = $(`#${id}`)
    this.options = $.extend(defaults, this.options)
    this.cropbox = this.options.cropbox || defaults.cropbox
    this.init()
  }

  addDOM () {
    this.$image.wrap(`<div class="${constants.containerClass}"></div>`)
    this.$container = this.$image.closest(`.${constants.containerClass}`)
    this.$container.append(`<div class="${constants.overlayClass}"></div>`)
    this.$container.append(`<div class="${constants.cropboxClass}"></div>`)
    this.$cropbox = this.$container.find(`.${constants.cropboxClass}`)
    this.$cropbox.append(`<div class="${constants.resizehandleClass}">&varr;</div>`)
    this.$resizehandle = this.$cropbox.find(`.${constants.resizehandleClass}`)
    this.$cropbox.css({ backgroundImage: `url(${this.$image.attr('src')})` })
  }

  positionCropbox () {
    let width = this.$image.width()
    let height = this.$image.height()
    let bpX = -(this.cropbox.x1 * width / 100)
    let bpY = -(this.cropbox.y1 * height / 100)
    this.$cropbox.css({
      left: `${this.cropbox.x1}%`,
      top: `${this.cropbox.y1}%`,
      right: `${(100 - this.cropbox.x2)}%`,
      bottom: `${(100 - this.cropbox.y2)}%`,
      backgroundPosition: `${bpX}px ${bpY}px`,
      backgroundSize: `${width}px ${height}px`,
    })
  }

  moveCropbox (offset) {
    var x = offset.x * 100 / this.$image.width()
    var y = offset.y * 100 / this.$image.height()
    this.cropbox.x1 += x
    this.cropbox.y1 += y
    this.cropbox.x2 += x
    this.cropbox.y2 += y

    if (this.cropbox.x1 < 0) {
      var xOffset = - this.cropbox.x1
      this.cropbox.x1 = 0
      this.cropbox.x2 += xOffset
    }

    if (this.cropbox.y1 < 0) {
      var yOffset = - this.cropbox.y1
      this.cropbox.y1 = 0
      this.cropbox.y2 += yOffset
    }

    if (this.cropbox.x2 > 100) {
      var xOffset = this.cropbox.x2 - 100
      this.cropbox.x2 = 100
      this.cropbox.x1 -= xOffset
    }

    if (this.cropbox.y2 > 100) {
      var yOffset = this.cropbox.y2 - 100
      this.cropbox.y2 = 100
      this.cropbox.y1 -= yOffset
    }

    this.positionCropbox()
  }

  resizeCropbox (offset) {
    var x = offset.x * 100 / this.$image.width()
    var y = offset.y * 100 / this.$image.height()
    this.cropbox.x2 += x
    this.cropbox.y2 += y

    if (this.cropbox.x2 > 100) {
      this.cropbox.x2 = 100
    }

    if (this.cropbox.y2 > 100) {
      this.cropbox.y2 = 100
    }

    this.positionCropbox()
  }

  init () {
    this.addDOM()
    this.positionCropbox()
    this.cropboxDragHandler = new DragHandler(this.$cropbox, this.moveCropbox.bind(this))
    this.cropboxDragHandler.init()
    this.resizehandleDragHandler = new DragHandler(this.$resizehandle, this.resizeCropbox.bind(this))
    this.resizehandleDragHandler.init()
  }
}
