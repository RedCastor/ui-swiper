(function(angular) {
  'use strict';

  angular.module ( 'ui.swiper' ).directive ( 'uiSwiperSlides', SlidesDirective );

  /* @ngInject */
  function SlidesDirective () {
    return {
      restrict : 'E',
      transclude : true,
      replace : true,
      require : '^uiSwiper',
      template : '<div class="swiper-wrapper" ng-transclude></div>',
      priority : 2,
      controller : function () {}
    };
  }
}(angular));