'use strict';

/* Filters */

var filters = angular.module('app.filters', []);

filters.filter('userpicsrc', function() {
	return function(user) {
		if (user && user) {
			return "pic/" + user.picid + ".png"
		};
		return "pic/default.png";
	};
});


filters.filter('strLimit', function() {
	return function(str, limit) {
		if (str.length > limit) {
			return str.substr(0, limit-3) + " ..."
		};
		return str
	};
});



filters.filter('get', function() {
	return function(content, $scope, what) {
		if (what == 'categoryname')
			return _.find($scope.categories, function (category) {
				return category.categoryid == content.categoryid
			}).categoryname
		if (what == 'categoryslug')
			return _.find($scope.categories, function (category) {
				return category.categoryid == content.categoryid
			}).categoryslug
	};
});


filters.filter('contenthasimage', function() {
	return function(content, size) {
		if (!content) {
			return false;
		}
		// If we want to know just if there is or there isn't an image in this content
		if (!size) {
			if (content.maxsize == '') {
				return false
			}
			else {
				return true
			}
		}
		// Check if there is large image for this content, and so on
		if (size == 'large' && content.maxsize == 'large') {
			return true;
		} else if (size == 'medium' && (content.maxsize == 'large' || content.maxsize == 'medium')) {
			return true;
		} else if (size == 'small' && (content.maxsize == 'large' || content.maxsize == 'medium' || content.maxsize == 'small')) {
			return true;
		}
		return false;
	};
});


filters.filter('contentimagesrc', function() {
	return function(content, size) {
		if (!content) {
			return '';
		}
		// Content will always have a small image, even if it's the default
		if (size == 'small') {
			return "img/" + content.imageid + "-" + size + ".png";
		};
		// Check if there is large image for this content, or return default large image
		if (size == 'large' && (content.maxsize == 'small' || content.maxsize == 'medium')) {
			return "img/default-" + size + ".png";
		};
		// Check if there is medium image for this content, or return default medium image
		if (size == 'medium' && content.maxsize == 'small') {
			return "img/default-" + size + ".png";
		};
		return "img/" + content.imageid + "-" + size + ".png";
	};
});
