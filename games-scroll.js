window.addEventListener('DOMContentLoaded', function () {

  var initialLiElements = document.querySelectorAll('#gamesWrapper .category-games')[0].children.length;
  function getSlideElems() {
    var slider = document.querySelectorAll('#gamesWrapper .category-games');
    slider[0].scrollLeft += (initialLiElements / 3) * 253;
    for (var i = 0; i < slider.length; i++) {
      assingtoEl(slider[i]);
    }
  }

  //-----------------------------Hold And Scroll Functionality-----------------------------------------
  function assingtoEl(element) {
    var timer = setInterval(function () {
      //Added logic for right auto scroll for arabic countries
      if (CASINO.SITE_ID == "arb" || CASINO.SITE_ID == "sa" || CASINO.SITE_ID == "bh" || CASINO.SITE_ID == "kw" || CASINO.SITE_ID == "lb" || CASINO.SITE_ID == "qa" || CASINO.SITE_ID == "ae") {
        if (element.scrollLeft < element.scrollWidth) {
          element.scrollTo(element.scrollLeft - 1, 0);
        }
      } else {
        if (element.scrollLeft < element.scrollWidth) {
          element.scrollTo(element.scrollLeft + 1, 0);
        }
      }

    }, 60);

    var isDown = false;
    var startX;
    var scrollLeft;

    element.addEventListener('mousedown', function (e) {
      //Stoll auto scrolling
      clearInterval(timer);
      isDown = true;
      element.classList.add('active');
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    });
    element.addEventListener('mouseleave', function () {
      if (isDown) {
        //Restart Auto Scrolling
        timer = setInterval(function () {
          if (CASINO.SITE_ID == "arb" || CASINO.SITE_ID == "sa" || CASINO.SITE_ID == "bh" || CASINO.SITE_ID == "kw" || CASINO.SITE_ID == "lb" || CASINO.SITE_ID == "qa" || CASINO.SITE_ID == "ae") {
            if (element.scrollLeft < element.scrollWidth) {
              element.scrollTo(element.scrollLeft - 1, 0);
            }
          } else {
            if (element.scrollLeft < element.scrollWidth) {
              element.scrollTo(element.scrollLeft + 1, 0);
            }
          }
        }, 60);

        isDown = false;
        element.classList.remove('active');
      }
    });

    element.addEventListener('mouseup', function () {
      //Restart Auto Scrolling
      timer = setInterval(function () {
        if (CASINO.SITE_ID == "arb" || CASINO.SITE_ID == "sa" || CASINO.SITE_ID == "bh" || CASINO.SITE_ID == "kw" || CASINO.SITE_ID == "lb" || CASINO.SITE_ID == "qa" || CASINO.SITE_ID == "ae") {
          if (element.scrollLeft < element.scrollWidth) {
            element.scrollTo(element.scrollLeft - 1, 0);
          }
        } else {
          if (element.scrollLeft < element.scrollWidth) {
            element.scrollTo(element.scrollLeft + 1, 0);
          }
        }
      }, 60);
      isDown = false;
      element.classList.remove('active');

    });
    element.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      element.scrollLeft = scrollLeft - walk;
    });

    // Touch Events
    element.addEventListener('touchstart', function (e) {
      clearInterval(timer);
      isDown = true;
      element.classList.add('active');
    });


    element.addEventListener('touchend', function (e) {
      timer = setInterval(function () {
        if (CASINO.SITE_ID == "arb" || CASINO.SITE_ID == "sa" || CASINO.SITE_ID == "bh" || CASINO.SITE_ID == "kw" || CASINO.SITE_ID == "lb" || CASINO.SITE_ID == "qa" || CASINO.SITE_ID == "ae") {
          if (element.scrollLeft < element.scrollWidth) {
            element.scrollTo(element.scrollLeft - 1, 0);
          }
        } else {
          if (element.scrollLeft < element.scrollWidth) {
            element.scrollTo(element.scrollLeft + 1, 0);
          }
        }
      }, 60);
      isDown = false;
      element.classList.remove('active');
    });
  }

  getSlideElems();
  scrollListener();

  function scrollListener() {
    document.querySelector('#gamesWrapper .category-games').addEventListener('scroll', function (event) {
      var lastChild1 = document.querySelector('.category-games').lastElementChild;
      var firstChild = document.querySelector('.category-games').firstElementChild;
      isInViewport(lastChild1) ? copyGames(lastChild1) : '';
      isInViewport(firstChild) ? copyGames(firstChild) : '';
    })
  };

  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    const result = (
      rect.top >= 0 &&
      rect.left >= -5 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    return result;
  }

  function copyGames(element) {
    var gamesToCopy = document.querySelector('#gamesWrapper >.category-games');
    var elementWidth = element.offsetWidth;

    var elPosition = element.getBoundingClientRect()

    if (elPosition.x < 100 && element.scrollLeft === 0) {
      gamesToCopy.scrollLeft += (initialLiElements / 3) * (elementWidth + 8);
    } else {
      var additionalPixelsToAdd = 0
      if (elPosition.width === 222) {
        additionalPixelsToAdd = 12;
      } else if (elPosition.width === 172) {
        additionalPixelsToAdd = 8;
      } else {
        additionalPixelsToAdd = 8;
      }
      gamesToCopy.scrollLeft -= (initialLiElements / 3) * (elementWidth + additionalPixelsToAdd);
    }
  }
});

