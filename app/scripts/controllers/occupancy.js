/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
	.controller('occupancy', ['$scope', '$http', function($scope, $http) {
		//初始化
		$scope.arr = [];
		//时间戳
		$scope.time = new Date().getTime();
		$scope.ary = [];
		$http({
			url: 'http://47.88.16.225:408/list',
			method: 'get'
		}).then(function(data) {
			if(data.data.length > 0){
				$scope.daoqi = true;
				for(var i=0;i<data.data.length;i++){
					if(Math.floor((data.data[i].daoqishijian-$scope.time)/(1000 * 60 * 60 * 24)) < 30){
						$scope.arr.push(data.data[i]);
						$scope.ary.push(Math.floor((data.data[i].daoqishijian-$scope.time)/(1000 * 60 * 60 * 24)))
					}
				}
			}else{
				$scope.zanwu = true;
			}
		}, function(error) {
			alert('error')
		})

	}])