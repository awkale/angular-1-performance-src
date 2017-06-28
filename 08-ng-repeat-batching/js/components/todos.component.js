var todos = {
  template: `
  	<div>
      <button type="button" ng-click="$ctrl.renderBatched();">
        Render chunked
      </button>
      <button type="button" ng-click="$ctrl.renderAll();">
        Render non-chunked
      </button>
    	<todo-form
        new-todo="$ctrl.newTodo"
        on-add="$ctrl.addTodo($event);">
      </todo-form>
      <todo-list
        todos="$ctrl.todos"
        on-complete="$ctrl.completeTodo($event);"
        on-delete="$ctrl.removeTodo($event);">
      </todo-list>
    </div>
  `,
  controller: function (TodoService, $q, $timeout) {
  	this.$onInit = function () {
      this.todos = [];
    };
    this.renderBatched = function () {
      // custom function; 1st arg pass in string becomes a key to able to look up inside  chunkAndBatchRender method if there are multiple collections in a controller to make it resuable; 2nd arg todo service to pass in collection as array of data; 3rd arg how to divide array
      this.chunkAndBatchRender('todos', TodoService.getTodos(), 25);
    };
    this.renderAll = function () {
      this.todos = TodoService.getTodos();
    };
    this.addTodo = function ({ label }) {
      this.todos = [{ label, id: this.todos.length + 1 }, ...this.todos];
    };
    this.completeTodo = function ({ todo }) {
      this.todos = this.todos.map(
        item => item.id === todo.id ? Object.assign({}, item, { complete: true }) : item
      );
    };
    this.removeTodo = function ({ todo }) {
      this.todos = this.todos.filter(({ id }) => id !== todo.id);
    };
    this.chunkAndBatchRender = function (hash, collection, size) {

      var _this = this;
      // gives promise object
      var promise = $q.resolve();

      // splits in to chunks
      function chunkCollection(collection, size) {
        var chunks = [];
        for (var i = 0; i < collection.length; i += size) {
          chunks.push(collection.slice(i, i + size));
        }
        return chunks;
      }

      // calculate how to schedule and paint to DOM; returns a promise
      function scheduleRender(chunk) {
        Array.prototype.push.apply(_this[hash], chunk);
        //$timeout returns promise
        return $timeout(function () {}, 0);
      }

      // value is 48 arrays of 25 values in each
      var chunked = chunkCollection(collection, size);

      var nextBatch;
      //keep track on which batch being used; use promise to schedule the next batch once the first one complete
      chunked.forEach(function(chunk, index) {
        // pass the chunk being iterated over and apply to array
        nextBatch = scheduleRender.bind(null, chunk);
        // time will be returned to the .then
        promise = promise.then(nextBatch);
      });

      promise.then(function() {
        console.log('Rendered.');
      });

    };
  }
};

angular
	.module('app')
  .component('todos', todos);
