/*eslint-env node*/
/*global module:false*/
//noinspection Eslint
module.exports = function (grunt) {

	//noinspection Eslint,Eslint
	grunt.initConfig({
        dir: {
            webapp: "Deployment",
            tests: "Deployment",
            dist: "Deployment",
            localServerTestUrl: "http://localhost:8080/test-resources"
        },


        eslint: {
            options: {
                quiet: true
            },

            all: ["<%= dir.tests %>", "<%= dir.webapp %>"],
            webapp: ["<%= dir.webapp %>"]
        }

    });

    grunt.loadNpmTasks("grunt-eslint");

    // Linting task
    grunt.registerTask("lint", ["eslint:all"]);

    // Default task
    grunt.registerTask("default", [
        "lint:all"
    ]);
};
