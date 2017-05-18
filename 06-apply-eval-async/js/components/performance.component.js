var performance = {
  bindings: {},
  template: `
    <h1>$applyAsync vs $evalAsync</h1>
    `,
  controller: function PerformanceController($scope) {
    var ctrl = this;
    ctrl.name = 'Motto!';
    // kicks off new digest cycle; the function inside will be executed in the context of the current scope object
    // $scope.$apply(function() { console.log('APPLY FIRED!')});
    // runs function at the beginning or future point in time in current digest cycle
    $scope.$applyAsync(function() { console.log('APPLY ASYNC FIRED!')});
    //
    $scope.$evalAsync(function() { console.log('EVAL ASYNC FIRED!')});

    // watch ctrl.name for changes
    $scope.$watch(
      function() {
        return ctrl.name
      },
      function(newValue, oldValue, scope) {

        // when changes, this will schedule function run in the same digest cycle
        $scope.$evalAsync(function(scope) {
          console.log('$evalAsync executed');
          ctrl.name = 'Todd!';
        });

        // when changes, will defer the function in the next digest cycle
        $scope.$applyAsync(function(scope) {
          console.log('$applyAsync executed');
          ctrl.name = 'Todd!';
        });
      }
    );

    $scope.$$postDigest(function() {
      console.log('$$postDigest executed. Digest completed');
      console.log(ctrl.name);
    });
  }
};

angular
  .module('app')
  .component('performance', performance);
