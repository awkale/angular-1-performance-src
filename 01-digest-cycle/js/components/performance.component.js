var performance = {
    bindings: {},
    template: `
    <h1>Understanding the Angular digest {{$ctrl.bottleneck}}</h1>
    <input type="text" ng-model="$ctrl.bottleneck">
    `,
    controller: function PerformanceController($scope) {
      var ctrl = this;
      ctrl.bottleneck = 'cycle';


      $scope.$watch(
        function() {
          // a way to watch a property without passing in a string
          return ctrl.bottleneck;
        },
        // when watcher is changed you get old and new value
        function(newValue, oldValue) {
          console.log('ctrl.bottleneck', newValue);
        }
      )
    }
  };

angular
  .module('app')
  .component('performance', performance);
