import './sass/style.scss'
import $ from 'jquery'
import ImageCrop from './imagecrop'

export const create = (id, options) => (new ImageCrop(id, options))

export const discover = () => {
  $('[data-imagecrop]').each((index, image) => {
    var id = $(image).data('imagecrop')
    create(
      `[data-imagecrop="${id}"`,
      {
        inputs: {
          x1: `[data-imagecrop-x1="${id}"]`,
          y1: `[data-imagecrop-y1="${id}"]`,
          x2: `[data-imagecrop-x2="${id}"]`,
          y2: `[data-imagecrop-y2="${id}"]`
        }
      }
    )
  })
}
