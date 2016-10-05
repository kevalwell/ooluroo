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
    var saveShapes = [];

    sc.submit = function() {
        var imgs = document.querySelectorAll('#docking-station li .shaped');

        angular.forEach(imgs, function(img, key) {
            if (img.id) {
                saveShapes[key] = { name: img.id };
            }
        });
        console.log('Submit json shapes: ', saveShapes);
    };

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
        var imgs = document.querySelectorAll('li .shaped');

        angular.forEach(imgs, function(img) {
            img.style.opacity = '1';
        });
    }

    setTimeout(function() {
        var imgs = document.querySelectorAll('li .shaped');

        angular.forEach(imgs, function(img) {
            img.addEventListener('dragstart', handleDragStart, false);

            img.addEventListener('dragover', handleDragOver, false);

            img.addEventListener('drop', handleDrop, false);
            img.addEventListener('dragend', handleDragEnd, false);
        });

    }, 1);
}]);
