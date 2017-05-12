angular
  .module('app', [])
  .run(function ($rootScope, $timeout) {
    var count = 0;
    // give a value to be dirty checked
    // every time $rootScope digest happens, this function is called to see how many times digest cycle is happening
    $rootScope.$watch(function () {
      console.log('$digest count', ++count);
    });

    // toggling rootScope to false and true; `enabled` is property on rootScope
    $rootScope.$watch('enabled', function(val) {
      console.log('You are now: ' + (val ? 'enabled' : 'disabled'));
    });

    // like setTimeout wrapper; wraps it so it can call it for you
    $rootScope.enabled = true;
    $timeout(function() { $rootScope.enabled = false }, 2000);
    $timeout(function() { $rootScope.enabled = true }, 4000);
  });
