/*
	Story by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');


	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Browser fixes.

		// IE: Flexbox min-height bug.
			if (browser.name == 'ie')
				(function() {

					var flexboxFixTimeoutId;

					$window.on('resize.flexbox-fix', function() {

						var $x = $('.fullscreen');

						clearTimeout(flexboxFixTimeoutId);

						flexboxFixTimeoutId = setTimeout(function() {

							if ($x.prop('scrollHeight') > $window.height())
								$x.css('height', 'auto');
							else
								$x.css('height', '100vh');

						}, 250);

					}).triggerHandler('resize.flexbox-fix');

				})();

		// Object fit workaround.
			if (!browser.canUse('object-fit'))
				(function() {

					$('.banner .image, .spotlight .image').each(function() {

						var $this = $(this),
							$img = $this.children('img'),
							positionClass = $this.parent().attr('class').match(/image-position-([a-z]+)/);

						// Set image.
							$this
								.css('background-image', 'url("' + $img.attr('src') + '")')
								.css('background-repeat', 'no-repeat')
								.css('background-size', 'cover');

						// Set position.
							switch (positionClass.length > 1 ? positionClass[1] : '') {

								case 'left':
									$this.css('background-position', 'left');
									break;

								case 'right':
									$this.css('background-position', 'right');
									break;

								default:
								case 'center':
									$this.css('background-position', 'center');
									break;

							}

						// Hide original.
							$img.css('opacity', '0');

					});

				})();

	// Smooth scroll.
		$('.smooth-scroll').scrolly();
		$('.smooth-scroll-middle').scrolly({ anchor: 'middle' });

	// Wrapper.
		$wrapper.children()
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			});

	// Items.
		$('.items')
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				delay:		50,
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			})
			.children()
				.wrapInner('<div class="inner"></div>');

	// Gallery.
		$('.gallery')
			.wrapInner('<div class="inner"></div>')
			.prepend(browser.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				delay:		50,
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			})
			.children('.inner')
				//.css('overflow', 'hidden')
				.css('overflow-y', browser.mobile ? 'visible' : 'hidden')
				.css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
				.scrollLeft(0);

		// Style #1.
			// ...

		// Style #2.
			$('.gallery')
				.on('wheel', '.inner', function(event) {

					var	$this = $(this),
						delta = (event.originalEvent.deltaX * 10);

					// Cap delta.
						if (delta > 0)
							delta = Math.min(25, delta);
						else if (delta < 0)
							delta = Math.max(-25, delta);

					// Scroll.
						$this.scrollLeft( $this.scrollLeft() + delta );

				})
				.on('mouseenter', '.forward, .backward', function(event) {

					var $this = $(this),
						$inner = $this.siblings('.inner'),
						direction = ($this.hasClass('forward') ? 1 : -1);

					// Clear move interval.
						clearInterval(this._gallery_moveIntervalId);

					// Start interval.
						this._gallery_moveIntervalId = setInterval(function() {
							$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
						}, 10);

				})
				.on('mouseleave', '.forward, .backward', function(event) {

					// Clear move interval.
						clearInterval(this._gallery_moveIntervalId);

				});

		// Lightbox.
			$('.gallery.lightbox')
				.on('click', 'a', function(event) {

					var $a = $(this),
						$gallery = $a.parents('.gallery'),
						$modal = $gallery.children('.modal'),
						$modalImg = $modal.find('img'),
						href = $a.attr('href');

					// Not an image? Bail.
						if (!href.match(/\.(jpg|gif|png|mp4)$/))
							return;

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Locked? Bail.
						if ($modal[0]._locked)
							return;

					// Lock.
						$modal[0]._locked = true;

					// Set src.
						$modalImg.attr('src', href);

					// Set visible.
						$modal.addClass('visible');

					// Focus.
						$modal.focus();

					// Delay.
						setTimeout(function() {

							// Unlock.
								$modal[0]._locked = false;

						}, 600);

				})
				.on('click', '.modal', function(event) {

					var $modal = $(this),
						$modalImg = $modal.find('img');

					// Locked? Bail.
						if ($modal[0]._locked)
							return;

					// Already hidden? Bail.
						if (!$modal.hasClass('visible'))
							return;

					// Lock.
						$modal[0]._locked = true;

					// Clear visible, loaded.
						$modal
							.removeClass('loaded')

					// Delay.
						setTimeout(function() {

							$modal
								.removeClass('visible')

							setTimeout(function() {

								// Clear src.
									$modalImg.attr('src', '');

								// Unlock.
									$modal[0]._locked = false;

								// Focus.
									$body.focus();

							}, 475);

						}, 125);

				})
				.on('keypress', '.modal', function(event) {

					var $modal = $(this);

					// Escape? Hide modal.
						if (event.keyCode == 27)
							$modal.trigger('click');

				})
				.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
					.find('img')
						.on('load', function(event) {

							var $modalImg = $(this),
								$modal = $modalImg.parents('.modal');

							setTimeout(function() {

								// No longer visible? Bail.
									if (!$modal.hasClass('visible'))
										return;

								// Set loaded.
									$modal.addClass('loaded');

							}, 275);

						});






	$('[data-toggle="datepicker"]').datepicker({autoHide: 'true'});
	// Podesavanje Default datea za pick up car i hotela
	clientDate = new Date();
	year = clientDate.getFullYear();
	month = clientDate.getMonth() + 1;
	day = clientDate.getDate();
	returnDay = day+4;
	$('#pickUpDate').attr({
		'placeholder': month + '/' + day + '/' + year,
	})
	$('#dropOffDate').attr({
		'placeholder': month + '/' + returnDay + '/' + year,
	})
	$('#checkIn').attr({
		'placeholder': month + '/' + day + '/' + year,
	})
	$('#checkOut').attr({
		'placeholder': month + '/' + returnDay + '/' + year,
	})


	//drop off loc show toggle
	var buttonShowDropLoc = $("#diffLoc");
	var drop = $("#dropOffLocation");
	var pick = $("#pickUpLocation");
	buttonShowDropLoc.click(function(){
		drop.toggle();
		pick.toggleClass('half');

	})

	var driverAge = $("#driverAge");
	driverAge.hover(
	function(){
		$("#info").fadeIn('fast');
	}, function(){
		$("#info").fadeOut('fast');
	})
	//Focus na klik za find cars i hotels
	$("#carsLink").click(function(){
		pickUp.focus();
	})
	$("#hotelsLink").click(function(){
		hotelLocation.focus();
	})

	
})(jQuery);


// MOJ JS
var year, month, day, returnDay, clientDate
var places = ["Belgrade, BEG", "'Abu Dhabi', AUH","Dubai, DXB","Berlin, BER","Bali, DPS", "Bangkok, BKK", "Bejing, PEK", "Sao Paulo, CGH", "Zanzibar, ZNZ","Zagreb, ZAG","Stockholm, STO", "Istanbul, IST", "Tokyo, TYO", "Male, MLE", "Paris, PAR", "Madrid, MAD", "London, LON", "New Jork, NYC", "Miami, MIA"];
// UZETO SA w3schools-a
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

autocomplete(document.querySelector('#inputFrom'), places);
autocomplete(document.querySelector('#inputTo'), places);


// Menjanje From-To
var switcher = document.querySelector("#excange");
var from = document.querySelector("#inputFrom");
var to = document.querySelector("#inputTo");
switcher.addEventListener('click', Switcher);

function Switcher(){
	var fromValue = from.value;
	var toValue = to.value;
	from.value = toValue;
	to.value = fromValue;
	if(fromValue == toValue && fromValue != ""){
		alert("You can't travel to the same airport. Please slect another one.");
	}
}


//Dinamicko ispisivanje
	var title = ['Bali', 'Maldives', 'Bangkok', 'Los Angeles', 'Tokyo', 'Paris', 'Dubai', 'Barcelona'];
	var sources = ['bali', 'maldives', 'bangkok', 'losAngeles', 'tokyo', 'paris', 'dubai', 'barcelona'];

	var wrap = document.querySelector("#dinamic");
	for(i=0; i < title.length; i++){

		var articles = document.createElement("article");
		wrap.appendChild(articles);
		var a = document.createElement("a");
		articles.appendChild(a);
		var div = document.createElement("div");
		articles.appendChild(div);
		a.setAttribute("class", "image");
		a.setAttribute("href", 'images/' + sources[i] + '.jpg');
		div.setAttribute("class", "caption");
		var img = document.createElement("img");
		a.appendChild(img);
		img.setAttribute("alt", title[i]);
		img.setAttribute("src", 'images/' + sources[i] + '.jpg');
		var h3 = document.createElement("h3");
		div.appendChild(h3);
		h3.innerHTML = title[i];
		var p = document.createElement("p");
		div.appendChild(p);
		var ul = document.createElement("ul");
		div.appendChild(ul);
		ul.setAttribute("class", "actions fixed");
		var li = document.createElement("li");
		ul.appendChild(li);
		var span = document.createElement("span");
		li.appendChild(span);
		span.setAttribute("class", "button small");
		span.innerHTML="Open"
	}
//Dinamicko ispisivanje optionsa
	var hours = document.querySelectorAll(".dynamicHours");
	for(var i = 0; i<hours.length; i++){
		for(var j = 0; j<24; j++){
			if(j>9 && j!=12){
				hours[i].innerHTML += '<option>'+[j]+':00</option>';
			}
			else if(j==12){
				hours[i].innerHTML += '<option selected="selected">'+[j]+':00</option>';
			}
			else{
				hours[i].innerHTML += '<option>0'+[j]+':00</option>';
			}
		}
	}
//Provere
	var search = document.querySelector("#search");
	search.addEventListener("click", carCheck);
	searchFlights.addEventListener('click', flightCheck);
	searchHotels.addEventListener("click", hotelsCheck);
	guests.addEventListener("change", guestsChange);
	var regexFromTo = /^([A-ZŠĐĆČŽ][a-zšđčćž]{1,15})(\s[A-ZŠĐĆČŽ][a-zšđčćž]{1,15}){0,3}\,\s[A-ZŠĐĆČŽ]{3}$/;
	var regexLocHotels = /^([A-ZŠĐĆČŽ][a-zšđčćž]{1,15})(\s[A-ZŠĐĆČŽ][a-zšđčćž]{1,15}){0,3}$/;
	var regexCreditCard = /^\d{4}\-\d{4}\-\d{4}\-\d{4}$/;

	function carCheck(){
		var splittedDate = pickUpDate.value.split("/");
		var splittedDateReturn = dropOffDate.value.split("/");
		if (splittedDate[2]<year || 
			splittedDateReturn[2]<year ||
			(splittedDate[2]==year && splittedDate[0]<month) ||
			(splittedDateReturn[2]==year && splittedDateReturn[0]<month) ||
			(splittedDate[2]==year && splittedDate[0]==month && splittedDate[1]<day) ||
			(splittedDateReturn[2]==year && splittedDateReturn[0]==month && splittedDateReturn[1]<day) 
			){
			alert('You cannot travel to the past!')
		}
	}
	function hotelsCheck(){
		var splittedDate = checkIn.value.split("/");
		var splittedDateReturn = checkOut.value.split("/");
		if (splittedDate[2]<year || 
			splittedDateReturn[2]<year ||
			(splittedDate[2]==year && splittedDate[0]<month) ||
			(splittedDateReturn[2]==year && splittedDateReturn[0]<month) ||
			(splittedDate[2]==year && splittedDate[0]==month && splittedDate[1]<day) ||
			(splittedDateReturn[2]==year && splittedDateReturn[0]==month && splittedDateReturn[1]<day) 
			){
			alert("You cannot pick date from the past");
		}
		var formIsTrueHotels = regexLocHotels.test(hotelLocation.value);
		if(!formIsTrueHotels){
			alert("We don't work with hotels in that location");
		}
		var creditCardIsTrue = regexCreditCard.test(creditCard.value);
		if(!creditCardIsTrue){
			alert("Your credit card is invalid");
		}
	}
	function flightCheck(){
		var departDate = document.querySelector('#departDateInput');
		var returnDate = document.querySelector('#returnDateInput');
		var splittedDate = departDate.value.split("/");
		var splittedDateReturn = returnDate.value.split("/");
		if (splittedDate[2]<year || 
			splittedDateReturn[2]<year ||
			(splittedDate[2]==year && splittedDate[0]<month) ||
			(splittedDateReturn[2]==year && splittedDateReturn[0]<month) ||
			(splittedDate[2]==year && splittedDate[0]==month && splittedDate[1]<day) ||
			(splittedDateReturn[2]==year && splittedDateReturn[0]==month && splittedDateReturn[1]<day) 
			){
			alert('You cannot travel to the past!')
		}
		var fromIsTrue = regexFromTo.test(inputFrom.value);
		var toIsTrue = regexFromTo.test(inputTo.value);
		if(!fromIsTrue || !toIsTrue){
			alert('We do not work with that airport')
		}
		if(inputFrom.value == inputTo.value){
			alert("You can't traven to the same airport. Please select another one")
		}
	}
	function guestsChange(){
		var guests = document.querySelector("#guests");
		if(guests.selectedIndex=="0"){
			guests.previousElementSibling.innerText = "Guest";
		}
		else{
			guests.previousElementSibling.innerText = "Guests";
		}
	}
// Popunjavanje credit carda crticama
creditCard.addEventListener("keyup", addDash);

function addDash(){
	if(creditCard.value.length==4 || creditCard.value.length==9 || creditCard.value.length==14){
		creditCard.value += "-";
	}
}

