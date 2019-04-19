"use strict";

var inView = (function(user_options) {

	var interval;
	var scrolling = true;
	var options = {
		items: user_options.items || {},
		classname: user_options.classname || 'in-view',
		event_callback: user_options.event_callback || false,
		timeout: user_options.timeout || 100,
	};

	// Check if items were provided
	if (typeof options.items !== 'object' || Object.keys(options.items).length === 0) {
		console.error('Please provide 1 or more items');
		return;
	}

	setup();

	// Setup the scroll listener
	function setup() {
		window.addEventListener('scroll', scrollListener);

		// Checkups every 100ms instead of every scrollevent
		// to preserve a smooth performance
		interval = setInterval(function() {
			if (scrolling) {
				checkPositions();
				updateItems();

				scrolling = false;
			}
		}, 100);
	}

	// Check wether there are items in the viewport or not
	function checkPositions() {
		var count = 0;
		for (var i = 0; i < options.items.length; i++) {
			var item = options.items[i];
			var top = item.getBoundingClientRect().top;

	 		 // Is the item top position inside the viewport
			if (top <= window.innerHeight) {
				showItem(item, ++count);
			}
		}
	}

	// Called when an items comes in the viewport
	function showItem(el, multiply_by) {
		setTimeout(function() {
			if (el.classList.contains( options.classname )) {
				return;
			}
			el.classList.add( options.classname );

			// Dispatch custom event if enabled
			if ( !options.event_callback ) {
				dispatchCustomEvent(el);
			}
		}, options.timeout * multiply_by);
	}

	// Called when an items comes in the viewport
	// and the 'event_callback' is enabled
	function dispatchCustomEvent(el) {
		document.dispatchEvent(
			new CustomEvent('inView', {
				'detail': { item: el }
			})
		);
	}

	// Remove the items that are already have the specified classname
	// from the items array we are tracking
	function updateItems() {
		var new_items = Array.prototype.slice.call(options.items);
		new_items = new_items.filter(function(item) {
			return !item.classList.contains( options.classname );
		});
		options.items = new_items;

		// No more items to keep track of
		if (new_items.length === 0) {
			endListener();
		}
	}

	// Called upon each scroll event
	function scrollListener() {
		scrolling = true;
	}

	// Called when all the given items have the specified classname
	function endListener() {
		clearInterval(interval);
		window.removeEventListener('scroll', scrollListener);
	}
});
