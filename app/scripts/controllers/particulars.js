/**
 * Created by 李志锴 on 2017/3/18.
 */
angular.module('yeomanApp')
.controller('particulars',['$scope','$http','$timeout', function ($scope,$http,$timeout) {
  //程璐宇
  
  //初始化
 	$scope.fuceng1 = false;
 	$scope.fanghao = false;
  	$scope.sctp = false;
  	$scope.fuceng2 = false;
  	$scope.qingshuru = true;
  	$scope.chenggong = false;
  	$scope.xianshi = false;
  	
  	//添加房号
  	$scope.add = function(){
  		$scope.fuceng1 = true;
 	    $scope.fanghao = true;
  	}
  	
	//	修改/删除
	$scope.add1 =function(){
		
		if($scope.xianshi ==false){
			$scope.xianshi =true
		}else{
			$scope.xianshi =false;
		}
		
	}
	
	
  	//×号
	$scope.tab = function(){
  		$scope.fuceng1 = false;
  		$scope.fanghao = false;
	}
	
	//取消
	$scope.tab1 = function(){
  		$scope.fuceng1 = false;
  		$scope.fanghao = false;
    }
	
//	先获取
    $http({
		    	url:'http://47.88.16.225:408/room',
		    	method:'get',
		    	
		    }).then(function(data){
		    	$scope.fanghao = false;
		    	$scope.fuceng1 = false;
		    	$scope.fangjianhao = '';
		    	$scope.arr = data.data;
		    	console.log(data.data)
		    },function(error){
		    	alert('error')
		    })
	
	//保存
    $scope.arr=[];
	$scope.tab2 = function(){
		if($scope.fangjianhao ==""){
			$scope.qingshuru = false;
			
		}else{
			
		$http({
			url:'http://47.88.16.225:408/room',
			method:'post',
			data:{
				fangjianhao:$scope.fangjianhao
			}
		}).then(function(data){
		    //	获取 添加
		     $scope.chenggong = true;
		    	$timeout(function(){
		    	$scope.fanghao = false;
		    	$scope.fuceng1 = false;
		    	$scope.chenggong = false;
		    	},1000)
		    $http({
		    	url:'http://47.88.16.225:408/room',
		    	method:'get',
		    	
		    }).then(function(data){
		    	
		    	
		    	$scope.fangjianhao = '';
		    	$scope.arr = data.data;
		    	console.log(data.data)
		    },function(error){
		    	alert('error')
		    })
			console.log(data.data)
		},function(error){
			alert('error')
		})
		}
		
	}
	
	
	//	删除
	
	$scope.del =function(idd,index){
		console.log(idd)
		$http({
			url:'http://47.88.16.225:408/room/'+ idd,
			method:'delete',
			
		}).then(function(data){
			$scope.arr.splice(index, 1);
			console.log(data.data)
		},function(error){
			alert('error')
		})
	}
  	
	
	
	
	
	//图片
	$scope.tab3 = function(){
		$scope.sctp = true;
  		$scope.fuceng2 = true;
	}
	
	//×号
	$scope.tab4 = function(){
  		$scope.fuceng2 = false;
  		$scope.sctp = false;
    }
	
	

}])

