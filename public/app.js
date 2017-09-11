var myApp = angular.module('myApp',[]).config( ['$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|steam|bitcoin):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);
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
                var today = new Date();
                $scope.inData.date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                $scope.inData.time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
                console.log($scope.inData);
                if($scope.inData.name.indexOf("steam://") !== -1){} //when empty name is passed, it creates error and thus terminates the process
                if($scope.inData.link.indexOf("steam://") !== -1){  //when empty link is passed, it creates arror and thus terminates the process
                        $scope.inData.type = 0;
                }else{
                        $scope.inData.type=1;
                }
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
