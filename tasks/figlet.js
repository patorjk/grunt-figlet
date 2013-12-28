/*
 * grunt-figlet
 * 
 *
 * Copyright (c) 2013 Patrick Gillespie
 * Licensed under the MIT license.
 */

'use strict';

var figlet = require('figlet');

GLOBAL.figlet = figlet;

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('figlet', 'Adds ASCII Art banners to source code.', function() {
        var options = this.options(),
            target = this.target,
            inputText,
            fontOpts = figlet.defaults(),
            done = this.async();
        
        // set what the input text will be
        if (typeof this.data === 'string') {
            inputText = this.data;
        } else if (options.text) {
            inputText = options.text;
        } else {
            inputText = '';
        }
        
        fontOpts.font = (options.font) ? options.font : fontOpts.font;
        fontOpts.horizontalLayout = (options.horizontalLayout) ? options.horizontalLayout : fontOpts.horizontalLayout;
        fontOpts.verticalLayout = (options.verticalLayout) ? options.verticalLayout : fontOpts.verticalLayout;
        
        figlet.text(inputText, fontOpts, function(err, data) {
            if (err) {
                done(err);
                return;
            }

            var figletObj = grunt.config.get('figlet') || {};
            figletObj[target] = data;
            grunt.config.set('figlet', figletObj);

            grunt.log.writeln('Banner for '+target+' generated.');
            done(err);
        });
    });
};
