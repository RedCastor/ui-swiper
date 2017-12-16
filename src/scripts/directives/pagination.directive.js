(function(angular) {
  'use strict';

  angular.module ( 'ui.swiper' ).directive ( 'uiSwiperPagination', PaginationDirective );

  /* @ngInject */
  function PaginationDirective () {
    return {
      restrict : 'AE',
      transclude : true,
      replace : true,
      require : '^uiSwiper',
      template : '<div class="swiper-pagination" ng-transclude></div>',
      priority : 2
    };
  }
}(angular));
