/**
 * Created by zhijun on 2018/4/1.
 */
(function(angular){
	'use strict';
	angular.module('app.service.main',[])
		.service('mainservice',['$window',function($window){
			/*列表信息*/
			var todos = [];

			//永久保存
			var storage = $window.localStorage;
			if(storage['todos']){
				todos = JSON.parse(storage['todos']);
			}
			save();
			function save(){
				storage["todos"] = JSON.stringify(todos);
			}

			//往外暴露数据
			this.get = function(){
				return todos;
			};

			//保存状态改变的值
			this.change = function(data){
				todos = data;

				save();
			};
			/*增加数据*/
			this.add = function(text){
				var data = {};
				//让id自增
				if(todos.length){
					data.id = todos[0].id+1;
				}else {
					data.id = 1;
				}

				data.text = text;
				data.completed = false;

				todos.unshift(data);

				save();
				return todos;
			};

			//删除数据
			this.delete = function(num){
				for(var i = 0;i < todos.length ; i++ ){
					var item = todos[i];
					/*假如item.id与传进来的数字符合，就可以确认该元素了*/
					if(item.id === num){
						todos.splice(i,1);
					}
				}

				save();
				return todos;
			};

			//清空数据
			this.clear = function(data){
				/*重置设置*/
				var newArr = [];
				for(var i = 0;i < data.length ; i++ ){
					var item = data[i];
					if(!item.completed === true){
						newArr.push(item)
					}
				}
				todos = newArr;

				save();
				return todos;
			};

			//是否全选
			var isAllComp = true;
			this.isAllCompleted = function(){
				for(var i = 0; i < todos.length ; i++){
					var item = todos[i];
					item.completed = isAllComp;
				}

				isAllComp = !isAllComp;

				save();
				return todos;
			};


		}])
})(angular);
