"use strict";
/*      gulp-avif-webp-html-universal
  Original:
  © 04.11.2021 powerrampage
  github.com/powerrampage/gulp-avif-webp-html

  Modified by:
  darkoton
  github.com/darkoton/gulp-avif-webp-html-universal
*/
const pluginName = 'gulp-avif-webp-html-universal'
const gutil = require('gulp-util')
const PluginError = gutil.PluginError
const through = require('through2')
module.exports = function ({webp = true, avif = true}, extensions) {
    extensions = extensions || ['.jpg', '.png', '.jpeg']
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file)
            return
        }
        if (file.isStream()) {
            cb(new PluginError(pluginName, 'Streaming not supported'))
            return
        }
           try {
            let html = file.contents.toString()

            const Re = /<img[\s\S]*?src=["']([^"']+)["'][\s\S]*?>/gi

            html = html.replace(Re, (imgTag, srcImage) => {

                // пропускаем если уже avif
                if (srcImage.includes('.avif')) return imgTag

                // пропускаем если внутри picture
                const before = html.slice(0, html.indexOf(imgTag))
                const openPicture = before.lastIndexOf('<picture')
                const closePicture = before.lastIndexOf('</picture')

                if (openPicture > closePicture) {
                    return imgTag
                }

                const ext = extensions.find(e => srcImage.endsWith(e))
                if (!ext) return imgTag

                const newAvifUrl = srcImage.replace(ext, '.avif')
                const newWebpUrl = srcImage.replace(ext, '.webp')

                return `<picture>
    ${avif ? `<source srcset="${newAvifUrl}" type="image/avif">` : ''}
    ${webp ? `<source srcset="${newWebpUrl}" type="image/webp">` : ''}
    ${imgTag}
</picture>`
            })

            file.contents = Buffer.from(html)
            this.push(file)

        } catch (err) {
            this.emit('error', new PluginError(pluginName, err))
        }
        cb()
    })
}
