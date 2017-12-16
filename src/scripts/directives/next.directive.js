(function(angular) {
    'use strict';

    angular.module('ui.swiper').directive('uiSwiperNext', NextDirective);

    /* @ngInject */
    function NextDirective() {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            require: '^uiSwiper',
            template: '<div class="swiper-button-next" ng-transclude></div>',
            priority: 2
        };
    }
}(angular));