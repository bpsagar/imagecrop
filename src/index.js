import './sass/style.scss'
import $ from 'jquery'
import ImageCrop from './imagecrop'

export const create = (id, options) => (new ImageCrop(id, options))

export const discover = () => {
  $('[data-imagecrop]').each((index, image) => {
    let id = $(image).data('imagecrop')
    let aspectRatio = parseFloat($(image).data('imagecrop-aspectratio'), 10) || null
    let precision = parseFloat($(image).data('imagecrop-precision'), 10) || null
    create(
      `[data-imagecrop="${id}"`,
      {
        aspectRatio: aspectRatio,
        precision: precision,
        inputs: {
          x1: `[data-imagecrop-x1="${id}"]`,
          y1: `[data-imagecrop-y1="${id}"]`,
          x2: `[data-imagecrop-x2="${id}"]`,
          y2: `[data-imagecrop-y2="${id}"]`,
          file: `[data-imagecrop-file="${id}"]`
        }
      }
    )
  })
}
