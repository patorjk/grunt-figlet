'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.figlet = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    defaultOptions: function(test) {
        test.expect(1);

        var actual = grunt.config.get('figlet').defaultOptions;
        var expected = grunt.file.read('test/expected/defaultOptions');
        test.equal(actual, expected, 'Testing the default options on a banner.');
        
        test.done();
    },
    defaultOptions2: function(test) {
        test.expect(1);

        var actual = grunt.config.get('figlet').defaultOptions2;
        var expected = grunt.file.read('test/expected/defaultOptions2');
        test.equal(actual, expected, 'Another test for the default options.');
        
        test.done();
    },
    standard: function(test) {
        test.expect(1);
        
        var actual = grunt.config.get('figlet').standard;
        var expected = grunt.file.read('test/expected/standard');
        test.equal(actual, expected, 'Standard font with a vertical layout of "fitted".');

        test.done();    
    },
    graffiti: function(test) {
        test.expect(1);
        
        var actual = grunt.config.get('figlet').graffiti;
        var expected = grunt.file.read('test/expected/graffiti');
        test.equal(actual, expected, 'Graffiti font with a horizontal layout of "fitted".');

        test.done();    
    },
    dancingFont: function(test) {
        test.expect(1);
        
        var actual = grunt.config.get('figlet').dancingFont;
        var expected = grunt.file.read('test/expected/dancingFont');
        test.equal(actual, expected, 'Dancing Font with a horizontal layout of "full".');

        test.done();    
    },
    uglify: function(test) {
        test.expect(1);
        
        var actual = grunt.file.read('tmp/sample.min.js');
        var expected = grunt.file.read('test/expected/sample.min.js');
        test.equal(actual, expected, 'A compressed JavaScript file with a banner added.');

        test.done();    
    },
};
