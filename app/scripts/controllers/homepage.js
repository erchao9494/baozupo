/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
	.controller('homepage', ['$scope', '$http', function($scope, $http) {
		$scope.smt_name = [];
		$scope.smt_jiage = [];

		//后台数据请求
		$http({
			method: 'get',
			url: 'http://47.88.16.225:408/list'
		}).then(function(e) {
			//			console.log(e.data)
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
		$scope.fn = function() {
			var time = $('.time').val()
			$http({
				url: 'http://47.88.16.225:408/title',
				method: 'post',
				data: {
					biaoti: $scope.qw,
					neirong: $scope.qr,
					time: time

				}
			}).then(function(r) {
				$scope.ar = r.data;
				location.reload('')
				localStorage.clear();

			}, function() {
				alert("数据请求失败")
			})

		}

		//获取备忘录数据
		$http({
			url: 'http://47.88.16.225:408/title',
			method: 'get'
		}).then(function(r) {
			$scope.ar = r.data;
			for(i in r.data) {
				$scope.qt = r.data[i].biaoti
				$scope.qy = r.data[i].neirong
				$scope.qu = r.data[i].time
			}
		}, function() {
			alert("数据请求失败")
		})

		$scope.dian = function(id) {
			console.log(id)
			$http({
				url: 'http://47.88.16.225:408/title/' + id,
				method: 'get'
			}).then(function(r) {

				console.log(r)

				$scope.qt = r.data.biaoti
				$scope.qy = r.data.neirong

			}, function() {
				alert("数据请求失败")
			})
		}

		//删除备忘录数据

		$scope.fn1 = function(id) {
			$http({
				url: 'http://47.88.16.225:408/title/' + id,
				method: 'delete'
			}).then(function(r) {
				$scope.ar = r.data;
				location.reload('')
			}, function() {
				alert("数据请求失败")
			})

		}

		//日历
		$(function() {
			//页面加载初始化年月
			var mydate = new Date();
			$(".f-year").html(mydate.getFullYear());
			$(".f-month").html(mydate.getMonth() + 1);
			showDate(mydate.getFullYear(), mydate.getMonth() + 1);

			//日历上一月
			$(".f-btn-jian ").click(function() {
				var mm = parseInt($(".f-month").html());
				var yy = parseInt($(".f-year").html());
				if(mm == 1) { //返回12月
					$(".f-year").html(yy - 1);
					$(".f-month").html(12);
					showDate(yy - 1, 12);
				} else { //上一月
					$(".f-month").html(mm - 1);
					showDate(yy, mm - 1);
				}
			})
			//日历下一月
			$(".f-btn-jia").click(function() {
				var mm = parseInt($(".f-month").html());
				var yy = parseInt($(".f-year").html());
				if(mm == 12) { //返回12月
					$(".f-year").html(yy + 1);
					$(".f-month").html(1);
					showDate(yy + 1, 1);
				} else { //上一月
					$(".f-month").html(mm + 1);
					showDate(yy, mm + 1);
				}
			})
			//返回本月
			$(".f-btn-fhby").click(function() {
				$(".f-year").html(mydate.getFullYear());
				$(".f-month").html(mydate.getMonth() + 1);
				showDate(mydate.getFullYear(), mydate.getMonth() + 1);
			})

			//读取年月写入日历  重点算法!!!!!!!!!!!
			function showDate(yyyy, mm) {
				var dd = new Date(parseInt(yyyy), parseInt(mm), 0); //Wed Mar 31 00:00:00 UTC+0800 2010  
				var daysCount = dd.getDate(); //本月天数  
				var mystr = ""; //写入代码
				var icon = ""; //图标代码
				var week = new Date(parseInt(yyyy) + "/" + parseInt(mm) + "/" + 1).getDay(); //今天周几
				var lastMonth; //上一月天数
				var nextMounth //下一月天数
				if(parseInt(mm) == 1) {
					lastMonth = new Date(parseInt(yyyy) - 1, parseInt(12), 0).getDate();
				} else {
					lastMonth = new Date(parseInt(yyyy), parseInt(mm) - 1, 0).getDate();
				}
				if(parseInt(mm) == 12) {
					nextMounth = new Date(parseInt(yyyy) + 1, parseInt(1), 0).getDate();
				} else {
					nextMounth = new Date(parseInt(yyyy), parseInt(mm) + 1, 0).getDate();
				}
				for(i = 0; i < daysCount; i++) {
					//计算上月空格数
					if(i % 7 == 0) {
						if(i < 7) { //只执行一次
							for(j = 0; j < week; j++) {
								mystr += "<div class='f-td f-null' style='color:#ccc;'>" + (lastMonth + j - 5 + week) + "</div>";
							}
						}
					}
					//这里为一个单元格，添加内容在此
					mystr += "<div class='f-td f-number'><span class='f-day'>" + (i + 1) + "</span>" +
						"</div>";
				}

				//表格不等高，只补充末行不足单元格
				if(7 - (daysCount + week) % 7 < 7) {
					for(k = 0; k < 7 - (daysCount + week) % 7; k++) { // week为今天周几 daysCount为本月天数  7-week为本行空格数 7-(daysCount+6-week)%7为最后一行有几个空格
						mystr += "<div class='f-td f-null' style='color:#ccc;'>" + (k + 1) + "</div>";
					}
				}

				//写入日历
				$(".f-rili-table .f-tbody").html(mystr);
				//给今日加class
				if(mydate.getFullYear() == yyyy) {
					if((mydate.getMonth() + 1) == mm) {
						var today = mydate.getDate();
						$(".f-rili-table .f-td").eq(today - 1 - week + 6).addClass("f-today");
					}
				}
				//绑定选择方法
				$(".f-rili-table .f-number").off("click");
				$(".f-rili-table .f-number").on("click", function() {
					$(".f-rili-table .f-number").removeClass("f-on");
					$(this).addClass("f-on");
				});

				//绑定查看方法
				$(".f-yuan").off("mouseover");
				$(".f-yuan").on("mouseover", function() {
					$(this).parent().find(".f-table-msg").show();
				});
				$(".f-table-msg").off("mouseover");
				$(".f-table-msg").on("mouseover", function() {
					$(this).show();
				});
				$(".f-yuan").off("mouseleave");
				$(".f-yuan").on("mouseleave", function() {
					$(this).parent().find(".f-table-msg").hide();
				});
				$(".f-table-msg").off("mouseleave");
				$(".f-table-msg").on("mouseleave", function() {
					$(this).hide();
				});
			}

		})

		//input时间框

		var end = {
			format: 'YYYY年MM月DD日 hh:mm:ss',
			minDate: $.nowDate(0), //设定最小日期为当前日期
			festival: true,
			maxDate: '2099-06-16 23:59:59', //最大日期
			choosefun: function(elem, datas) {
				end.minDate = datas; //开始日选好后，重置结束日的最小日期
				function getDate(strDate) {
					var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
						function(a) {
							return parseInt(a, 10) - 1;
						}).match(/\d+/g) + ')');
					return date;
				};
			}

		};

		var start = {
			format: 'YYYY年MM月DD日 hh:mm:ss',
			minDate: $.nowDate(0), //设定最小日期为当前日期
			isinitVal: true,

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
			}

		};

		$('#inpstart').jeDate(start);
		$('#inpend').jeDate(end);

	}])