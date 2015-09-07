(function () {

'use strict';

var querySelector = document.querySelector.bind(document);
var ctn = querySelector('.ctn-curtain');

var app = angular.module('app', ['firebase']);

app.controller('MainCtrl', function($scope, $element, $firebaseObject) {
  var ref = new Firebase('https://popping-heat-9561.firebaseio.com/');
  this.data = $firebaseObject(ref);

  this.sayHello = function() {
    console.log(this.data.user);
  };
});

app.controller('StickyCtrl', function($scope, $element, $window) {
  var scope = $scope;
  var element = $element;

  var doc = document.documentElement;
  var body = document.body
  var target = document.querySelector('.profile');
  var parent = element.parent();
  var targetOffset = target.offsetTop;

  angular.element($window).bind('scroll', function() {
    var docHeight = doc.scrollTop || body.scrollTop;

    if (docHeight > targetOffset) {
      parent.addClass('active');
    } else {
      parent.removeClass('active');
    }
  });
});

app.directive('sticky', function() {
  return {
    restrict: 'C',
    controller: 'MainCtrl',
    compile: function(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, element, attrs, ctrl) {
          element.wrap('<div class="sticky-nav"></div>');
          var wrapper = element.parent('sticky-nav');
          wrapper[0].style.height = element[0].offsetHeight + 'px';
        }
      }
    }
  }
});

})()
