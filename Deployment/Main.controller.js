sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller,msg) {
	"use strict";

	return Controller.extend("com.learnextapp.controller.Main", {
		
	extHookMethod: null,
	HookMethod1 : null,
	
	onInit:function(){
	 // if you redefine it in extension both method will call one by one 
	 // this rule is applicable in case of standard hook mehtod only not for custom method	
	 jQuery.sap.log.info("Init method called from standard controller");
	 
	 if (this.extHookMethod) {
			this.myvariable = this.extHookMethod();
					}
					if(this.HookMethod1){
						this.HookMethod1();
					}
	},	
	 onShow:function(oEvent){
	 	var imgb64 = this.getView().byId("imgb64");
	 	imgb64.setSrc('data:image/jpeg;base64,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');
	 	var sName = this.getView().byId("txtName").getValue();
	 	msg.show( 'Welcome' + sName );
	 },
	 {}
	});

});