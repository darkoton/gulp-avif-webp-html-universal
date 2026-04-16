# gulp-avif-webp-html-universal

> Gulp extension, replace html element `<img>` to `<picture>` with [`gulp-avif-webp-html-universal`](https://github.com/darkoton/gulp-avif-webp-html-universal)

Based on:
https://github.com/powerrampage/gulp-avif-webp-html

Modified and improved version by darkoton

## ✨ Features
- Converts ```<img>``` → ```<picture>```
- Optional AVIF support
- Optional WebP support
- Works only for .jpg, .jpeg, .png
- Keeps original ```<img>``` fallback
- Easy to configure per project

## 📦 Install

```
$ npm i --save-dev gulp-avif-webp-html-universal 
```


## 🚀 Usage

Use this into your `gulpfile.js`:

```js
const gulp = require('gulp')
const avifWebpHTML = require("gulp-avif-webp-html-universal")

function html() {
  return gulp.src('src/**/*.html')
    .pipe(avifWebpHTML(
      { avif: true, webp: true }
    ))
    .pipe(gulp.dest('dist/'));
}

exports.html = html;
```

## ⚙️ Usage

```js
avifWebpHTML(options)
```

| Option 1 | Type     | Default  | Description |
| -------- | -------- | -------- | --------    |
| avif   | boolean   | true   | Enable AVIF output      |
| webp   | boolean   | true   | Enable WebP output      |

## 🧪 Example
### Input
```html
<img src="img/photo.jpg" alt="image">
```

### Output (default config)
```html
<picture>
  <source srcset="img/photo.avif" type="image/avif">
  <source srcset="img/photo.webp" type="image/webp">
  <img src="img/photo.jpg" alt="image">
</picture>

```
### Output (AVIF only)
```js
avifWebpHTML({ avif: true, webp: false })
```

```html
<picture>
  <source srcset="img/photo.avif" type="image/avif">
  <img src="img/photo.jpg" alt="image">
</picture>
```

## 📁 Supported formats
- .jpg
- .jpeg 
- .png

## 🧠 How it works
The plugin scans HTML files and:

1. Finds ```<img>``` tags
2. Extracts src
3. Generates:
    - avif version (optional)
    - webp version (optional)
4. Wraps everything into ```\```<picture>```

## 🌐 Why ```<picture>```?

The ```<picture>``` element allows modern browsers to automatically choose the best image format.

Benefits:
- 🚀 Smaller image sizes (AVIF / WebP)
- ⚡ Faster page load
- 📱 Better mobile performance
- 🔄 Automatic fallback to original ```<img>```
- 🌍 Wide browser support

## 📊 Browser support?

The ```<picture>``` element is supported in all modern browsers.

👉 https://caniuse.com/picture

## ⚠️ Notes
- Does not process SVG
- Does not modify already existing ```<picture>``` blocks
- Works line-by-line (HTML structure sensitive)

## 📜 License

MIT

## 👤 Author

Original plugin:
powerrampage — https://github.com/powerrampage/gulp-avif-webp-html

Modified version:
darkoton - https://github.com/darkoton/gulp-avif-webp-html-universal