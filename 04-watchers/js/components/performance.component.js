var performance = {
  bindings: {},
  template: `
    <h1>Watcher Count: {{$ctrl.watcherCount}}</h1>
    <button ng-click="$ctrl.add()">Add Item</button>
    <div ng-repeat="item in $ctrl.collection">{{item.title}}</div>
    `,
  controller: function PerformanceController($scope, Utils) {
    var ctrl = this;
    ctrl.watcherCount = 0;
    ctrl.collection = [];

    // returns array of all watchers
    ctrl.$onInit = function() {
      ctrl.watcherCount = Utils.getWatchers().length;
    }

    ctrl.add = function() {
      var id = Math.random().toString(16).slice(10);
      ctrl.collection.push({
        "userId": 1,
        "id": id,
        "title": "(#" + id + ") Todo item",
        "completed": false
      });
    }

    // watching this.utils.length for changes, and update ctrl.watcherCount with new value
    $scope.$watch(
      function() {
        return Utils.getWatchers().length;
      },
      function (newValue, oldValue) {
        ctrl.watcherCount = newValue;
        console.log('ctrl.watcherCount', newValue);
        // watchers unique to each scope, don't inherit scope from parent scope; independent watchers per scope. 
        console.log($scope.$$watchers);
      }
    );
  }
};

angular
  .module('app')
  .component('performance', performance);
