module.exports = function(grunt) {
         grunt.initConfig({

             less: {
                 development: {
                     options: {
                         paths: ["assets/css"]
                     },
                     files: {"css/main-styles.min.css": "less/main-styles.less"}
                 },
                 production: {
                     options: {
                         paths: ["assets/css"],
                         cleancss: true
                     },
                     files: {"css/main-styles.min.css": "less/main-styles.less"}
                 }
             },
             cssbeautifier : {
                  files : {
                      "css/main-styles.css": ["css/main-styles.min.css"]
                  },
                  options : {
                    indent: '  ',
                    paths: ["assets/css"],
                    openbrace: 'end-of-line',
                    autosemicolon: false
                  }
                },
             uglify: {
                my_target: {
                  files: {
                    'js/manage-contact.min.js': ['js/manage-contact.js']
                  }
                }
              }
         });
         grunt.loadNpmTasks('grunt-contrib-less');
         grunt.loadNpmTasks('grunt-cssbeautifier');    
         grunt.loadNpmTasks("grunt-jsbeautifier");
         grunt.loadNpmTasks('grunt-contrib-uglify');    
         //grunt.registerTask('default', ['less', 'cssbeautifier', 'jsbeautifier', 'uglify']);
         grunt.registerTask('default', ['less', 'cssbeautifier', 'uglify']);
    
         
     };