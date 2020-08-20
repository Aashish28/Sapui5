//@ui5-bundle com/ui5tooling/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/ui5tooling/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/ui5tooling/model/models"],function(e,i,t){"use strict";return e.extend("com.ui5tooling.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(t.createDeviceModel(),"device")}})});
},
	"com/ui5tooling/controller/Main.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("com.ui5tooling.controller.Main",{onInit:function(){}})});
},
	"com/ui5tooling/i18n/i18n.properties":'title=Ui5 tooling with middleware\nappTitle=ui5tooling\nappDescription=App Description',
	"com/ui5tooling/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"com.ui5tooling","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"ui5template.basicSAPUI5ApplicationProject","version":"1.38.11"}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"rootView":{"viewName":"com.ui5tooling.view.Main","type":"XML","async":true,"id":"Main"},"dependencies":{"minUI5Version":"1.65.6","libs":{"sap.ui.layout":{},"sap.ui.core":{},"sap.m":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.ui5tooling.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.ui5tooling.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteMain","pattern":"RouteMain","target":["TargetMain"]}],"targets":{"TargetMain":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"Main","viewName":"Main"}}}}}',
	"com/ui5tooling/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/ui5tooling/view/Main.view.xml":'<mvc:View controllerName="com.ui5tooling.controller.Main" xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m"><Shell id="shell"><App id="app"><pages><Page id="page" title="{i18n>title}"><content><Text text="Happy Learning of UI5 tooling \\n Simple proxy \\n Static Server \\n Live reload "/></content></Page></pages></App></Shell></mvc:View>'
}});
