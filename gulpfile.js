var gulp = require('gulp'),
    browserSync = require("browser-sync").create(),
    less = require('gulp-less'),
    reporter = require('gulp-less-reporter')

gulp.task('default', ['browser-sync-server']);

gulp.task('browser-sync-server', ['copyHtml','copyJs','copyLess'], function () {
  var files = [
    './dist/*.html'
  ]
  // 从这个项目的根目录启动服务器
  browserSync.init(files, {
    server: {
      baseDir: "dist",
      directory: true
    },
    reloadDebounce: 20,
    port:'8080',
    open: false
  })
  gulp.watch("src/*.html", ['copyHtml'])
  gulp.watch("dist/*.html").on("change", function (e) {
    browserSync.reload()
    if (e.type === 'deleted') {
      // 删除
      // e.path.substr(e.path.lastIndexOf('\\')+1)
    }
  })
  gulp.watch("src/js/*.js", ['copyJs'])
  gulp.watch("dist/js/*.js").on("change", browserSync.reload)
  gulp.watch("src/css/*.less", ['copyLess'])
})

gulp.task('copyHtml', function () {
  gulp.src('./src/*.html')
  .pipe(gulp.dest('./dist'))
})

gulp.task('copyJs', function () {
  gulp.src('./src/js/*.js')
  .pipe(gulp.dest('./dist/js'))
})


gulp.task('copyLess', function () {
  gulp.src('./src/css/*.less')
  .pipe(less()).on('error', reporter)
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.reload({stream:true}))
})
