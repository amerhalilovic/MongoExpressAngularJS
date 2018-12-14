var mojKontroler=angular.module("mojKontroler", [])

mojKontroler.controller("dzedo", ["$scope", "$http", function($scope, $http){

    $scope.students = [];

    $scope.init = function(){
        $http.get("http://localhost:3000/getAll").then(res => {
            $scope.students = res.data.studenti
        })
    }

    $scope.submit = function(){
        $http.post("http://localhost:3000/create", {
            name: $scope.ime
        }).then(res => {
            $scope.students.push(res.data);
        })
    }


}]) 
    
