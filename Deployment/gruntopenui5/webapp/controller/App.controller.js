sap.ui.define([
	"com/gruntopenui5/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.gruntopenui5.controller.App", {
		onInit: function () {
			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
	});
});