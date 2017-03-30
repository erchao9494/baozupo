/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
	.controller('occupancy', ['$scope', '$stateParams', '$http', '$timeout', function($scope, $stateParams, $http, $timeout) {
		$scope.arr = [];
		$http({
			url: 'http://47.88.16.225:408/users/' + $stateParams.uid,
			method: 'get'
		}).then(function(data) {
			$scope.arr = data.data;
		}, function() {

		})
		//获取昵称

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
				var pp = $scope.x_passwod;
				if($scope.xwk_password.indexOf(pp) != -1) {
					$scope.xwk_ts = false
				} else {
					$scope.xwk_ts = true
				}
			}
		}
		//密码修改验证、、
		
		$scope.xwk_sub = function() {

			if($scope.x_password != undefined && $scope.xwk_password != undefined && $scope.xwk_password.indexOf($scope.x_password) != -1) {
				console.log(123)
				$http({
					url: 'http://47.88.16.225:408/users/' + $stateParams.uid,
					method: "put",
					data: {
						img:str,
						username:"lizhikai111",
						name: $scope.name,
						password: $scope.x_password
					}
				}).then(function(data) {

					$scope.xwk_tsk = true;
					str = null;
					$http({
						url: 'http://47.88.16.225:408/users/' + $stateParams.uid,
						method: 'get'
					}).then(function(data) {
						$scope.arr = data.data;
					}, function() {

					})
					$scope.x_password = ""
					$scope.xwk_password = ""
				}, function() {
					console.log("shibai")
				})
			} else {
				$scope.xwk_ts = true
			}
		}
		//点击修改提交

		if(typeof(FileReader) === 'undefined') {
			$("#result").innerHTML = "FileReader is not supported...";
			$("#img_input").setAttribute('disabled', 'disabled')
		} else {
//			$("#img_input").add('change', readFile, false);
			img_input.addEventListener('change', readFile, false);
			
		}
		
		function readFile() {
			var file = this.files[0];
			if(!/image\/\w+/.test(file.type)) {
				alert("image only please.");
				return false;
			}
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				var img = new Image,
					width = 100, //image resize
					quality = 0.8, //image quality
					canvas = document.createElement("canvas"),
					drawer = canvas.getContext("2d");
				img.src = this.result;

				img.onload = function() {
					canvas.width = width;
					canvas.height = width * (img.height / img.width);
					drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
					img.src = canvas.toDataURL("image/jpeg", quality);
//					 console.log(img.src);
					// result.innerHTML = img.src;
					// img_area.innerHTML = '<img  src="' + img.src + '" />';
					// sessionStorage.img = img.src;
					str = img.src;
				}

			}
		}

	}])