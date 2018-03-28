/**
 * Created by zhijun on 2018/3/26.
 */
(function(angular){
	//获取模块,注意后面要有依赖的模块
	var myApp = angular.module("myapp",[]);
	//定义contentController
	myApp.controller("contentController",['$scope',function($scope){
		/*列表信息*/
		$scope.todos = [{
			id : 1,
			text : '打篮球',
			completed : false
		},{
			id : 2,
			text : '打运毛球',
			completed : false
		},{
			id : 3,
			text : '听音乐',
			completed :true
		},{
			id : 4,
			text : '画画',
			completed : false
		}];

		/*填写的文本信息*/
		$scope.text = "";

		/*增加数据*/
		$scope.add = function(){
			if($scope.text === ''){
				return;
			}
			var data = {},
			datalen = 0 ;
			datalen = $scope.todos.length ;
			//console.log(datalen);
			data.id = datalen + 1;
			data.text = $scope.text;
			data.completed = false;

			$scope.todos.unshift(data);

			console.log($scope.todos);
		};

		//清空数据
		$scope.clear = function(){
			$scope.todos = [];
		};

		//删除数据
		$scope.delete = function(num){
			//因为注册数组时从1开始，现在是用0开始
			var num = num;
			//id === num -->delete
			for(var i = 0;i < $scope.todos.length ; i++ ){
				var item = $scope.todos[i];
				if(item.id === num){
					$scope.todos.splice(i,1);
				}
			}
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
			 //console.log(num);
			 for(var i = 0;i < $scope.todos.length ; i++ ){
				 var item = $scope.todos[i];
				 if(item.id === num){
					 $scope.editingId = num;
				 }
			 }

		 };

		//取消编辑
		$scope.cancelEdit = function(){
			//重置
			$scope.editingId = -1;
		};


		//$scope.watch('$scope.text',function(new,old){
		//	console.log(new);
		//
		//});
	}]);
})(angular);
