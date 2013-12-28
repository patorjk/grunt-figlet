/*
 * grunt-figlet
 * 
 *
 * Copyright (c) 2013 Patrick Gillespie
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp'],
        },

        // Configuration to be run (and then tested).
        figlet: {

            /*
                These will be the default options for the targets
            */
            options: {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            },

            defaultOptions: 'Test',
            defaultOptions2: 'FIGlet\nFONTS',

            standard: {
                options: {
                    text: 'FIGlet\nFONTS',
                    font: 'Standard',
                    horizontalLayout: 'default',
                    verticalLayout: 'fitted'
                }
            },

            graffiti: {
                options: {
                    text: 'ABC.123',
                    font: 'Graffiti',
                    horizontalLayout: 'fitted'
                }
            },

            dancingFont: {
                options: {
                    text: 'pizzapie',
                    font: 'Dancing Font',
                    horizontalLayout: 'full'
                }
            },
        },

        uglify:{
            options: {
                banner: '/*\n<%= figlet.defaultOptions2 %>\n*/\n'
            },
            sample: {
                src:'test/fixtures/sample.js',
                dest:'tmp/sample.min.js'        
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },
        
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'figlet', 'uglify', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
