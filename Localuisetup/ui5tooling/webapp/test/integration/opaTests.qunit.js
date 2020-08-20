/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/ui5tooling/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});