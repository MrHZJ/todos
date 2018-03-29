/**
 * Created by zhijun on 2018/3/26.
 */
(function(angular){
	//获取模块,注意后面要有依赖的模块
	var myApp = angular.module("myapp",[]);
	//定义contentController
	myApp.controller("contentController",['$scope','$location','$timeout','$window',function($scope,$location,$timeout,$window){
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

		//console.log($window)
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
			//datalen = 0 ;
			//datalen = $scope.todos.length ;
			//console.log(datalen);
			if($scope.todos.length){
				data.id = $scope.todos[0].id+1;
			}else {
				data.id = 1;
			}

			data.text = $scope.text;
			data.completed = false;

			$scope.todos.unshift(data);

			save();
			console.log($scope.todos);
		};

		//清空数据
		$scope.clear = function(){
			/*重置设置*/
			inNum = 0;

			$scope.todos = [];
			save()
		};

		//删除数据
		$scope.delete = function(num){
			/*重置设置*/
			inNum = 0;

			var num = num;
			//id === num -->delete
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

		//筛选器
		/*$location的用法
		$location.absUrl();// http://example.com:8080/#/some/path?foo=bar&baz=xoxo#hashValue
		$location.url();// some/path?foo=bar&baz=xoxo
		$location.protocol();// http
		$location.host();// example.com
		$location.port();// 8080
		$location.path();// /some/path
		$location.search();// {foo: 'bar', baz: 'xoxo'}
		$location.search('foo', 'yipee');
		$location.search();// {foo: 'yipee', baz: 'xoxo'}
		 $location.hash();// #hashValue
		*/

		var newList = [];
		$scope.filterStatus = 0;
		 $scope.filterList = function(){
			 var filterWay = '';

			 function getUrl(){
				 filterWay = $location.url();

				 switch (filterWay){
					 case '/active':
						 filData(false);
						 break;
					 case '/completed':
						 filData(true);
						 break;
					 case '/':
						 filData();
						 break;
				 }
			 }
			 $timeout(getUrl,50);


			 function filData(option){
				 //如果没有参数，那么返回$scope.todos
				 if(inNum === 0){
					 newList = [];
					 for(var i = 0;i <$scope.todos.length ; i++ ){
						var item = $scope.todos[i];
						newList.push(item);
					 }
					 //newList = $scope.todos;
				 }else {
					 $scope.todos = [];
					 for(var i = 0;i <newList.length ; i++ ){
						 var item = newList[i];
						 $scope.todos.push(item);
					 }
					 //$scope.todos = newList
				 }
				 //console.log(option)
				 if(option == undefined){
					 $scope.filterStatus = 0;

					 save()
					 return $scope.todos
				 }

				 if(!option){//active
					 $scope.filterStatus = 1;
				 }else {//completed
					 $scope.filterStatus = 2;
				 }

				 //console.log($scope.todos)
				 //console.log(newList);

				 inNum++;
				 //储存状态值对应的索引
				 var numArr = [];


				 //找出删除元素的位置，储存在numArr里面
				 for(var i = 0;i < newList.length ; i++ ){
					 var item = newList[i];
					 //console.log('item.completed  :'+  item.completed)
					 //console.log('i  :'+  i)
					 if(!item.completed === option){
						 numArr.push(i)
					 }
				 }

				 //倒置数组numArr
				 numArr = numArr.sort(function(a,b){ return (a < b)});

				 //console.log(numArr)
				 //对应数组的位置删除
				 for(var j = 0;j < numArr.length  ; j++){//因为执行的过程元素不断减少，所以会导致最终少于原来的长度值
					 $scope.todos.splice(numArr[j],1)
				 }

				 save()
			 };
		 };



		//$scope.watch('$scope.text',function(new,old){
		//	console.log(new);
		//
		//});
	}]);
})(angular);
