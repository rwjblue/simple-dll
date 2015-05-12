var pickFiles  = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var compileES6 = require('broccoli-es6modules');
var concat   = require('broccoli-sourcemap-concat');

// --- Compile ES6 modules ---

var loader = pickFiles('bower_components', {
  srcDir: 'loader.js',
  files: ['loader.js'],
  destDir: '/assets'
});

var lib = pickFiles('lib', {
  include: ['*.js']
});

var tests = pickFiles('tests', {
  include: ['*.js'],
  destDir: '/tests'
});

var main = mergeTrees([lib, tests]);
main = new compileES6(main);

main = concat(main, {
  inputFiles: ['**/*.js'],
  outputFile: '/assets/simple-dll-tests.amd.js'
});

// --- Select and concat vendor / support files ---

var vendor = concat('bower_components', {
  inputFiles: ['jquery/dist/jquery.js'],
  outputFile: '/assets/vendor.js'
});

var qunit = pickFiles('bower_components', {
  srcDir: '/qunit/qunit',
  files: ['qunit.js', 'qunit.css'],
  destDir: '/assets'
});

var testIndex = pickFiles('tests', {
  srcDir: '/',
  files: ['index.html'],
  destDir: '/tests'
});

var testSupport = concat('bower_components', {
  inputFiles: ['ember-cli-test-loader/test-loader.js'],
  outputFile: '/assets/test-support.js'
});

module.exports = mergeTrees([main, vendor, testIndex, qunit, loader, testSupport]);
