sap.ui.define([
	"com/BestPractice/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.BestPractice.controller.App", {
		onInit: function () {
			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}



	});
});