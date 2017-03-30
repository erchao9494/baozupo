'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
.controller('mainpath',["$scope","$http","$stateParams",function ($scope,$http,$stateParams) {
      $scope.lzk_arr = [];
      $http({
        url:'http://47.88.16.225:408/users/'+$stateParams.uid
        ,method:'get'
      }).then(function(reqs){
         $scope.lzk_arr = reqs.data;
      },function(){
        alert('失败')
      })
}])
