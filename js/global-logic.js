// Bind events to be triggered BEFORE EVERY page creation
$(document).on('pagebeforecreate', function() {
	// Function to find all jQuery Mobile back buttons and add an attribute to it
	function modifyBackButtons() {
		// Back buttons jQuery object
		var $backBtns = $('a[data-rel=back]');

		// Add attribute
		$backBtns.attr('data-direction', 'reverse');
	}

	// Functions to run on page-load
	(function() {
		modifyBackButtons();
	})();
});

// Bind generic events to be triggered on EVERY page creation
$(document).on('pagecreate', function() {
	// Function to change the class of the HTML tag based on the orientation of the device
	function changeOrientationClass(orientation) {
		// Add the orientation as a CSS class to the HTML tag
		$('html').addClass(orientation);
	}

	// Functions to run on orientation change
	$(window).on('orientationchange', function(event){
		changeOrientationClass(event.orientation);
	});

	// Function to find all jQuery Mobile back buttons and add an attribute to it
	function modifyBackButtons() {
		// Back buttons jQuery object
		var $backBtns = $('a[data-rel=back]');

		// Add HTML
		$backBtns.append('<span class="ui-icon ui-icon-arrow-l ui-icon-shadow"></span>');
	}

	// Functions to run on page-load
	(function() {
		$(window).trigger('orientationchange');
		GlobalTools.deviceOS();
		modifyBackButtons();
	})();
});

// Bind generic events to be triggered BEFORE EVERY page show
$(document).on('pagebeforeshow', function() {
	// Function to hide all the vertically centered divs, so they don't POP into place
	function hidePreModifiedDivs() {
		// Iterate over each div
		$('.vertically-centered').hide();
	}

	// Functions to run on page-load
	(function() {
		hidePreModifiedDivs();
	})();
});

// Bind generic events to be triggered on EVERY page show
$(document).on('pageshow', function() {
	// Function to vertically center all divs marked with the "vertically-centered" class
	function verticallyCenterDivs() {
		// Grab the divs
		var $divs = $('.vertically-centered');

		// Iterate over each div
		$divs.each(function() {
			// Grab their height
			var divHeight = $(this).innerHeight();

			// Center them vertically
			$(this).css('top', '50%');
			$(this).css('margin-top', -(Math.floor(divHeight / 2)));
		});

		// Show all of them (un-hide them)
		$divs.fadeIn('slow');
	}

	// Functions to run on page-load
	(function() {
		verticallyCenterDivs();
	})();
});

// Bind generic events to be triggered on EVERY m-app initialization
$('.m-app').on('pageinit', function() {
	// Function to add both an html element and a click listener to all android headers
	function convertAndroidHeaders() {
		// Header jQuery object
		var $header = $("html.android h1#header-logo");

		// Grab the url of the hard-coded back button
		var backUrl = $('a[data-rel=back]').attr('href');

		// Add a class and an html span element
		$header.addClass('back-button');
		$header.prepend('<span class="back-image"></span>');

		// Make the header clickable
		$header.on('vclick', function() {
			// Use jQuery Mobile's page change function to animate with transitions and load with Ajax, even if they weren't already there (that's why we're not using history.back)
			$.mobile.changePage(backUrl, {reverse: true});
		});
	}

	// Functions to run on page-load
	(function() {
		convertAndroidHeaders();
	})();
});

// Bind generic events to be triggered on the DASHBOARD page initialization
$('#page-dashboard').on('pageinit', function() {
	// Set variables for the dashboard
	var currentElemPerRow = '';
	
	// Detect and mark the "middle" elements of the dashboard
	function detectMiddleElements() {
		// Grab the width of the entire dashboard
		var dashWidth = parseInt($('nav#dashboard').width());

		// Grab the percentage width of the first element
		var elemWidth = parseInt($('nav#dashboard ul#dashboard-mapps li').width());

		// Find the number of elements per row
		var elemPerRow = Math.floor(dashWidth / elemWidth);

		// Remove the current element per row class, so there aren't more than one class
		$('nav#dashboard').removeClass(currentElemPerRow + '-per-row');

		// Set the number of elements per row as a css class on the dashboard tag
		$('nav#dashboard').addClass(elemPerRow + '-per-row');
		currentElemPerRow = elemPerRow;

		// Calculate the middle-th element
		var middleCount = Math.ceil(elemPerRow / 2);

		// Create the nth-child expression
		var everyNthChild = elemPerRow + String('n+') + middleCount;
		console.log(elemPerRow);
		console.log(middleCount);
		console.log(everyNthChild);
		console.log(elemPerRow + 'n+' + middleCount);

		// Finally, set every middle-th element to have a class
		$('nav#dashboard ul#dashboard-mapps li').removeClass('dash-middle-element');
		$('nav#dashboard ul#dashboard-mapps li:nth-child(' + everyNthChild +')').addClass('dash-middle-element');
	}

	// Detect device and meta info and display it on the page
	function deviceInfo() {
		// Get the data
		var devicePlatform = GlobalTools.deviceOS();
		var displayDensity = window.devicePixelRatio;

		// Display it by adding it to the mobile-info span
		$('#mobile-info').append('<li>Device Platform: ' + devicePlatform + '</li>');
		$('#mobile-info').append('<li>Display Density: ' + displayDensity + '</li>');
		$('#mobile-info').append('<li>User Agent: ' + navigator.userAgent + '</li>');

	}

	// Make the info button footer clickable
	$('.info-button').on('vclick', function(event) {
		$('#hidden-info-div').stop().animate({ height: 'toggle', leaveTransforms: true, useTranslate3d: true}, 800, 'easeOutExpo', function() {
			// Fix window height bugs by triggering an updatelayout and resize (repaint, please)
			$(window).trigger('resize');
			$(this).trigger('updatelayout');
		});
		$('footer').animate({ opacity: 'toggle'}, 1200, 'easeInExpo', function() {
			// Do something on callback
		});
	});

	// Functions to run on orientation change
	$(window).on('orientationchange', function(event){
		detectMiddleElements();
	});

	// Functions to run on page-load
	(function() {
		detectMiddleElements();
		deviceInfo();
	})();
});

// NOTE: For some reason or another, I HAVE to use LIVE on these events. I can't use the new, steezy 'on' function
// Bind events to be triggered on the CAMPUS MAP page initialization
$('#page-campusmap').live('pageinit', function() {
	// We might not have the Google Maps API loaded yet, so let's try
	try {
		// Create a Google Map
		var startingCenterPoint = new google.maps.LatLng(43.758976, -71.688709);
		var zoomLevel = 15;
		var gmapObject = {'center': startingCenterPoint, 'zoom': zoomLevel};

		// Create the map
		$('div#campus-google-map').gmap( gmapObject );
	}
	catch (e) {
		console.log('Couldn\'t load the Google Map. Died with: ' + e);
	}
});
// Bind events to be triggered on the CAMPUS MAP page showing
$('#page-campusmap').live("pageshow", function() {
	// Refresh/repaint
	$(window).trigger('resize');
	$(this).trigger('updatelayout');

	// We might not have the Google Maps API loaded yet, so let's try
	try {
		$('div#campus-google-map').gmap('refresh');
	}
	catch (e) {
		console.log('Couldn\'t load the Google Map. Died with: ' + e);
	}
});
