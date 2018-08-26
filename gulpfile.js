const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');

// 编译并压缩js
gulp.task('convertJS', function(){
    return gulp.src('sdk/*.js')
      .pipe(babel({
        presets: ['es2015']
      }))
    //   .pipe(uglify())
      .pipe(gulp.dest('sdk/dist'))
})

// 监视文件变化，自动执行任务
gulp.task('watch', function(){
    gulp.watch('sdk/*.js', ['convertJS']);
})

gulp.task('develop', function () {
    var stream = nodemon({ 
        script: 'server/index.js',
        ext: 'html js', 
        // ignore: ['ignored.js'],
    })
   
    stream
        .on('restart', function () {
          console.log('restarted!')
        })
        .on('crash', function() {
          console.error('Application has crashed!\n')
           stream.emit('restart', 10)  // restart the server in 10 seconds
        })
})

gulp.task('svr', ['convertJS', 'develop', 'watch'])
// gulp.task('svr', ['develop']);