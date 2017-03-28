/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
	.controller('homepage', ['$scope', '$http', function($scope, $http) {
		$scope.smt_name = [];
		$scope.smt_jiage = [];
		//日历
		$scope.arr = [];
		for(var i = 0; i < 32; i++) {
			$scope.arr.push(i);
		}

		//后台数据请求
		$http({
			mothed: 'get',
			url: 'http://47.88.16.225:408/list'
		}).then(function(e) {
			console.log(e.data)
			$scope.ad = e.data;
			for(i in e.data) {
				$scope.smt_name.push(e.data[i].xingming);
				$scope.smt_jiage.push(e.data[i].jiage);
			}

			$scope.labels = $scope.smt_name;
			$scope.series = ['价格：'];
			$scope.data = [
				$scope.smt_jiage
			];
		}, function() {
			alert('数据请求失败')
		})

		//备忘录后台数据
		$scope.fn = function(){
			$http({
				url: 'http://47.88.16.225:408/list',
				mothed: 'post',
				data: {
					biaoti: $scope.qw,
					neirong: $scope.qr
				}
			}).then(function(r) {
				console.log(r.data)
			}, function() {
				alert("数据请求失败")
			})

		}

		//手风琴js

		$(function() {
			var Accordion = function(el, multiple) {
				this.el = el || {};
				this.multiple = multiple || false;

				// Variables privadas
				var links = this.el.find('.link');
				// Evento
				links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
			}

			Accordion.prototype.dropdown = function(e) {
				var $el = e.data.el;
				$this = $(this),
					$next = $this.next();

				$next.slideToggle();
				$this.parent().toggleClass('open');

				if(!e.data.multiple) {
					$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
				};
			}

			var accordion = new Accordion($('#accordion'), false);
		});

		// 当前时间
		function current() {
			var d = new Date(),
				str = '';
			str += d.getFullYear() + '年'; //获取当前年份 
			str += d.getMonth() + 1 + '月'; //获取当前月份（0——11） 

			if(d.getDate() < 10) {
				str += '0' + d.getDate() + '日';
			} else {
				str += d.getDate() + "日"
			}

			if(d.getHours() < 10) {
				str += '0' + d.getHours() + ':';
			} else {
				str += d.getHours() + ":"
			}

			if(d.getMinutes() < 10) {
				str += '0' + d.getMinutes() + ':';
			} else {
				str += d.getMinutes() + ":"
			}
			if(d.getSeconds() < 10) {
				str += '0' + d.getSeconds();
			} else {
				str += d.getSeconds()
			}
			return str;
		}
		setInterval(function() { $("#nowTime").html(current) }, 1000);

	}])