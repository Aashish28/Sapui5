/*!
 * Copyright 2019 SAAQ Canada
 */
sap.ui.define([
	"sap/ui/base/Object",
	"sap/m/MessageBox"
], function (Object, MessageBox) {
	"use strict";

	/**
	 * Constructor for Error Handler
	 *
	 * @class
	 * Creates error handler. All there methods should be used in case of error message should be displayed.
	 * @abstract
	 *
	 * @extends sap.ui.base.Object
	 *
	 * @constructor
	 * @public
	 * @alias com.saaq.ErrorHandler
	 */
	return Object.extend("com.gruntopenui5.controller.ErrorHandler", {

		/**
		 * Handles application errors by automatically attaching to the model events and displaying errors when needed.
		 * @class
		 * @param {sap.ui.core.mvc.Controller} oController - Controller Instance
		 * @public
		 * @alias com.saaq.errorHandler.controller.ErrorHandler
		 */
		constructor: function (oController) {
			this._oResourceBundle = oController.getModel("i18n").getResourceBundle();
			this._oModel = oController.getModel();
			if (this._oModel) {
				this._bMessageOpen = false;
				this._sErrorText = this._oResourceBundle.getText("errorHandler.Text");
				this._sErrorTitle = this._oResourceBundle.getText("errorHandler.Title");

				this._oModel.attachMetadataFailed(function (oEvent) {
					var oParams = oEvent.getParameters();
					this._showMetadataError(oParams.response);
				}, this);
			}
		},

		/**
		 * Shows a {@link sap.m.MessageBox} when the metadata call has failed.
		 * The user can try to refresh the metadata.
		 * @param {string} sDetails - a technical error to be displayed on request
		 * @return {void}
		 * @private
		 */
		_showMetadataError: function (sDetails) {
			MessageBox.show(
				this._sErrorText, {
					id: "metadataErrorMessageBox",
					icon: MessageBox.Icon.ERROR,
					title: this._sErrorTitle,
					details: sDetails,
					//styleClass: utilities.getContentDensityClass(),
					actions: [MessageBox.Action.RETRY, MessageBox.Action.CLOSE],
					onClose: function (sAction) {
						if (sAction === MessageBox.Action.RETRY) {
							this._oModel.refreshMetadata();
						}
					}.bind(this)
				}
			);
		}
	});
});