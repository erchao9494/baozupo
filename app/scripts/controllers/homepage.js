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
		$scope.fn = function(){

			$http({
				url: 'http://47.88.16.225:408/title',
				method: 'post',
				data: {
					biaoti: $scope.qw,
					neirong: $scope.qr,
					time:current()
				}
			}).then(function(r) {
				$scope.ar = r.data;
				location.reload('')
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
                for(i in r.data){
                	$scope.qt = r.data[i].biaoti
				    $scope.qy= r.data[i].neirong
				    $scope.qu= r.data[i].time
                }
			}, function() {
				alert("数据请求失败")
			})

			$scope.dian = function(id){
				console.log(id)
				$http({
				url: 'http://47.88.16.225:408/title/'+id,
				method: 'get'
			}).then(function(r) {

				console.log(r)

                	$scope.qt = r.data.biaoti
				    $scope.qy= r.data.neirong

			}, function() {
				alert("数据请求失败")
			})
			}


		//删除备忘录数据

		$scope.fn1 = function(id){
//			console.log(id)
			$http({
				url: 'http://47.88.16.225:408/title/'+id,
				method: 'delete'
			}).then(function(r) {
				$scope.ar = r.data;
//				console.log(r.data)
				location.reload('')
			}, function() {
				alert("数据请求失败")
			})

		}


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


		//日历

		setInterval(function(){
    	calendar()
    },1000)

    function calendar() {
        var today = new Date();

        var year = today.getFullYear();      //本年
        var month = today.getMonth() + 1;    //本月
        var day = today.getDate();           //本日

        //本月第一天是星期几（距星期日离开的天数）
        var startDay = new Date(year, month - 1, 1).getDay();

        //本月有多少天(即最后一天的getDate()，但是最后一天不知道，我们可以用“上个月的0来表示本月的最后一天”)
        var nDays = new Date(year, month, 0).getDate();

        //开始画日历
        var numRow = 0;  //记录行的个数，到达7的时候创建tr
        var i;        //日期
        var html = '';
        html += '<table id="Body" width="212"><tbody>';
        //第一行
        html += '<tr>';
        for (i = 0; i < startDay; i++) {
            html += '<td></td>';
            numRow++;
        }
        for (var j = 1; j <= nDays; j++) {
            //如果是今天则显示红色
            if (j == day) {
                html += '<td style="color:red" onclick="' + "alert('今天是" + j + "号');" + '">';
                html += j;    //开始加日期
            }
            else {
                html += '<td onclick="' + "alert('你点的是" + j + "号');" + '">';
                html += j;    //开始加日期
            }
            html += '</td>';
            numRow++;
            if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
                numRow = 0;
                html += '</tr><tr>';
            }
        }


        html += '</tbody></table>';
        document.getElementById("Container").innerHTML = html;

 
//      html += '</tbody></table>';
//      document.getElementById("Container").innerHTML = html;
>>>>>>> origin/master
    }

	}])
