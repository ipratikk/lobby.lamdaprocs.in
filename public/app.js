var myApp = angular.module('myApp',[]);
myApp.controller('dataCtrl',['$scope', '$http', function($scope, $http){
	console.log('I am incharge bitch!');
	var refresh = function(){
		$http.get('/data').success(function(response){
			console.log('I got the data bitch!');
			$scope.data=response;
			$scope.inData=null;
		});
	};

	refresh();

	$scope.addData = function(){
		console.log($scope.inData);
		$http.post('/addData',$scope.inData).success(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.removeData = function(id){
		console.log(id);
		$http.delete('/removeData/'+id).success(function(response){
			refresh();
		});
	};
}]);
