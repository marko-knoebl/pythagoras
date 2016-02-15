'use strict';


    // update on Enter keypress
    $('#symbolInput').on('keypress', function(event) {
      if (event.key === 'Enter') {
        $('#symbolInput').trigger('blur');
      }
    });

var pythagorasApp = angular.module('pythagorasApp', ['ngMaterial', 'ngMessages']);

pythagorasApp.controller('PythagorasCtrl', function($scope, $http) {
  // default date range: 1 month

  var randint = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  $scope.restart = function() {
    newQuestion();
    $scope.correct = 0;
    $scope.wrong = 0;
  };

  var newQuestion = function() {
    var lengths = pythagoreanTriple();
    $scope.a = lengths.a;
    $scope.b = lengths.b;
    $scope.c = lengths.c;
    $scope.unknown = ['a','b', 'c', 'c'][randint(0, 3)];
    $scope[$scope.unknown] = '?';
  };
  
  var pythagoreanTriple = function() {
    var m = randint(2, 7);
    var n = randint(1, m-1)
    var a = m*m - n*n;
    var b = 2*m*n;
    var c = m*m + n*n;
    var lengths = {a:a, b:b, c:c};
    return lengths;
  }

  $scope.restart();

  $scope.checkAnswer = function() {
    var answer = parseInt($scope.answer);
    var l = {
      a: $scope.a,
      b: $scope.b,
      c: $scope.c
    };
    l[$scope.unknown] = answer;
    if (l.a*l.a + l.b*l.b === l.c*l.c) {
      $scope.correct ++;
      $scope.answer = '';
      newQuestion();
    } else {
      $scope.wrong ++;
      $scope.answer = '';
    }
  }
});
