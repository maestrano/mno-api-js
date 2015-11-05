(function(){angular.module("mnoApiJs",["ngMessages","ngAria","restangular","ui.router","ui.bootstrap","toastr","base64","mnoApiJs.views","mnoApiJs.services"]),this.AppServices=angular.module("mnoApiJs.services",[]),this.AppViews=angular.module("mnoApiJs.views",[])}).call(this),function(){angular.module("mnoApiJs").service("webDevTec",function(){"ngInject";var e,t;e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"},{title:"Less",url:"http://lesscss.org/",description:"Less extends the CSS language, adding features that allow variables, mixins, functions and many other techniques.",logo:"less.png"},{title:"CoffeeScript",url:"http://coffeescript.org/",description:"CoffeeScript, 'a little language that compiles into JavaScript'.",logo:"coffeescript.png"}],t=function(){return e},this.getTec=t})}.call(this),function(){angular.module("mnoApiJs").directive("acmeNavbar",function(){var e,t;return e=["moment",function(e){"ngInject";var t;t=this,t.relativeDate=e(t.creationDate).fromNow()}],t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0}})}.call(this),function(){angular.module("mnoApiJs").directive("acmeMalarkey",function(){var e,t,n;return e=["$log","githubContributor",function(e,t){"ngInject";var n,i,a;a=this,n=function(){return i().then(function(){e.info("Activated Contributors View")})},i=function(){return t.getContributors(10).then(function(e){return a.contributors=e,a.contributors})},a.contributors=[],n()}],n=function(e,t,n,i){var a,r;r=void 0,a=malarkey(t[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "}),t.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(e){a.type(e).pause()["delete"]()}),r=e.$watch("vm.contributors",function(){angular.forEach(i.contributors,function(e){a.type(e.login).pause()["delete"]()})}),e.$on("$destroy",function(){r()})},t={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:n,controller:e,controllerAs:"vm"}})}.call(this),function(){angular.module("mnoApiJs").factory("githubContributor",["$log","$http",function(e,t){"ngInject";var n,i,a;return n="https://api.github.com/repos/Swiip/generator-gulp-angular",i=function(i){var a,r;return null==i&&(i=30),a=function(e){return e.data},r=function(t){e.error("XHR Failed for getContributors.\n"+angular.toJson(t.data,!0))},t.get(n+"/contributors?per_page="+i).then(a)["catch"](r)},a={apiHost:n,getContributors:i}}])}.call(this),function(){this.AppServices.factory("ImpacApiSvc",["$log","$base64","Restangular",function(e,t,n){return function(e,i,a){return n.withConfig(function(n){return n.setBaseUrl(a),n.setDefaultHeaders({Accept:"application/json",Authorization:"Basic "+t.encode(e+":"+i)})})}}])}.call(this),function(){this.AppServices.service("EndpointSvc",function(){return this.apikey="",this.apisecret="",this.groupid="",this})}.call(this),function(){this.AppServices.factory("ConnecApiSvc",["$log","$base64","Restangular",function(e,t,n){return function(e,i,a,r){return n.withConfig(function(n){return n.setBaseUrl(a+"/"+r),n.setDefaultHeaders({Accept:"application/json","Content-Type":"application/vnd.api+json",Authorization:"Basic "+t.encode(e+":"+i)}),n.addResponseInterceptor(function(e,t,n,i,a,r){var o;return o=null,o="getList"===t?e[n]:e})})}}])}.call(this),function(){this.AppViews.controller("ImpacController",["$log","ImpacApiSvc","EndpointSvc",function(e,t,n){"ngInject";var i;i=this,i.widgets=[],i.selectedWidget="accounts/balance",i.apiEndpoint="https://api-impac.maestrano.com/api/v1",i.getWidgets=function(){return i.widgets=[],i.widgets.push({name:"Accounts Balance",engine:"accounts/balance"}),i.widgets.push({name:"Accounts Summary",engine:"accounts/assets_summary"}),i.widgets.push({name:"Payable / Receivable",engine:"accounts/payable_receivable"}),i.widgets.push({name:"EBITDA",engine:"accounts/accounting_values/ebitda"})},i.fetchData=function(){var e,a;return e={metadata:{organization_ids:[n.groupid]},engine:i.selectedWidget},a=t(n.apikey,n.apisecret,i.apiEndpoint).all("get_widget"),a.post(angular.toJson(e)).then(function(e){return i.response=JSON.stringify(e,null,2)})},i.changeCredentials=function(){return""===n.apikey||""===n.apisecret||""===n.groupid?i.alerts=[{message:"API Credentials are required"}]:i.alerts=[]},i.getWidgets(),i.changeCredentials()}])}.call(this),function(){this.AppViews.controller("ConnecController",["$log","ConnecApiSvc","EndpointSvc",function(e,t,n){"ngInject";var i;i=this,i.alerts=[],i.endpoints=[],i.selectedResource="company",i.apiEndpoint="https://api-connec.maestrano.com/api/v2",i.getEndpoints=function(){var e;return e=t(n.apikey,n.apisecret,i.apiEndpoint,n.groupid).all(""),e.doGET().then(function(e){return i.endpoints=[],angular.forEach(e._links,function(e){var t;t=Object.keys(e)[0],e=e[t].href,i.endpoints.push({resource:t,link:e})})})},i.getResources=function(){var e;return e=t(n.apikey,n.apisecret,i.apiEndpoint,n.groupid).all(i.selectedResource),e.doGET().then(function(e){return i.response=JSON.stringify(e,null,2)})},i.createResource=function(){var e,a;return e={},e[i.selectedResource]=JSON.parse(i.payload),a=t(n.apikey,n.apisecret,i.apiEndpoint,n.groupid).all(i.selectedResource),a.post(angular.toJson(e)).then(function(e){return i.getResources(i.selectedResource)})},i.exampleResource=function(){var e;return e=t(n.apikey,n.apisecret,i.apiEndpoint,n.groupid).all(i.selectedResource+"/example"),e.doGET().then(function(e){return i.payload=JSON.stringify(e[i.selectedResource],null,2)})},i.changeResource=function(){return i.getEndpoints(),i.exampleResource()},i.changeCredentials=function(){return""===n.apikey||""===n.apisecret||""===n.groupid?i.alerts=[{message:"API Credentials are required"}]:i.alerts=[]},i.changeCredentials(),i.changeResource()}])}.call(this),function(){angular.module("mnoApiJs").run(["$log",function(e){"ngInject";return e.debug("runBlock end")}]).run(["$rootScope","EndpointSvc",function(e,t){return e.endpointSvc=t}])}.call(this),function(){angular.module("mnoApiJs").config(["$stateProvider","$urlRouterProvider",function(e,t){"ngInject";return e.state("connec",{url:"/",templateUrl:"app/connec/connec.html",controller:"ConnecController",controllerAs:"vm"}).state("impac",{url:"/impac",templateUrl:"app/impac/impac.html",controller:"ImpacController",controllerAs:"vm"}),t.otherwise("/")}])}.call(this),function(){angular.module("mnoApiJs").constant("malarkey",malarkey).constant("moment",moment)}.call(this),function(){angular.module("mnoApiJs").config(["$logProvider","toastrConfig",function(e,t){"ngInject";return e.debugEnabled(!0)}])}.call(this),angular.module("mnoApiJs").run(["$templateCache",function(e){e.put("app/connec/connec.html",'<div id="content-wrapper"><div class="page-content"><div class="row header"><div class="col-xs-12"><div class="meta col-xs-4"><div class="page">Connec! Resource<select name="select-resource" id="select-resource" class="input-sm" ng-options="endpoint.resource as endpoint.resource for endpoint in vm.endpoints | orderBy:\'resource\'" ng-model="vm.selectedResource" ng-change="vm.changeResource()"></select></div></div><div class="meta col-xs-2"><div class="page"><input class="form-control input-sm col-lg-12" type="text" ng-model="endpointSvc.apikey" ng-required="true" ng-blur="vm.changeCredentials()" placeholder="API Key"></div><div class="breadcrumb-links">API Key</div></div><div class="meta col-xs-2"><div class="page"><input class="form-control input-sm col-lg-12" type="text" ng-model="endpointSvc.apisecret" ng-required="true" ng-blur="vm.changeCredentials()" placeholder="API Secret"></div><div class="breadcrumb-links">API Secret</div></div><div class="meta col-xs-1"><div class="page"><input class="form-control input-sm col-lg-12" type="text" ng-model="endpointSvc.groupid" ng-required="true" ng-blur="vm.changeCredentials()" placeholder="Group ID"></div><div class="breadcrumb-links">Group ID</div></div><div class="meta col-xs-3"><div class="page"><input class="form-control input-sm col-lg-12" type="text" ng-model="vm.apiEndpoint" ng-blur="vm.changeResource()"></div><div class="breadcrumb-links">API Endpoint</div></div></div></div><div id="resource" class="container-fluid"><div class="alert ng-isolate-scope alert-danger alert-dismissable" data-ng-repeat="alert in vm.alerts"><div><span class="ng-binding ng-scope">{{alert.message}}</span></div></div><div id="list-resource"><label>Fetch {{vm.selectedResource}}</label> <button class="btn btn-sm btn-info" ng-click="vm.getResources()">Go</button><div><pre>\n            <code>{{vm.response}}</code>\n          </pre></div></div><div id="create-resource"><label>Add {{vm.selectedResource}}</label> <button class="btn btn-sm btn-info" ng-click="vm.createResource()">Create</button><div><textarea ng-model="vm.payload" rows="20" cols="120"></textarea></div></div></div></div></div>'),e.put("app/impac/impac.html",'<div id="content-wrapper"><div class="page-content"><div class="row header"><div class="col-xs-12"><div class="meta col-xs-4"><div class="page">Impac! Widget<select name="select-widget" id="select-widget" class="input-sm" ng-options="widget.engine as widget.name for widget in vm.widgets | orderBy:\'name\'" ng-model="vm.selectedWidget"></select></div></div><div class="meta col-xs-2"><div class="page"><input class="form-control input-sm col-lg-12" type="text" ng-model="endpointSvc.apikey" ng-required="true" ng-blur="vm.changeCredentials()" placeholder="API Key"></div><div class="breadcrumb-links">API Key</div></div><div class="meta col-xs-2"><div class="page"><input class="form-control input-sm col-lg-12" type="text" ng-model="endpointSvc.apisecret" ng-required="true" ng-blur="vm.changeCredentials()" placeholder="API Secret"></div><div class="breadcrumb-links">API Secret</div></div><div class="meta col-xs-1"><div class="page"><input class="form-control input-sm col-lg-12" type="text" ng-model="endpointSvc.groupid" ng-required="true" ng-blur="vm.changeCredentials()" placeholder="Group ID"></div><div class="breadcrumb-links">Group ID</div></div><div class="meta col-xs-3"><div class="page"><input class="control input-sm col-lg-12" type="text" ng-model="vm.apiEndpoint"></div><div class="breadcrumb-links">API Endpoint</div></div></div></div><div id="widget" class="container-fluid"><div class="alert ng-isolate-scope alert-danger alert-dismissable" data-ng-repeat="alert in vm.alerts"><div><span class="ng-binding ng-scope">{{alert.message}}</span></div></div><div id="list-widget"><label>Fetch data</label> <button class="btn btn-sm btn-info" ng-click="vm.fetchData()">Go</button><div><pre>\n            <code>{{vm.response}}</code>\n          </pre></div></div></div></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></div></div></nav>')}]);
//# sourceMappingURL=../maps/scripts/app-eb352f94c5.js.map