module.exports = function(grunt) {         
    'use strict';
    
    grunt.initConfig({
        dir: {
            webapp: "webapp",
            dist: "dist"
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: "*"
                }
            }
        },

        openui5_connect: {
            server: {
                options: {
                    appresources: 'webapp',
                    resources: 'C:/Users/AshishAhire/Downloads/sapui5-rt-1.70.0/resources'
                }
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-openui5');

    // Server task
    grunt.registerTask("serve", function (target) {
        grunt.task.run("openui5_connect:server" + ":keepalive");
    });    

    // Default task
	grunt.registerTask('default', ['serve']);
};