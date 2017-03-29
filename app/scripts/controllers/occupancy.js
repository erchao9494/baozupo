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

	.controller('occupancy', ['$scope', '$stateParams', '$http', '$timeout', function($scope, $stateParams, $http, $timeout) {
		$http({
			url: 'http://47.88.16.225:408/users/' + $stateParams.uid,
			method: 'get'
		}).then(function(data) {
			$scope.name = data.data.name
		}, function() {

		})

		$scope.xwk_t = false
		$scope.xwk_title = "密码格式错误"
		$scope.xwk_ts = false
		$scope.xwk_titles = "两次密码不一致"
		$scope.xwk_tsk = false
		$scope.xwk_xg = function() {
			if($scope.x_password != undefined) {
				var psd = /^[a-zA-Z]\w{6,17}$/; //密码验证
				var xwk_mi = $scope.x_password;
				if(psd.test(xwk_mi)) {
					$scope.xwk_t = false
				} else {
					$scope.xwk_t = true
				}
			}

		}
		$scope.xwk_xgs = function() {
			if($scope.x_password != undefined) {
				var pp = $scope.x_password;
				if($scope.xwk_password.indexOf(pp) != -1) {
					$scope.xwk_ts = false
				} else {
					$scope.xwk_ts = true
				}
			}
		}
		$scope.xwk_sub = function() {
			if($scope.x_password != undefined && $scope.xwk_password != undefined && $scope.xwk_password.indexOf($scope.x_password) != -1) {
				console.log(123)
				$http({
					url: 'http://47.88.16.225:408/users/' + $stateParams.uid,
					method: "put",
					data: {
						password: $scope.x_password
					}
				}).then(function(data) {
					console.log(data.data.passward)
					$scope.xwk_tsk = true
					$timeout(function() {
						$scope.xwk_tsk = false
					}, 500)
					$scope.x_password = ""
					$scope.xwk_password = ""
				}, function() {
					console.log("shibai")
				})
			} else {
				$scope.xwk_ts = true
			}
		}


	}])