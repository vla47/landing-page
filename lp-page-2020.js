function setCookie(name, value, expires, path, domain) {
	var cookie = name + "=" + escape(value) + ";";
	if (expires) {
		if (expires instanceof Date) {
			if (isNaN(expires.getTime())) expires = new Date();
		}
		else {
			expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
		}
		cookie += "expires=" + expires.toGMTString() + ";";
	}
	cookie += path ? "path=" + path + ";" : '';
	cookie += domain ? "domain=" + domain + ";" : '';
	document.cookie = cookie;
}

function showCookiePolicyPopup() {
	if ($('#cookies-policy-popup')) {
		$('#cookies-policy-popup').css('opacity', 1);
	}
}

function wrapNode(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}

function isVisibleInViewport(el) {
	var rect = el.getBoundingClientRect();
	var elemTop = rect.top;
	var elemBottom = rect.bottom;
	// Partially visible elements return true:
	isVisible = elemTop < window.innerHeight && elemBottom >= 0;
	return isVisible;
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var getDeviceType = function () {
	var md = new MobileDetect(window.navigator.userAgent);
	var device_type = 'desktop';
	if (md.mobile()) {
		if (md.phone()) {
			device_type = 'phone';
		}
		else {
			device_type = 'tablet';
		}
	}
	return device_type;
}

$(document).ready(function () {
	(function () {
		//Handle B parameter
		window.mts_timer = setInterval(function () {
			if (typeof window.mtsTracker === "object") {
				clearInterval(window.mts_timer);
				if (window.location.search.indexOf('b=') > -1) {
					window.mtsTracker.sendEvent('property-bag', 'mark-user', {
						"proposition": getParameterByName('b')
					});
				}
			}
		}, 50);

		var device = getDeviceType();
		document.getElementsByTagName('body')[0].className += " " + device;
	})();

	setTimeout(showCookiePolicyPopup, 5000);

	setCookie('cookies_policy_gdpr', 1, '10000000', '/', '.mansioncasino.com');

	// Show and hide Sticky CTA by Offer CTA visibility on screen
	var offerButton = document.querySelector('.offer-button');
	document.addEventListener('scroll', function () {
		var stickyCTA = document.querySelector('.sticky-cta');
		if (stickyCTA) {
			if (!isVisibleInViewport(offerButton)) {
				if (stickyCTA.classList.contains('fade-out')) {
					stickyCTA.classList.replace('fade-out', 'fade-in');
				}
				else {
					stickyCTA.classList.add('fade-in');
				}
			}
			else {
				stickyCTA.classList.replace('fade-in', 'fade-out');
			}
		}
	}, true);

	var tableContent = document.querySelectorAll("#wrapper .terms-and-conditions .content .scrollable-area table");
	if (tableContent && tableContent.length > 0) {
		for (var i = 0; i < tableContent.length; i++) {
			if (!tableContent[i].parentNode.classList.contains("table-content")) {
				var tableWrapper = document.createElement("div");
				tableWrapper.classList.add("table-content");
				wrapNode(tableContent[i], tableWrapper);
			}
		};
		//Split table in two for Desktop width more than 1024px
		if (($('body.desktop').length > 0) && ((window.innerWidth > 0) ? window.innerWidth : screen.width) >= 1024) {
			for (var i = 0; i < tableContent.length; i++) {
				var tableSplit = document.createElement("table");
				var tableRows = tableContent[i].querySelectorAll('tr');
				$(tableSplit).append($(tableRows[0]).clone(), $(tableRows).slice(Math.ceil($(tableRows).length / 2))).appendTo($(tableContent[i].parentNode));
			}
		}
	}

	//Add Game Slider for Mobile devices & Tablets
	if (($('body.tablet').length > 0) || ($('body.phone').length > 0)) {
		$('.carousel').slick({
			dots: true,
			variableWidth: true,
			centerMode: true,
			slidesToScroll: 1,
			slidesToShow: 1,
			infinite: false,
			arrows: false,
			easing: 'linear',
			cssEase: 'linear'
		});
	}
});

document.addEventListener("DOMContentLoaded", function () {
	var lazyloadImages;
	if ("IntersectionObserver" in window) {
		lazyloadImages = document.querySelectorAll(".lazy");
		var imageObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					var image = entry.target;
					if (image.dataset.src) {
						image.src = image.dataset.src;
					}
					else if (image.dataset.imageBackground) {
						image.style.backgroundImage = 'url("' + image.dataset.imageBackground + '")';
					}
					image.classList.remove("lazy");
					imageObserver.unobserve(image);
				}
			});
		});

		lazyloadImages.forEach(function (image) {
			imageObserver.observe(image);
		});
	}
	else {
		var lazyloadThrottleTimeout;
		lazyloadImages = document.querySelectorAll(".lazy");

		function lazyload()
		{
			if (lazyloadThrottleTimeout) {
				clearTimeout(lazyloadThrottleTimeout);
			}
			lazyloadThrottleTimeout = setTimeout(function () {
				var scrollTop = window.pageYOffset;
				lazyloadImages.forEach(function (img) {
					if (img.offsetTop < (window.innerHeight + scrollTop)) {
						if (image.dataset.src) {
							image.src = image.dataset.src;
						}
						else if (image.dataset.imageBackground) {
							image.style.backgroundImage = 'url("' + image.dataset.imageBackground + '")';
						}
						img.classList.remove('lazy');
					}
				});
				if (lazyloadImages.length == 0) {
					document.removeEventListener("scroll", lazyload);
					window.removeEventListener("resize", lazyload);
					window.removeEventListener("orientationChange", lazyload);
				}
			}, 20);
		}

		document.addEventListener("scroll", lazyload);
		window.addEventListener("resize", lazyload);
		window.addEventListener("orientationChange", lazyload);
	}
}, true);