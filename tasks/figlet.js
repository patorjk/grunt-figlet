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

console.log('this is a test');

module.exports = function(grunt) {

    var commentFuncts = {};
    commentFuncts['c'] = function(txt) {
        return "/**\n * " + txt.split("\n").join("\n * ") + "\n */";
    };
    commentFuncts['lua'] = function(txt) {
        return "--[[\n" + txt.split("\n").join("\n") + "\n--]]";
    };
    commentFuncts['c++'] = function(txt) {
        return "//  " + txt.split("\n").join("\n//  ");
    };
    commentFuncts['echo'] = function(txt) {
        return "echo \"" + txt.replace(/"/g,'\\"').replace(/`/g,'\\`').split("\n").join("\";\necho \"") + '";';
    };
    commentFuncts['bash'] = function(txt) {
        return "#  " + txt.split("\n").join("\n#  ");
    };
    commentFuncts['vb'] = function(txt) {
        return "'  " + txt.split("\n").join("\n'  ");
    };
    commentFuncts['mysql'] = function(txt) {
        return "--  " + txt.split("\n").join("\n--  ");
    };
    commentFuncts['js'] = commentFuncts['c'];
    commentFuncts['javascript'] = commentFuncts['js'];

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

            var genFunct, 
                outText = data,
                comment = options.comment;

            /*
                Handle if the user has setup a comment block
            */
            if (typeof comment === 'object' && comment) {
                if (typeof comment.style === 'function') {
                    genFunct = comment.style;
                } else if (comment.style) {
                    genFunct = commentFuncts[comment.style];
                    if (typeof genFunct === 'undefined') {
                        throw new Error('Unknown comment type.');
                    }
                } else {
                    genFunct = commentFuncts['js']; // default
                }

                if (typeof comment.generate === 'function') {
                    outText = comment.generate(outText);
                }
                outText = genFunct(outText);
            }

            var figletObj = grunt.config.get('figlet') || {};
            figletObj[target] = outText;
            grunt.config.set('figlet', figletObj);

            grunt.log.writeln('Banner for '+target+' generated.');
            done(err);
        });
    });
};
