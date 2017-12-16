(function(angular) {
  'use strict';

  angular.module ('ui.swiper').directive ('uiSwiperSlide', SlideDirective);

  /* @ngInject */
  function SlideDirective () {
    return {
      restrict : 'E',
      replace : true,
      transclude : true,
      template : '<div class="swiper-slide" ng-transclude></div>',
      require : '^uiSwiperSlides',
      priority : 3,
      link : function (scope, element, attrs) {
        var eventId = scope.$parent.$parent.$parent.uuid;
        scope.$watch('$last', function (value) {
          if (value)  {
            scope.$emit(eventId);
          }
        });
      }
    };
  }
}(angular));