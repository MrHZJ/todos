/**
 * Created by zhijun on 2018/3/26.
 */
(function(angular){
	//获取模块,注意后面要有依赖的模块
	var myApp = angular.module("myapp",['ngRoute']);
	myApp.config(["$routeProvider",function($routeProvider){
		$routeProvider.when('/:status',{
			//templateUrl :
			templateUrl : 'imfor',
			controller : 'contentController'
		}).otherwise({
			redirectTo : '/'
		})
	}]);
	//定义contentController
	myApp.controller("contentController",['$scope','$routeParams','$route','$window',function($scope,$routeParams,$route,$window){
		/*列表信息*/

		$scope.todos = [{
			id : 4,
			text : '打篮球',
			completed : false
		},{
			id : 3,
			text : '打运毛球',
			completed : false
		},{
			id : 2,
			text : '听音乐',
			completed :true
		},{
			id : 1,
			text : '画画',
			completed : false
		}];

		//获取路径的hash值
		myApp.filter('filter',function(target,source){
			console.log(target);
			console.log(source);
		});
		$scope.selector = {};
		$scope.status = $routeParams.status;
		console.log($scope.status)
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


		$scope.determine = function(source,target){
			//console.log(source)
			//console.log(target);
			return source === target;
		};


		var storage = $window.localStorage;
		if(storage['$scope_todos']){
			$scope.todos = JSON.parse(storage['$scope_todos']);
		}
		function save(){
			storage["$scope_todos"] = JSON.stringify($scope.todos);
		}
		var inNum = 0;
		/*填写的文本信息*/
		$scope.text = "";

		/*增加数据*/
		$scope.add = function(){
			/*重置设置*/
			inNum = 0;

			if($scope.text === ''){
				return;
			}
			var data = {};
			//让id自增
			if($scope.todos.length){
				data.id = $scope.todos[0].id+1;
			}else {
				data.id = 1;
			}

			data.text = $scope.text;
			data.completed = false;

			$scope.todos.unshift(data);
			/*重置文本框*/
			$scope.text = "";
			/*保存到本地*/
			save();
			//console.log($scope.todos);
		};

		//清空数据
		$scope.clear = function(){
			/*重置设置*/
			inNum = 0;
			var newArr = [];
			for(var i = 0;i < $scope.todos.length ; i++ ){
				var item = $scope.todos[i];
				if(!item.completed === true){
					newArr.push(item)
				}
			}
			$scope.todos = newArr;
			console.log($scope.todos);
			save()
		};

		//是否显示清除按钮
		$scope.isClear = function(){
			for(var i = 0;i < $scope.todos.length ; i++ ){
				var item = $scope.todos[i];
				//console.log('item.completed  :'+  item.completed)
				//console.log('i  :'+  i)
				if(item.completed === true){
					return true;
				}
			}
			return false;
		};

		//删除数据
		$scope.delete = function(num){

			for(var i = 0;i < $scope.todos.length ; i++ ){
				var item = $scope.todos[i];
				/*假如item.id与传进来的数字符合，就可以确认该元素了*/
				if(item.id === num){
					$scope.todos.splice(i,1);
				}
			}

			save();
		};

		/*是否全选*/
		var isAllCompletedSwitch = true;
		$scope.isAllCompleted = function(){
			for(var i = 0; i < $scope.todos.length ; i++){
				var item = $scope.todos[i];
				item.completed = isAllCompletedSwitch;
			}

			isAllCompletedSwitch = !isAllCompletedSwitch;
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

	}]);
})(angular);
