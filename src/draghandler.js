import $ from 'jquery'

export default class DragHandler {
  /**
   * Create a drag handler for an element. The callback function is passed with
   * the offset when it is moved
   * @param  {jQuery}   element  element on which the drag events are handled
   * @param  {Function} callback function called when the element is dragged
   */
  constructor (element, callback) {
    this.$element = $(element)
    this.callback = callback
    this.clicked = false
    this.cursor = { x: null, y: null }
  }

  /**
   * handle drag start events
   * @param  {event} e mousedown or touchstart event object
   */
  handleDragStart (e) {
    this.clicked = true
    this.cursor = { x: e.clientX, y: e.clientY }
  }

  /**
   * handle drag events
   * @param  {event} e mousemove or touchmove event object
   */
  handleDrag (e) {
    if (!this.clicked) { return }
    let offset = { x: e.clientX - this.cursor.x, y: e.clientY - this.cursor.y }
    this.cursor = { x: e.clientX, y: e.clientY }
    this.callback(offset)
  }

  /**
   * handle drag end events
   * @param  {event} e mouseup or touchend event object
   */
  handleDragEnd (e) {
    if (!this.clicked) { return }
    let offset = { x: e.clientX - this.cursor.x, y: e.clientY - this.cursor.y }
    this.clicked = false
    this.cursor = { x: null, y: null }
    this.callback(offset)
  }

  /**
   * initialize all the event handlers
   */
  init () {
    // Drag start events
    this.$element.on('mousedown', (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.handleDragStart(e)
    })
    this.$element.on('touchstart', (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.handleDragStart(e.touches[0])
    })

    // Drag events
    $(document).on('mousemove', (e) => {
      e.preventDefault()
      this.handleDrag(e)
    })
    $(document).on('touchmove', (e) => {
      e.preventDefault()
      this.handleDrag(e.touches[0])
    })

    // Drag end events
    $(document).on('mouseup', (e) => {
      e.preventDefault()
      this.handleDragEnd(e)
    })
    $(document).on('touchend', (e) => {
      e.preventDefault()
      this.handleDragEnd(e.changedTouches[0])
    })
  }
}
