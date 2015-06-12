'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
import compass from 'gulp-compass';
import minifyCSS from 'gulp-minify-css';
import nodemon from 'gulp-nodemon';

var port = process.env.HOT_LOAD_PORT || 3030;

gulp.task('default', ['webpack-dev-server', 'compass:build', 'watch', 'start']);
gulp.task('build', ['webpack:build', 'compass:build']);

gulp.task('watch', function () {
  gulp.watch('./sass/*.scss', ['compass:build']); 
});

// noscript scss file build
gulp.task('compass:build', () => {
  gulp.src('./sass/noscript.scss')
    .pipe(compass({
      css: 'public/css',
      sass: 'sass'
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/css'));
});

gulp.task('webpack:build', (callback) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({colors: true}));
    callback();
  });
});

gulp.task('webpack-dev-server', (callback) => {
  new WebpackDevServer(webpack(webpackConfig), {
    contentBase: `http://localhost:${port}`,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    hot: true,
    historyApiFallback: true
  }).listen(port, 'localhost', (err, result) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', `http://localhost:${port}`);
  });
});

gulp.task('start', (callback) => {
  nodemon({
    exec: 'babel-node',
    script: 'server.js',
    ext: 'js jsx',
    ignore: 'public',
    env: { 'NODE_ENV': process.env.NODE_ENV }
  })
});
