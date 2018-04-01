/**
 * Created by zhijun on 2018/3/26.
 */
(function(angular){
	//获取模块,注意后面要有依赖的模块
	var myApp = angular.module("myapp",['ngRoute','app.controller.main']);
	myApp.config(["$routeProvider",function($routeProvider){
		$routeProvider.when('/:status?',{
			//templateUrl :
			templateUrl : 'imfor',
			controller : 'contentController'
		}).otherwise({
			redirectTo : '/'
		})
	}]);
	//定义contentController

})(angular);
