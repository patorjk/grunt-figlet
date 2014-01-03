# grunt-figlet

> A plugin for Grunt that adds ASCII Art banners to source code.

```
   ____     ____      _   _   _   _     _____    _    
U /"___|uU |  _"\ uU |"|u| | | \ |"|   |_ " _| U|"|u  
\| |  _ / \| |_) |/ \| |\| |<|  \| |>    | |   \| |/  
 | |_| |   |  _ <    | |_| |U| |\  |u   /| |\   |_|   
  \____|   |_| \_\  <<\___/  |_| \_|   u |_|U   (_)   
  _)(|_    //   \\_(__) )(   ||   \\,-._// \\_  |||_  
 (__)__)  (__)  (__)   (__)  (_")  (_/(__) (__)(__)_) 
 ```

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-figlet --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-figlet');
```

## The "figlet" task

### Overview
In your project's Gruntfile, add a section named `figlet` to the data object passed into `grunt.initConfig()`. This will create a "figlet" variable that you can use in banner templates.

```js
grunt.initConfig({
    figlet: {
        // These will be the default options for the targets
        options: {
            font: 'Dancing Font',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        },
        banner1: 'Some Text',
        banner2: 'More Text',
        
        /*
            More advanced options let you customize the text and create a comment block
            for the ASCII Art
        */

        banner3: {
            options: {
                text: 'Code Comment',
                font: 'Graffiti',
                comment: {
                    style: 'js',
                    generate: function(asciiArtText) {
                        return asciiArtText + '\nThis is a test message.\nMore random text\nAnd some more...';
                    }
                }
            }
        }
    },

    // ...

    // The figlet task will create a "figlet" config variable with properties holding
    // the results that corespond to the targets. You can use these variables to print 
    // out the banners. See the example below.

    uglify:{
        options: {
            banner: '<%= figlet.banner3 %>\n'
        },
        sample: {
            src: 'some-file.js',
            dest: 'some-file.min.js'
        }
    },
});
```

### Options

This task primary delegates to [FIGlet.js](https://github.com/patorjk/figlet.js), though it takes in some additional options. 

#### options.text
Type: `String`
Default value: `''`

A string value that is converted into ASCII Art.

#### options.font
Type: `String`
Default value: `'Standard'`

A string value that indicates the FIGlet font to use.

#### options.horizontalLayout
Type: `String`
Default value: `'default'`

A string value that indicates the horizontal layout to use. FIGlet fonts have 5 possible values for this: "default", full", "fitted", "controlled smushing", and "universal smushing". "default" does the kerning the way the font designer intended, "full" uses full letter spacing, "fitted" moves the letters together until they almost touch, and "controlled smushing" and "universal smushing" are common FIGlet kerning setups.

#### options.verticalLayout
Type: `String`
Default value: `'default'`

A string value that indicates the vertical layout to use. FIGlet fonts have 5 possible values for this: "default", full", "fitted", "controlled smushing", and "universal smushing". "default" does the kerning the way the font designer intended, "full" uses full letter spacing, "fitted" moves the letters together until they almost touch, and "controlled smushing" and "universal smushing" are common FIGlet kerning setups.

#### options.comment
Type: `Object`
Default value: `undefined`

If present, then a comment block will be constructed (see examples down below).

#### options.comment.style
Type: `String` or `Function`
Default value: `'js'`

Indicates the style of the comment. Right now only "js" is supported. If you want to create a custom comment style, you can make this equal to a function that takes in the final comment block text. This function should return the final comment block.

#### options.comment.generate
Type: `Function`
Default value: A function that returns the generated ASCII Art text.

Indicates how to construct the comment block text. This should equal a function that takes in the ASCII Art text and returns the final comment message. You can use this if you want to add additional text on top of the generated ASCII Art.

### Usage Examples

#### Default Options
Below is a simple example that uses the default options.

```js
grunt.initConfig({
    figlet: {
        banner1: 'Some Text'
    },

    // ...

    // The figlet task will create a "figlet" config variable with properties holding
    // the results that corespond to the targets. You can use these variables to print 
    // out the banners. See the example below.

    uglify:{
        options: {
            banner: '/*\n<%= figlet.banner1 %>\n*/\n'
        },
        sample: {
            src: 'some-file.js',
            dest: 'some-file.min.js'
        }
    },
});
```

#### Custom Options
Below is an example that uses custom options.

```js
grunt.initConfig({
    figlet: {
        banner1: {
            options: {
                text: 'Code Comment',
                font: 'Graffiti',
                comment: {
                    style: 'js',
                    generate: function(asciiArtText) {
                        return asciiArtText + '\nThis is a test message.\nMore random text\nAnd some more...';
                    }
                }
            }
        }
    },

    // ...

    // The figlet task will create a "figlet" config variable with properties holding
    // the results that corespond to the targets. You can use these variables to print 
    // out the banners. See the example below.

    uglify:{
        options: {
            banner: '/*\n<%= figlet.banner1 %>\n*/\n'
        },
        sample: {
            src: 'some-file.js',
            dest: 'some-file.min.js'
        }
    },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014.01.03 v0.1.1 Added the comment option.
* 2013.12.28 v0.1.0 Initial release.
