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
        },
        aws: grunt.file.readJSON('/Users/Sharkins/Documents/AWS/grunt-aws.json'),
        aws_s3: {
            options: {
                accessKeyId: '<%= aws.key %>',
                secretAccessKey: '<%= aws.secret %>',
                bucket: 'knowsnow',
                access: 'public-read',
                params: {
                    // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                    CacheControl: "max-age=630720000, public",
                    Expires: new Date(Date.now() + 63072000000).toISOString()
                }
            },
            dist: {
                files: [
                {
                    src: 'index.html',
                    dest: 'index.html'
                },
                {
                    src: 'dist/*',
                    dest: '/'
                },
                {
                    src: 'css/*',
                    dest: '/'
                },
                {
                    src: 'node_modules/leaflet/dist/*.css',
                    dest: '/'
                },
                {
                    src: 'node_modules/leaflet/dist/images/*.png',
                    dest: '/'
                },
                {
                    src: 'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css',
                    dest: '/'
                },
                {
                    src: 'node_modules/drmonty-leaflet-awesome-markers/css/**',
                    dest: '/'
                },
                {
                    src: 'node_modules/react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css',
                    dest: '/'
                },
                {
                    src: 'node_modules/babel-polyfill/dist/polyfill.min.js',
                    dest: '/'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/main.js': ['dist/main.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dev', ['env:dev', 'browserify:dev', 'replace:dev']);
    grunt.registerTask('dist', ['env:dist', 'browserify:dist', 'replace:dist',
        'uglify:dist', 'aws_s3:dist'])
};
