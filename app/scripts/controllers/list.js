/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
	.controller('list', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
		//薛文凯
		$scope.shu = 0;
		$scope.fn = function() {
			if($scope.shu < 1) {

			} else {
				$scope.shu -= 1
			}
		}

		$scope.fn1 = function() {
			$scope.shu += 1
		}

		//日历
		var start = {
			format: 'YYYY年MM月DD日 hh:mm:ss',
			minDate: $.nowDate(0), //设定最小日期为当前日期
			isinitVal: true,
			festival: true,
			ishmsVal: false,
			maxDate: '2099-06-30 23:59:59', //最大日期
			choosefun: function(elem, datas) {
				end.minDate = datas; //开始日选好后，重置结束日的最小日期
				function getDate(strDate) {
					var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
						function(a) {
							return parseInt(a, 10) - 1;
						}).match(/\d+/g) + ')');
					return date;
				};
				//转化成时间戳
				var date = getDate(datas);
				date = new Date(date);
				window.localStorage.startTimer = date.valueOf()

			}

		};
		//console.log(start)
		var end = {
			format: 'YYYY年MM月DD日 hh:mm:ss',
			minDate: $.nowDate(0), //设定最小日期为当前日期
			festival: true,
			maxDate: '2099-06-16 23:59:59', //最大日期
			choosefun: function(elem, datas) {
				start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
				function getDate(strDate) {
					var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
						function(a) {
							return parseInt(a, 10) - 1;
						}).match(/\d+/g) + ')');
					return date;
				};
				//转化成时间戳
				var date = getDate(datas);
				date = new Date(date);
				window.localStorage.daoqiTimer = date.valueOf()
			}
		};
		$('#inpstart').jeDate(start);
		$('#inpend').jeDate(end);
		//或者是
		$.jeDate('#inpstart', start);
		$.jeDate('#inpend', end);

		//添加
		$scope.arr = [];
		$scope.next = function() {
			$http({
				url: "http://47.88.16.225:408/list",
				method: "post",
				data: {
					xingming: $scope.xingming,
					lianxidianhua: $scope.lianxidianhua,
					shenfenzhenghao: $scope.shenfenzhenghao,
					juzhudi: $scope.juzhudi,
					ruzhushijian: localStorage.startTimer,
					daoqishijian: localStorage.daoqiTimer,
					renshu: $scope.shu,
					neirong: $scope.neirong
				}
			}).then(function(data) {
				console.log(1);
				$http({
					url: "http://47.88.16.225:408/room",
					method: "put",
					data: {
						zhuangtai: "true"
					}
				}).then(function() {
					console.log(2)
				})
				console.log(data)
			})
		}

		//浮层

		$scope.list = function() {
			$(".xwk_bigbox").slideDown(300)
			$(".xwk_hint").slideUp(300)
		}
		$scope.back = function() {
			$(".xwk_bigbox").slideUp(200)
			$(".xwk_hint").slideDown(100)
		}

	}])