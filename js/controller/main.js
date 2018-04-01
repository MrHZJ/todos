/**
 * Created by zhijun on 2018/4/1.
 */
(function(angular){
	'use strict';
	var controllers = angular.module('app.controller.main',['app.service.main']);
	controllers.controller("contentController",['$scope','$routeParams','$route','$window','mainservice',function($scope,$routeParams,$route,$window,mainservice){
		/*列表信息*/
		$scope.todos = mainservice.get();

		/*填写的文本信息*/
		$scope.text = "";

		//改变状态
		$scope.change = function(){
			//保存数据
			mainservice.change($scope.todos);
		};

		/*增加数据*/
		$scope.add = function(){
			//假如为空则不执行
			if($scope.text === ''){
				return;
			}
			console.log(132)
			$scope.todos = mainservice.add($scope.text);
			console.log(132)
			/*重置文本框*/
			$scope.text = "";
			/*保存到本地*/

		};

		//清空数据
		$scope.clear = function(){
			$scope.todos = mainservice.clear($scope.todos);
		};

		//是否显示清除按钮
		$scope.isClear = function(){
			for(var i = 0;i < $scope.todos.length ; i++ ){
				var item = $scope.todos[i];
				if(item.completed === true){
					return true;
				}
			}
			return false;
		};

		//删除数据
		$scope.delete = function(num){
			$scope.todos = mainservice.delete(num);
			//save();
		};

		/*是否全选*/

		$scope.isAllCompleted = function(){
			$scope.todos = mainservice.isAllCompleted();


		};

		/*文件编辑*/
		$scope.editingId = -1;
		$scope.edit = function(num){
			$scope.editingId = num;
		};
		//取消编辑
		$scope.cancelEdit = function(){
			//重置
			$scope.editingId = -1;
		};

		//筛选
		$scope.selector = {};
		$scope.status = $routeParams.status;
		switch ($scope.status){
			case 'active':
				$scope.selector = {completed : false};
				break;
			case 'completed':
				$scope.selector = {completed : true};
				break;
			default :
				var status = $scope.status;
				$route.updateParams({ status : ''});
				$scope.status = status;
				$scope.selector = {};
				break;
		}

		//具体确定筛选条件
		$scope.determine = function(source,target){
			return source === target;
		};



	}]);
})(angular);
