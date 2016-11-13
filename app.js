(function(){
    'use strict';
    angular.module('flickrApp', ['ngMaterial'])
        .controller('ListController',['$scope','$http', function ($scope, $http) {
            $scope.results = [];
            $scope.search= function(){
                $scope.issearching = true;
                $http({
                    method:"GET",
                    url: "https://api.flickr.com/services/rest",
                    params:{
                        method:"flickr.photos.getRecent",
                        api_key:"cd51c35deb0b194c8c3ccbf6e18954c5",
                        text: $scope.searchText,
                        format: "json",
                        nojsoncallback:1
                    }
                    }
                ).success(function (data) {
                    $scope.issearching = false;
                    $scope.results = data;
                    console.log(data);
                }).error(function (error) {
                    console.error(error);
                });
            };
            $scope.search();
            $scope.getSizeOfImage = function(id){
                $http({
                    method:"GET",
                    url: "https://api.flickr.com/services/rest",
                    params:{
                        method:"flickr.photos.getSizes",
                        api_key:"cd51c35deb0b194c8c3ccbf6e18954c5",
                        photo_id: id,
                        text: $scope.searchText,
                        format: "json",
                        nojsoncallback:1
                    }
                }).success(function (data) {
                    $scope.sizes = data.sizes;
                })
            };
            $scope.getImageBySize = function(size, photo){
                console.log(size);
                console.log(photo);
                $scope.sourceImage = size.source;
            };

        }]);
})();