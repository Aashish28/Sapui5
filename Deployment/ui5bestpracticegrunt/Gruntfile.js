module.exports = function(grunt) {         
    'use strict';
    
    grunt.config.merge({
        compatVersion: "1.56",
        deploy_mode: "html_repo"
    });    

    grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-build");   

    grunt.registerTask("default", [
        "clean",
        "lint",
        "build"
    ]);
    
};