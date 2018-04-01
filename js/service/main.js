/**
 * Created by zhijun on 2018/4/1.
 */
(function(angular){
	'use strict';
	angular.module('app.service.main',[])
		.service('mainservice',[function(){
			/*列表信息*/
			var todos = [{
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

			//往外暴露数据
			this.get = function(){
				return todos;
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
			};

			//清空数据
			this.clear = function(){
				/*重置设置*/
				var newArr = [];
				for(var i = 0;i < todos.length ; i++ ){
					var item = todos[i];
					if(!item.completed === true){
						newArr.push(item)
					}
				}
				todos = newArr;

				return todos;
			};

			//是否全选
			this.isAllCompleted = function(bool){
				var isAll = bool;
				for(var i = 0; i < todos.length ; i++){
					var item = todos[i];
					item.completed = isAll;
				}

				isAll = !isAll;
			};
		}])
})(angular);
