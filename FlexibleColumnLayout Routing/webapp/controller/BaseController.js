sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/message/Message",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox"
], function (Controller, History, Message, Filter, FilterOperator, MessageBox) {
	"use strict";

	return Controller.extend("com.BestPractice.controller.BaseController", {

		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getOwnerModel: function (sName) {
			return this.getOwnerComponent().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Returns the control instace based on provided id in the calling view
		 * @param   {string}              sId Id of Control
		 * @returns {sap.ui.core.Control} Instance of control in calling view
		 * @public
		 */
		getById: function (sId) {
			return this.getView().byId(sId);
		},

		/**
		 * Set busy indicator on view
		 * @public
		 * @param {boolean} bEnable busy true/false
		 * @returns {void}
		 */
		setBusy: function (bEnable) {
			this.getView().setBusy(bEnable);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Get text from resource bundle
		 * @public
		 * @param {string} oParm - key property of i18n for which we have to retreive value from resource bundle.
		 * @param {[]}  pArr - optional parameters array which we need to pass along with key to retrive constants from i18n
		 */
		getTextFromI18n: function (oParm, pArr) {
			var oResourceBundle = this.getResourceBundle();
			return pArr ? oResourceBundle.getText(oParm, pArr) :
				oResourceBundle.getText(oParm);
		},

		/**
		 * Convenience method for getting the filters based on model in every controller of the application.
		 * @public
		 * @param {string|string[]} anyFilterName - name of odata filter
		 * @param {string|string[]} anyPropertyName - name of property of json model filter
		 * @param {string|string[]} anyFilterOperatorType - filter type default is EQ
		 * @param {string|string[]} anyFilterValue - Any filter value hardcoded or variable
		 * @param {string} sModelName - Specific model name to read value of property 
		 * @param {string}  bAnd - AND OR filter in filter (default value is And )
		 * @returns {sap.ui.model.Filter} - the filter instance default with and operator(if multiple)
		 */
		getFilter: function (anyFilterName, anyPropertyName, anyFilterOperatorType, anyFilterValue, sModelName, bAnd) {
			var sModel = sModelName || "mainModel",
				oMainModel = this.getModel(sModel),
				sValue, sPropertyName, sFilterOperator,
				oFilter = {},
				aFilters = [];

			if (typeof anyFilterName === "string") {
				sPropertyName = anyPropertyName || anyFilterName;
				sFilterOperator = anyFilterOperatorType || FilterOperator.EQ;
				sValue = anyFilterValue || oMainModel.getProperty("/" + sPropertyName);
				if (sValue === "SPACE") {
					sValue = "";
				}
				oFilter = new Filter(anyFilterName, sFilterOperator, sValue);

			} else if (Array.isArray(anyFilterName) && anyFilterName.length) {
				anyFilterName.forEach(function (filterName, index) {
					sPropertyName = Array.isArray(anyPropertyName) ?
						anyPropertyName[index] || filterName : filterName;
					sFilterOperator = Array.isArray(anyFilterOperatorType) ?
						anyFilterOperatorType[index] || FilterOperator.EQ : FilterOperator.EQ;
					sValue = Array.isArray(anyFilterValue) ?
						anyFilterValue[index] || oMainModel.getProperty("/" + sPropertyName) : oMainModel.getProperty("/" + sPropertyName);
					if (sValue === "SPACE") {
						sValue = "";
					}
					aFilters.push(new Filter(filterName, sFilterOperator, sValue));
				});
				bAnd = !bAnd ? true : bAnd;
				oFilter = new Filter({
					filters: aFilters,
					and: bAnd || true
				});
			}
			return oFilter;
		},

		/**
		 * Event handler for navigating back.
		 * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 * @returns {void}
		 */
		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("RouteMain", {}, bReplace);
			}
		},

		/**
		 * Convenience method to open message popover from any controller of the application.
		 * @public
		 * @param {Object} oEvent - event object received in handler
		 * @returns {void}
		 */
		onMessagePopoverPress: function (oEvent) {
			this._getMessagePopover().openBy(oEvent.getSource());
		},

		//################ Private APIs ###################

		/**
		 * Convenience method to get message popover from any controller of the application.
		 * @private
		 * @returns {sap.m.MessagePopover} Instance of message popover
		 */
		_getMessagePopover: function () {
			// create popover lazily (singleton)
			if (!this._oMessagePopover) {
				this._oMessagePopover = sap.ui.xmlfragment(this.getView().getId(), "com.BestPractice.view.MessagePopover", this);
				this.getView().addDependent(this._oMessagePopover);
			}
			return this._oMessagePopover;
		},

		/**
		 * Error handler for read call
		 * @param {object} oError  error object for the AJAX call
		 * @private
		 */
		onODataReadFail: function (oError) {
			var oResourceBundle = this.getResourceBundle();
			//oMsgDetail = null;
			if ((oError.statusCode === "400" || oError.statusCode === "404") && oError.responseText) {
				//oMsgDetail = JSON.parse(oError.responseText);
				MessageBox.error(oError.statusCode + "-" + oError.message, {
					details: oError.responseText,
					styleClass: this.getOwnerComponent().getContentDensityClass(),
					actions: [MessageBox.Action.CLOSE]
				});
			} else {
				try {
					MessageBox.error(oResourceBundle.getText("ERR_REST_FAIL_MSG", [oError.statusCode, oError.responseText]));
				} catch (e) {
					MessageBox.error(oResourceBundle.getText("ERR_ODATA_FAIL_MSG"));
				}

			}
		},

		/* =========================================================== */
		/* messages event handlers                                     */
		/* =========================================================== */

		/**
		 * method initialize the message processor by registering the message processor and
		 * by setting the Messages model to the view.
		 * @public
		 * @param {object} oMessageProcessor Message Processor Model
		 */
		initializeMessageManager: function (oMessageProcessor) {
			var oMessageManager = this._getMessageManager();
			oMessageManager.registerObject(this.getView(), true);
			// register the message processor
			oMessageManager.registerMessageProcessor(oMessageProcessor);
			this.removeAllMessages();
		},

		/**
		 * method to get the Message manager.
		 * @returns {object} Message Manager
		 * @private
		 */
		_getMessageManager: function () {
			return sap.ui.getCore().getMessageManager();
		},

		/**
		 * method to get the instance message processor model
		 * @private
		 * @returns {object} - Instance of Message Processor Model
		 */
		_getMessageModel: function () {
			return this._getMessageManager().getMessageModel();
		},

		/**
		 * helper method to add the message to Message Processor Model
		 * and updates the ErrorCount in the model
		 * @param {string} - sTarget - Binding Path of the Control
		 * @param {string} - sMessage - MessageText
		 * @param {string} - sLongText - Long Description Text
		 * @param {string} - sMessageType - MessageType
		 * @param {string} [[Description]]
		 * @public
		 */
		addMessage: function (sTarget, sMessage, sLongText, sMessageType, oMessageProcessor) {
			if (!oMessageProcessor) {
				oMessageProcessor = this.getModel();
			}
			this._addMessage(sTarget, sMessage, sLongText, sMessageType, oMessageProcessor);
		},

		/**
		 * method to add the message to Message Processor Model
		 * based on Target and removes the old messages for for given Target.
		 * @private
		 * @param {string}  sTarget           Binding path of the control
		 * @param {string}  sMessage          message text
		 * @param {string}  sLongText         Long description text
		 * @param {string}  sMessageType      type of message
		 * @param {object}  oMessageProcessor Message Processor Model
		 * @param {boolean} bRemovePrev       Previous message for the same target will not be removed if false.
		 */
		_addMessage: function (sTarget, sMessage, sLongText, sMessageType, oMessageProcessor, bRemovePrev) {

			var oMessageManager = this._getMessageManager(),
				oMessage = {
					target: sTarget,
					message: sMessage,
					description: sLongText,
					type: sMessageType,
					processor: oMessageProcessor
				};

			if (bRemovePrev !== false) {
				// remove existing messages for this control
				this.removeMessage(sTarget, oMessageProcessor);
			}

			// Add New Message using message manager
			oMessageManager.addMessages(new Message(oMessage));
		},

		/**
		 * method to add the more then one messages to Message Processor Model
		 * @public
		 * @param {[]} aMessages - Messages in standard format for message processor
		 */
		addMessages: function (aMessages) {
			var oMessageManager = this._getMessageManager();
			oMessageManager.addMessages(aMessages);
		},

		/**
		 * method to remove the message from message processor model based on target path
		 * @public
		 * @param {string} sTarget           Binding path of the control
		 * @param {object} oMessageProcessor Message Processor Model
		 */
		removeMessage: function (sTarget, oMessageProcessor) {
			if (!oMessageProcessor) {
				oMessageProcessor = this.getModel();
			}
			this._removeMessage(sTarget, oMessageProcessor);
		},

		/**
		 * method to remove the message from message processor model based on target path
		 * @private
		 * @param {string} sTarget           Binding path of the control
		 * @param {object} oMessageProcessor Message Processor Model
		 */
		_removeMessage: function (sTarget, oMessageProcessor) {
			var oMessageManager = this._getMessageManager();
			oMessageManager.removeMessages(oMessageProcessor.getMessagesByPath(sTarget));
		},

		/**
		 * method to remove all messages from message processor model
		 * @public
		 * @param {any}    anyTargetPattern  target pattern/list of target pattern
		 * @param {object} oMessageProcessor message processor if specific will be used
		 */
		removeAllMessages: function (anyTargetPattern, oMessageProcessor) {
			var oMessageManager = this._getMessageManager(),
				aMessages = [],
				iMsgCounter,
				iPatternCounter,
				sCurrentTargetPattern;

			if (!oMessageProcessor) {
				oMessageProcessor = this.getModel();
			}
			if (!anyTargetPattern) {
				oMessageManager.removeAllMessages();
			} else if (typeof anyTargetPattern === "string") {
				aMessages = jQuery.extend(true, [], this._getMessageModel().getData());
				//Remove messages with provided target pattern
				for (iMsgCounter = aMessages.length - 1; iMsgCounter >= 0; iMsgCounter--) {
					if (aMessages[iMsgCounter].target.indexOf(anyTargetPattern) !== -1) {
						aMessages.splice(iMsgCounter, 1);
					}
				}
				oMessageManager.removeAllMessages();
				oMessageManager.addMessages(aMessages);
			} else if (jQuery.isArray(anyTargetPattern) && anyTargetPattern.length) {
				aMessages = jQuery.extend(true, [], this._getMessageModel().getData());
				//For all the patterns provided as an argument
				for (iPatternCounter = anyTargetPattern.length - 1; iPatternCounter >= 0; iPatternCounter--) {
					//Remove messages with current target pattern
					sCurrentTargetPattern = anyTargetPattern[iPatternCounter];
					for (iMsgCounter = aMessages.length - 1; iMsgCounter >= 0; iMsgCounter--) {
						if (aMessages[iMsgCounter].target.indexOf(sCurrentTargetPattern) !== -1) {
							aMessages.splice(iMsgCounter, 1);
						}
					}
				}
				oMessageManager.removeAllMessages();
				oMessageManager.addMessages(aMessages);
			}
		},

		/**
		 * Forcefully open the message popover
		 * @public
		 * return (void)
		 */
		forceMessagePopoverOpen: function () {
			var oMessagePopover = this._getMessagePopover();
			if (oMessagePopover && !oMessagePopover.isOpen() && this.getView() && this.getView().byId("btnMsgPopover")) {
				var oButton = this.getView().byId("btnMsgPopover");
				oMessagePopover.openBy(oButton);
			}
		},

		/**
		 * method to remove all errors if not handled in gateway
		 * @public
		 * @param {object} oError - error object from odata call
		 */
		filterErrors: function (oError) {
			var oResourceBundle = this.getResourceBundle(),
				oMessageManager = this._getMessageManager(),
				aMessages = jQuery.extend(true, [], this._getMessageModel().getData()),
				aFilterMessage = aMessages.filter(function (oMessage) {
					return (oMessage.message !== oResourceBundle.getText("ERR_EXP_EN") &&
						oMessage.message !== oResourceBundle.getText("ERR_EXP_FR"));
				});
			oMessageManager.removeAllMessages();
			oMessageManager.addMessages(aFilterMessage);
		}

	});
}, true);