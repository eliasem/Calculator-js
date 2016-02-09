module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        "pkg": "<json:package.json>",
        "projName": "Calculator",
        "projVersion": "0.1.0",
        "clean": {
            "build": {
                "src": [ "temp", "dist" ],
                "options": {
                    "force": true
                }
            }
        },
        "jshint": {
            "all": [
                "Gruntfile.js",
                "app/scripts/**/*.js",
                "test/**/*.js"
            ],
            "options": {
                "jshintrc": ".jshintrc"
            }
        },
        "less": {
            "prod": {
                "options": {
                    "paths": [
                        "app/styles"
                    ],
                    "compress": true
                },
                "files": [
                    {
                        "dest": "dist/css/<%= projName %>.css",
                        "src": "app/styles/start.less"
                    }
                ]
            }
        },
        "copy": {
            "prepareBuild": {
                "files": [
                    { "src": [ "**" ], "cwd": "app/templates/", "dest": "temp/build/templates/", "expand": true }
                ]
            },
            "prod": {
                "files": [
                    { "src": [ "index.html" ], "dest": "dist/index.html" },
                    { "src": [ "**" ], "cwd": "app/assets/", "dest": "dist/assets/", "expand": true }
                ]
            }
        },
        "watch": {
            "all": {
                "files": [ "app/**", "test/**/*.js", "Gruntfile.js", "index.html", "jshintrc" ],
                "tasks": [ "rel" ]
            }
        },
        "requirejs": {
            "prod": {
                "options": {
                    "baseUrl": "temp/build/scripts",
                    "mainConfigFile": "temp/build/config.js",
                    "name": "../../../bower_components/almond/almond",
                    "include": "main",
                    "out": "dist/<%= projName %>.js",
                    "wrap": {
                        "startFile" : "app/wrap.start",
                        "endFile" : "app/wrap.end"
                    }
                }
            }
        },
        "mocha": {
            "dot": {
                "src": [
                    "test/index.html"
                ]
            }
        },
        "parallel": {
            "watch": {
                "options": { "grunt": true, "stream": true },
                "tasks": [ "watch:all"]
            }
        },
        "babel": {
            "build": {
                "options": {
                    "sourceMaps": true,
                    "presets": [ "es2015" ],
                    "plugins": [ "transform-es2015-modules-amd" ]
                },
                "files": [
                    { "expand": true, "cwd": "app", "src": [ "**/*.js" ], "dest": "temp/build" },
                    { "expand": true, "cwd": "test", "src": [ "**/*.js" ], "dest": "temp/test" }
                ]
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-mocha");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-parallel");

    // Define grunt tasks
    grunt.registerTask("rel", ["clean:build","jshint","copy:prepareBuild","less:prod","babel:build","copy:prod","mocha:dot","requirejs"]);
    grunt.registerTask("default", ["rel","parallel:watch"]);
};