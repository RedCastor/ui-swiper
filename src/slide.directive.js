'use strict';

angular
  .module ('swiper')
  .directive ('slide', SlideDirective);

/* @ngInject */
function SlideDirective () {
  return {
    restrict : 'E',
    replace : true,
    transclude : true,
    template : '<div class="swiper-slide" ng-transclude></div>',
    scope : {}
  }
}