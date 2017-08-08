/*eslint quotes: ["error", "single"]*/
/*eslint indent: ["error", "spaces"]*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
        target: ['src/*.js']
    },
    copy: {
      main: {
        files:[
            {expand: true, src: ["node_modules/**"], dest: 'deploy/', dot: true},
            {expand: true, src: ["src/*.js"], dest: 'deploy/', flatten: true, filter: 'isFile'},
            {expand: true, src: ["fonts/**"], dest: 'deploy/'}
          ]
      }
    },
    zip: {
      'using-cwd': {
        cwd: 'deploy/',
        src: ['deploy/**'],
        dest: 'target/lambda-output.zip',
        dot: true
      }
    }
  });

  // Load the NPM Tasks
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-zip');

   // Default task(s).
  grunt.registerTask('default', ['eslint','copy','zip']);

};