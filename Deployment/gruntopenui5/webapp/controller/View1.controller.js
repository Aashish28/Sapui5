sap.ui.define([
	"com/gruntopenui5/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.gruntopenui5.controller.View1", {

		onInit: function () {
			var oMainModel = this.getOwnerModel("mainModel");
			this.initializeMessageManager(oMainModel);
			this.getRouter().getRoute("RouteView1").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function () {

		}

		//######## Public methods ########

		//######## Private methods ########

		//######## Public Event Handlers ########

		//######## Private Event Handlers ########

	});
});