# ui.swiper
### Most modern mobile touch slider for angular js

This is an angular implementation of http://idangero.us/swiper/get-started/
This requires no dependencies and written entirely in angular! ( That means no swiper install or jquery install necessary )
If you want to configure the swiper just apply the options as attributes to the swiper directive.
A reference to the swiper api can be found here : http://idangero.us/swiper/api/

This module also works with webpack and es6.

# Install

Install bower package fork:

```bash
bower install --save https://github.com/RedCastor/ui-swiper.git#2.4.0-redcastor
```


# Add files

```
<link rel="stylesheet" href="bower_components/angular-ui-swiper/dist/angular-ui-swiper.css">
<script src="bower_components/angular-ui-swiper/dist/angular-ui-swiper.js"></script>
```


# Usage
Add the module dependency to your project
`angular.module('app', ['ui.swiper']);`

Sample Usage :
```
<ui-swiper>
  <ui-swiper-slides>
    <ui-swiper-slide>Slide1</ui-swiper-slide>
    <ui-swiper-slide>Slide2</ui-swiper-slide>
  </ui-swiper-slides>
  <ui-swiper-prev></ui-swiper-prev>
  <ui-swiper-next></ui-swiper-next>
  <ui-swiper-pagination></ui-swiper-pagination>
</ui-swiper-swiper>
```
See here you added a swiper with pagination and directional buttons.
Within the slide tag you can put **whatever html you want to put in there!**

For more examples you can look at the [demo page](http://redcastor.github.io/ui-swiper/demo).
