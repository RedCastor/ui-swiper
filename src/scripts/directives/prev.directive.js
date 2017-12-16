(function(angular) {
  'use strict';

  angular.module ( 'ui.swiper' ).directive ( 'uiSwiperPrev', PrevDirective );

  /* @ngInject */
  function PrevDirective () {
    return {
      restrict : 'AE',
      transclude : true,
      replace : true,
      require : '^uiSwiper',
      template : '<div class="swiper-button-prev" ng-transclude></div>',
      priority : 2,
      scope: true
    };
  }
}(angular));