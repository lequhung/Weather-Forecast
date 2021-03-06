module.exports = function (grunt) {
  
  grunt.initConfig({
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ext: 'js,html',
          watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
        }
      },
      debug: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,html',
          watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['app/tests/**/*.js']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    protractor: {
      e2e: {
        options: {
          configFile: 'protractor.conf.js'
        }
      }
    },
    jshint: {
      options: {
        esversion: 6
      },
      all: {
        src: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/*[!lib]*/**/*.js']
      }
    },
    csslint: {
      all: {
        src: ['public/css/**/*.css']
      }
    },
    watch: {
      js: {
        files: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/*[!lib]*/**/*.js'],
        tasks: ['jshint']
      },
      css: {
        files: ['public/css/**/*.css'],
        tasks: ['csslint']
      },
      scss: {
        files: ['public/css/scss/**/*.scss'],
        tasks: ['sass']
      },
      cc: {
        files: ['!public/application.js', 'public/*[!libs]*/**/*.js', 'public/*[!tests]*/**/*.js'],
        tasks: ['concat:dist']
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      },
      debug: {
        tasks: ['nodemon:debug', 'watch', 'node-inspector'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    'node-inspector': {
      debug: {}
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/css/scss/',
          src: ['**/*.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },
    concat: {
      dist: {
        options: {
          separator: '\n',
        },
        src: ['public/config/*.js', 'public/controllers/*.js', 'public/directives/*.js', 'public/services/*.js'],
        dest: 'public/application.js',
      }
    }
  });

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['env:dev', 'lint', 'build', 'concurrent:dev']);
  grunt.registerTask('debug', ['env:dev', 'concurrent:debug']);
  grunt.registerTask('test', ['env:dev', 'mochaTest', 'karma']);
  grunt.registerTask('test-e2e', ['env:dev', 'protractor']);
  grunt.registerTask('lint', ['jshint', 'csslint']);
  grunt.registerTask('build', ['sass', 'concat']);
};