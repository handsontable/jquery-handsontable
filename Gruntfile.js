/**
 * This file is used to build Handsontable from `src/*`
 *
 * Installation:
 * 1. Install Grunt CLI (`npm install -g grunt-cli`)
 * 1. Install Grunt 0.4.0 and other dependencies (`npm install`)
 *
 * Build:
 * Execute `grunt` from root directory of this directory (where Gruntfile.js is)
 * To execute automatically after each change, execute `grunt --force default watch`
 * To execute build followed by the test run, execute `grunt test`
 *
 * Result:
 * building Handsontable will create files:
 *  - dist/jquery.handsontable.js
 *  - dist/jquery.handsontable.css
 *  - dist/jquery.handsontable.full.js
 *  - dist/jquery.handsontable.full.css
 *
 * See http://gruntjs.com/getting-started for more information about Grunt
 */
var browsers = [
  {
    browserName: 'firefox',
    platform: 'Windows 7'
  },
  {
    browserName: 'chrome',
    platform: 'Windows 7'
  },
  {
    browserName: 'internet explorer',
    version: '8',
    platform: 'Windows 7'
  },
  {
    browserName: 'internet explorer',
    version: '9',
    platform: 'Windows 7'
  },
  {
    browserName: 'internet explorer',
    version: '10',
    platform: 'Windows 8'
  }
];

module.exports = function (grunt) {
  var sources = [
     'tmp/core.js',
     'src/focusCatcher.js',
     'src/tableView.js',
     'src/helpers.js',
     'src/fillHandle.js',
     'src/undoRedo.js',
     'src/selectionPoint.js',

     'src/renderers/textRenderer.js',
     'src/renderers/autocompleteRenderer.js',
     'src/renderers/checkboxRenderer.js',
     'src/renderers/numericRenderer.js',

     'src/editors/textEditor.js',
     'src/editors/autocompleteEditor.js',
     'src/editors/checkboxEditor.js',
     'src/editors/dateEditor.js',
     'src/editors/handsontableEditor.js',

     'src/validators/numericValidator.js',
     'src/validators/autocompleteValidator.js',

     'src/cellTypes.js',

     'src/pluginHooks.js',
     'src/plugins/autoColumnSize.js',
     'src/plugins/columnSorting.js',
     'src/plugins/contextMenu.js',
     'src/plugins/legacy.js',
     'src/plugins/manualColumnMove.js',
     'src/plugins/manualColumnResize.js',
     'src/plugins/observeChanges.js',

     'src/3rdparty/jquery.autoresize.js',
     'src/3rdparty/sheetclip.js',
     'src/3rdparty/copypaste.js'
   ];
  //
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gitinfo: {
    },
    meta: {
      src: sources,
      walkontable: [
        'src/3rdparty/walkontable/src/*.js',
        'src/3rdparty/walkontable/src/3rdparty/*.js'
      ],
      vendor: [
        'lib/bootstrap-typeahead.js',
        'lib/numeral.js',
        'lib/jQuery-contextMenu/jquery.contextMenu.js'
        // seems to have no effect when turned off on contextmenu.html
        //'lib/jQuery-contextMenu/jquery.ui.position.js'
      ]
    },

    concat: {
      dist: {
        files: {
          'dist/jquery.handsontable.js': [
            'tmp/intro.js',
            '<%= meta.src %>',
            '<%= meta.walkontable %>',
            'src/outro.js'
          ]
        }
      },
      full_js: {
        files: {
          'dist/jquery.handsontable.full.js': [
            'dist/jquery.handsontable.js',
            '<%= meta.vendor %>'
          ]
        }
      },
      full_css: {
        files: {
          'dist/jquery.handsontable.full.css': [
            'dist/jquery.handsontable.css',
            'lib/jQuery-contextMenu/jquery.contextMenu.css'
          ]
        }
      },
      wc: {
        files: {
          'dist_wc/x-handsontable/jquery-2.min.js': [
            'lib/jquery-2.min.js'
          ],
          'dist_wc/x-handsontable/numeral.de-de.js': [
            'lib/numeral.de-de.js'
          ],
          'dist_wc/x-handsontable/jquery.handsontable.full.js': [
            'dist/jquery.handsontable.full.js'
          ],
          'dist_wc/x-handsontable/jquery.handsontable.full.css': [
            'dist/jquery.handsontable.full.css'
          ]
        }
      }
    },
    
    jshint: {
        options: {
            '-W015': true,  // turn off warning on indentation
            // turn off "Expected an assignment".
            // Maybe code can be fixed to remove this?
            '-W030': true,
            browser: true,
            laxcomma: true,
            globals: {
              jQuery: true
            }
        },
        gruntfile: {
            src: ['Gruntfile.js']
        },
        src_files: {
            src: sources
        }
    },

    watch: {
      files: [
        'src/**/*.js',
        'src/**/*.css',
        'src/**/*.html',
        'lib/**/*.js',
        'lib/**/*.css'
      ],
      tasks: ['default']
    },

    clean: {
      dist: ['tmp']
    },

    replace: {
      dist: {
        options: {
          variables: {
            version: '<%= pkg.version %>',
            timestamp: '<%= (new Date()).toString() %>'
          }
        },
        files: {
          'tmp/intro.js': 'src/intro.js',
          'tmp/core.js': 'src/core.js',
          'dist/jquery.handsontable.css': 'src/css/jquery.handsontable.css'
        }
      },
      wc: {
        options: {
          variables: {
            controller: '<%= grunt.file.read("src/wc/x-handsontable-controller.js") %>'
          }
        },
        files: {
          'dist_wc/x-handsontable.html': 'src/wc/x-handsontable.html'
        }
      }
    },
    jasmine: {
      handsontable: {
        src: [
          'lib/jquery.min.js',
          'dist/jquery.handsontable.js',
          'lib/bootstrap-typeahead.js',
          'lib/numeral.js',
          'lib/jQuery-contextMenu/jquery.contextMenu.js',
          'test/jasmine/spec/SpecHelper.js',
          'demo/js/backbone/lodash.underscore.js',
          'demo/js/backbone/backbone.js',
          'demo/js/backbone/backbone-relational/backbone-relational.js',
          'extensions/jquery.handsontable.removeRow.js'
        ],
        options: {
          specs: [
            'test/jasmine/spec/*Spec.js',
            'test/jasmine/spec/*/*Spec.js'
          ],
          styles: [
            'test/jasmine/css/SpecRunner.css',
            'dist/jquery.handsontable.css',
            'lib/jQuery-contextMenu/jquery.contextMenu.css',
            'extensions/jquery.handsontable.removeRow.css'
          ]
        }
      },
      walkontable: {
        src: [
          'lib/jquery.min.js',
          'src/3rdparty/walkontable/src/*.js',
          'src/3rdparty/walkontable/src/3rdparty/*.js',
          'src/3rdparty/walkontable/test/jasmine/SpecHelper.js'
        ],
        options: {
          specs: [
            'src/3rdparty/walkontable/test/jasmine/spec/*.spec.js'
          ],
          styles: [
            'src/3rdparty/walkontable/css/walkontable.css'
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: '.',
          keepalive: true
        }
      },
      sauce: {
        options: {
          port: 9999,
          base: '.',
          keepalive: false
        }
      }
    },
    'saucelabs-jasmine': {
      handsontable: {
        options: {
          urls: ['http://localhost:9999/test/jasmine/SpecRunner.html'],
          testTimeout: (1000 * 60 * 5),
          tunnelTimeout: 120,
          testInterval: 5,
          testReadyTimeout: 5,
//          build: process.env.TRAVIS_JOB_ID,
          build: '<%= pkg.version %>-<%= gitinfo.local.branch.current.name %>',
          concurrency: 3,
          browsers: browsers,
          testname: "Development test (Handsontable)"
        }
      },
      walkontable: {
        options: {
          urls: ['http://localhost:9999/src/3rdparty/walkontable/test/jasmine/SpecRunner.html'],
          testTimeout: (1000 * 60 * 5),
          tunnelTimeout: 120,
          testInterval: 5,
          testReadyTimeout: 5,
//          build: process.env.TRAVIS_JOB_ID,
          build: '<%= pkg.version %>-<%= gitinfo.local.branch.current.name %>',
          concurrency: 3,
          browsers: browsers,
          testname: "Development test (Walkontable)"
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['gitinfo', 'replace:dist', 'concat', 'replace:wc', 'jshint', 'clean']);
  grunt.registerTask('test', ['default', 'jasmine']);
  grunt.registerTask('test:handsontable', ['default', 'jasmine:handsontable']);
  grunt.registerTask('test:walkontable', ['default', 'jasmine:walkontable']);
  grunt.registerTask('sauce', ['default', 'connect:sauce', 'saucelabs-jasmine:walkontable', 'saucelabs-jasmine:handsontable']);

  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-gitinfo');
};