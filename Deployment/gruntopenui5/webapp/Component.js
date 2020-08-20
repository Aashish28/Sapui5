sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/gruntopenui5/model/models",
	"./controller/ErrorHandler"
], function (UIComponent, Device, models, ErrorHandler) {
	"use strict";

	return UIComponent.extend("com.gruntopenui5.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			var bpNumber = this._getUriParams("BP");
			// Set Models
			this._initModels(bpNumber);
			// enable routing
			this.getRouter().initialize();
			//initialize error Handling
			this._oErrorHandler = new ErrorHandler(this);
		},

		/**
		 * The component is destroyed by UI5 automatically.
		 * In this method, the ErrorHandler is destroyed.
		 * @public
		 * @override
		 */
		destroy: function () {
			if (this._oErrorHandler) {
				this._oErrorHandler.destroy();
			}
			UIComponent.prototype.destroy.apply(this, arguments);
		},

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function () {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

		_initModels: function (bpNumber) {
			// set message model
			this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(), "messages");
			//Initialize schema	
			this.getModel("mainModel").setData(models.getInitSchema(bpNumber));
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},

		/**
		 * This method can be called to get startup parameters depend on property
		 * that should be passed to function
		 * @public
		 * @param {string} sProperty - startup parameter property
		 * @return {string} startup parameter property value
		 */
		_getUriParams: function (sProperty) {
			var oStartUpParams = this.getComponentData() ? this.getComponentData().startupParameters : null,
				sResult;

			if (!oStartUpParams) {
				// check CNTRL via URL
				var oUriParams = jQuery.sap.getUriParameters().mParams;
				sResult = oUriParams[sProperty] ? oUriParams[sProperty][0] : null;
			} else {
				sResult = oStartUpParams[sProperty] ? oStartUpParams[sProperty][0] : undefined;
			}

			return sResult;
		}
	});
});