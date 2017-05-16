var performance = {
    bindings: {},
    template: `
    <h1>Count: {{$ctrl.count}}</h1>
    <div>
      Using ng-click:
      // ng-click will run digest cycle
      <button id="firstBtn" ng-click="$ctrl.increment()">Increment</button>
    </div>
    <div>
      Without $apply:
      <button id="secondBtn">Increment</button>
    </div>
    <div>
      With $apply:
      <button id="thirdBtn">Increment</button>
    </div>
    `,
    controller: function PerformanceController($scope, $timeout) {
      var ctrl = this;
      ctrl.count = 0;
      ctrl.increment = function() {
        this.count++;
        console.log('ON INCREMENT', this.count);
      }

      $scope.$watch(
        function () {
          return ctrl.count
        },
        function (newValue, oldValue) {
          console.log('ctrl.count', newValue)
        }
      );

      // digest cycle has not picked up changed, angular doesn't know a change has occurred
      document.getElementById('secondBtn').addEventListener('click', function() {
        ctrl.increment();
      });

      // tells angular something happened with $scope.$apply
      document.getElementById('thirdBtn').addEventListener('click', function() {
        $scope.$apply(function() {
          ctrl.increment();
        });
      });

    }
  }
  ;

angular
  .module('app')
  .component('performance', performance);
