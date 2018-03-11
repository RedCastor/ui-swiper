(function(angular) {

    'use strict';

    var app = angular.module ('app', ['mm.foundation', 'ui.swiper']);

    app.controller ('mainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.breakpoints = {
            '0':{'slidesPerView':1},
            '480':{'slidesPerView':2},
            '768':{'slidesPerView':3},
            '1025':{'slidesPerView':4}
        };

        $scope.onTransitionStart = function (swiper) {
            alert ("The current index is : " + swiper.activeIndex);
        };

        $scope.slides = [];

        $timeout(function () {
            $scope.slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];
        }, 1000);


        $scope.setSlide = function (index) {
            $scope.instance.slideTo(index, 300);
        };
    }]);
}(angular));
