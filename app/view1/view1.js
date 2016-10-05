'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', function(sc) {
    var self = this;
    sc.shapes = [{ name: "circle" }, { name: "square" }, { name: "triangle" }];

    var dragSrcEl = null;

    function handleDragStart(e) {
      // Target (this) element is the source node.
      this.style.opacity = '0.4';
      dragSrcEl = this;

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
      // this/e.target is current target element.

      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }

      // Don't do anything if dropping the same column we're dragging.
      if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }

      return false;
    }

    setTimeout(function() {
        var imgs = document.querySelectorAll('#shape-menu li .shaped');
        console.log('here', imgs);
        [].forEach.call(imgs, function(img) {
            img.addEventListener('dragstart', handleDragStart, false);
            img.addEventListener('dragenter', handleDragEnter, false);
            img.addEventListener('dragover', handleDragOver, false);
            img.addEventListener('dragleave', handleDragLeave, false);
            img.addEventListener('drop', handleDrop, false);
            img.addEventListener('dragend', handleDragEnd, false);
        });

        function handleDragEnd(e) {

            [].forEach.call(imgs, function(img) {
                img.classList.remove('over');
            });
        }
    }, 1000);
}]);
