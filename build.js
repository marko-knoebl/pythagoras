"use strict";

var buildChromeApp = function() {

  // copy all needed parts to dist/chrome-app
  var fs = require('fs-extra');

  fs.copySync('controllers.js', 'dist/chrome-app/controllers.js');
  fs.copySync('index.html', 'dist/chrome-app/index.html');
  fs.copySync('chrome-app-assets', 'dist/chrome-app');
  fs.copySync('icons', 'dist/chrome-app');
  fs.copySync('libs', 'dist/chrome-app/libs');
  fs.copySync('src-chrome', 'dist/chrome-app');

  // create a zip in dist/chrome-app.zip
  var archiver = require('archiver');

  var archive = archiver('zip');
  var outputStream = fs.createWriteStream('dist/chrome-app.zip');
  archive.pipe(outputStream);
  archive.bulk([
    {expand: true, cwd: 'dist/chrome-app/', src: ['**']}
  ]);
  archive.finalize();
};

buildChromeApp();
