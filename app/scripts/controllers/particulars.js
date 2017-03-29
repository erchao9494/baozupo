/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
	.controller('particulars', ['$scope', '$http', '$timeout', '$state', '$stateParams', function($scope, $http, $timeout, $state, $stateParams) {
		//程璐宇

		//初始化
		$scope.fuceng1 = false;
		$scope.fanghao = false;
		$scope.sctp = false;
		$scope.fuceng2 = false;
		$scope.xgfh = false;
		//		提示语
		$scope.qingshuru = true;
		$scope.xiangtong = true;
		$scope.hanzi = true;

		$scope.chenggong = false;
		$scope.xianshi = false;

		$scope.del = function(idd, index) {
			console.log(idd)
			$http({
				url: 'http://47.88.16.225:408/room/' + idd,
				method: 'delete',

			}).then(function(data) {
				$scope.arr.splice(index, 1);
				console.log(data.data)
			}, function(error) {
				alert('error')
			})
		}

		$scope.tab3 = function() {
			$scope.sctp = true;
			$scope.fuceng2 = true;
		}

		$scope.tab4 = function() {
			$scope.fuceng2 = false;
			$scope.sctp = false;
		}

		$scope.add1 = function() {
			if($scope.xianshi == false) {
				$scope.xianshi = true

			} else {
				$scope.xianshi = false
			}
		}

		//     修改按钮

		$scope.xiugai = function(id) {
			$scope.fuceng1 = true;
			$scope.xgfh = true;

			$scope.fangzi = id.fangjianhao

			//		  修改房间号
			$scope.tab6 = function() {
				console.log(id.fangjianhao)
				      	$http({
								url: 'http://47.88.16.225:408/room/' + id.id,
								method: 'put',
								params:{
									fangjianhao:$scope.fangjianhao
								}
				
							}).then(function(data) {
							
								console.log(data)
							}, function(error) {
								alert('error')
							})

			}
		}

		//         排序
		$scope.paixu = function() {
			$scope.gengduo = 'fangjianhao';
		}

		//添加房号
		$scope.add = function() {
			$scope.fuceng1 = true;
			$scope.fanghao = true;
		}

		//	修改/删除
		$scope.add1 = function() {

			if($scope.xianshi == false) {
				$scope.xianshi = true
			} else {
				$scope.xianshi = false;
			}

		}

		//×号
		$scope.tab = function() {
			$scope.fuceng1 = false;
			$scope.fanghao = false;
			$scope.xgfh = false;
		}

		//取消
		$scope.tab1 = function() {
			$scope.fuceng1 = false;
			$scope.fanghao = false;
		}
		var id = $stateParams.id;

		//	先获取
		$http({
			url: 'http://47.88.16.225:408/room',
			method: 'get',
			params: {
				id: id
			}

		}).then(function(data) {
			$scope.fanghao = false;
			$scope.fuceng1 = false;
			$scope.fangjianhao = '';
			$scope.arr = data.data;

			$scope.num = 0;
			$scope.num = Math.ceil(data.data.length / 10)
			$scope.currentpage = 0;
			$scope.listpage = 10;
			$scope.page = 1;
			$scope.next = function() {
				if($scope.currentpage < $scope.num - 1) {
					$scope.currentpage++;
					$scope.page += 1;
				}
			}
			$scope.prev = function() {
				if($scope.currentpage > 0) {
					$scope.currentpage--;
					$scope.page -= 1;
				}
			}
			console.log(data.data)
		}, function(error) {
			alert('error')
		})

		//保存
		$scope.arr = [];
		$scope.tab2 = function() {

			if($scope.fangjianhao == "") {
				$scope.qingshuru = false;
			} else {
				$scope.qingshuru = true;
				$http({
					url: 'http://47.88.16.225:408/room',
					method: 'post',
					data: {
						fangjianhao: $scope.fangjianhao
					}
				}).then(
					function(data) {
						//	获取 添加
						$scope.chenggong = true;
						$timeout(function() {
							$scope.fanghao = false;
							$scope.fuceng1 = false;
							$scope.chenggong = false;
						}, 1000)
						$http({
							url: 'http://47.88.16.225:408/room',
							method: 'get',

						}).then(function(data) {

							$scope.arr = data.data;　
							$scope.fangjianhao = '';　

							console.log(data.data)
						}, function(error) {
							alert('error')
						})
						console.log(data.data)
					},
					function(error) {
						alert('error')
					})
			}

		}
	}])

	//	 自定义过滤器
	.filter("myfilter", function() {
		return function(list, start) {
			return list.slice(start)
		}
	})