"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}angular.module("littleurlApp",["littleurlApp.constants","ngCookies","ngResource","ngSanitize","ui.router"]).config(["$urlRouterProvider","$locationProvider",function(a,b){a.otherwise("/"),b.html5Mode(!0)}]),angular.module("littleurlApp.util",[]),function(a,b){a.module("littleurlApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular),function(){var a=function b(a,c){_classCallCheck(this,b),a.inputURL="",a.outputURL="",a.searching=!1,a.shortenURL=function(){a.searching=!0,c.get("/newurl/"+a.inputURL).then(function(b){a.searching=!1,a.outputURL=b.data.shortUrl},function(a){console.log(a)})}};a.$inject=["$scope","$http"],angular.module("littleurlApp").component("main",{templateUrl:"app/main/main.html",controller:a})}(),angular.module("littleurlApp").config(["$stateProvider",function(a){a.state("main",{url:"/",template:"<main></main>"})}]),angular.module("littleurlApp").directive("footer",function(){return{templateUrl:"components/footer/footer.html",restrict:"E",link:function(a,b){b.addClass("footer")}}});var NavbarController=function a(){_classCallCheck(this,a),this.menu=[{title:"Home",state:"main"}],this.isCollapsed=!0};angular.module("littleurlApp").controller("NavbarController",NavbarController),angular.module("littleurlApp").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",controller:"NavbarController",controllerAs:"nav"}}),function(){function a(a){var b={safeCb:function(a){return angular.isFunction(a)?a:angular.noop},urlParse:function(a){var b=document.createElement("a");return b.href=a,""===b.host&&(b.href=b.href),b},isSameOrigin:function(c,d){return c=b.urlParse(c),d=d&&[].concat(d)||[],d=d.map(b.urlParse),d.push(a.location),d=d.filter(function(a){return c.hostname===a.hostname&&c.port===a.port&&c.protocol===a.protocol}),d.length>=1}};return b}a.$inject=["$window"],angular.module("littleurlApp.util").factory("Util",a)}(),angular.module("littleurlApp").run(["$templateCache",function(a){a.put("app/main/main.html",'<div class=container><div class=jumbotron><h1>FCC: URL Shortener Microservice</h1></div><div class=col-md-12><blockquote><h2>Example Usage:</h2><code>https://littleurl.herokuapp.com/newurl/http://www.reddit.com/r/videos</code><br><h2>Example Return:</h2><code>{"short_url":"https://littleurl.herokuapp.com/EJmUMrzCl","original_url":"http://www.reddit.com/r/videos"}</code></blockquote><h2>URL Shortener</h2><form ng-submit=shortenURL()><input type=url ng-model=inputURL> <button class=btn type=submit>Shorten</button> <span class=loader-container ng-show=searching><div class=loader-1></div></span></form><span ng-show=outputURL>littleURL: <code>{{ outputURL }}</code></span></div></div>'),a.put("components/footer/footer.html",'<div class=container><p>Angular Fullstack v3.4.2 | <a href=https://twitter.com/tyhenkel>@tyhenkel</a> | <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Issues</a></p></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarController><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="nav.isCollapsed = !nav.isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>littleurl</a></div><div uib-collapse=nav.isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in nav.menu" ui-sref-active=active><a ui-sref={{item.state}}>{{item.title}}</a></li></ul></div></div></div>')}]);