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

      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (dragSrcEl != this) {
        var dId = dragSrcEl.id;

        dragSrcEl.id = this.id;
        this.id = dId; 
      }

      return false;
    }

    function handleDragEnd(e) {
        [].forEach.call(document.querySelectorAll('#shape-menu li .shaped'), function(img) {
            img.style.opacity = '1';
        });
    }

    setTimeout(function() {
        var imgs = document.querySelectorAll('#shape-menu li .shaped');
        [].forEach.call(imgs, function(img) {
            img.addEventListener('dragstart', handleDragStart, false);
            img.addEventListener('dragenter', handleDragEnter, false);
            img.addEventListener('dragover', handleDragOver, false);
            img.addEventListener('dragleave', handleDragLeave, false);
            img.addEventListener('drop', handleDrop, false);
            img.addEventListener('dragend', handleDragEnd, false);
        });

    }, 1);
}]);
