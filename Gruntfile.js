module.exports = function(grunt) {
    var files = {'dist/main.js': ['src/*.js', 'src/**/*.js',
        '!src/**/*-test.js']};
    grunt.initConfig({
        watch: {
            react: {
                files: ['src/*.js', 'src/**/*.js'],
                tasks: ['dev']
            }
        },
        browserify: {
            options: {
                //Stage 0 necessary for ES7 property initializers for 'this'
                //autobinding on React ES6 classes.
                transform: [['babelify', {'stage': 0}]]
            },
            dev: {
                files: files,
                options: {
                    browserifyOptions: {
                        debug: true,
                        fullPaths: true
                    }
                }
            },
            dist: {
                files: files,
                options: {
                    browserifyOptions: {
                        debug: false
                    }
                }
            }
        },
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            dist: {
                NODE_ENV: 'production'
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [{ match: 'apiUrl', replacement:
                        'http://knowsnowapi.herokuapp.com/'}],
                    usePrefix: false
                },
                files: [
                    {expand: true, flatten: true, src: ['dist/main.js'],
                        dest: 'dist/'}
                ]
            },
            dev: {
                options: {
                    patterns: [{match: 'apiUrl', replacement:
                        'http://localhost:3000/'}], usePrefix: false
                },
                files: [
                    {expand: true, flatten: true, src: ['dist/main.js'],
                        dest: 'dist/'}
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('dev', ['env:dev', 'browserify:dev', 'replace:dev']);
    grunt.registerTask('dist', ['env:dist', 'browserify:dist', 'replace:dist'])
};
