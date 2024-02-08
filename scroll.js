//Add hold and scroll for main Gamepods & Payment methods
function getSlideElems (activeTab) {
    const slider = document.querySelectorAll(`#gamesWrapper > [data-id=${CSS.escape(activeTab)}] > .category-games`);
    for (let i = 0; i < slider.length; i++) {
        assingtoEl(slider[i]);
    }
}

window.addEventListener("load", (event) => {

    //Top Menu Section
    const mainMenu = document.querySelector('.menu-section ul');
    assingtoEl(mainMenu);

    //Game Section 1
    const gameSection1 = document.querySelector('.section-1-gamepods > .category-games');

    const gs1btnRight = document.querySelector('.section-1-gamepods > .scroll-btn-right');
    gs1btnRight.onclick = function (){scrollBy(gs1btnRight, gameSection1);enableDisable(gameSection1, gs1btnLeft, gs1btnRight)};

    const gs1btnLeft = document.querySelector('.section-1-gamepods > .scroll-btn-left');
    gs1btnLeft.onclick = function (){scrollBy(gs1btnLeft, gameSection1); enableDisable(gameSection1, gs1btnLeft, gs1btnRight)};
    //--------------------------------------

    //Jackpot Section
    const jpSection = document.querySelector('.jp-section-gamepods> .category-games');

    const jpSbtnRight = document.querySelector('.jp-section-gamepods > .scroll-btn-right');
    jpSbtnRight.onclick = function (){scrollBy(jpSbtnRight, jpSection);enableDisable(jpSection, jpSbtnLeft, jpSbtnRight)};

    const jpSbtnLeft = document.querySelector('.jp-section-gamepods > .scroll-btn-left');
    jpSbtnLeft.onclick = function (){scrollBy(jpSbtnLeft, jpSection); enableDisable(jpSection, jpSbtnLeft, jpSbtnRight)};
    //--------------------------------------

    //Promotions Section
    const promoSection = document.querySelector('#promotions #promo-wrap');
    let viewportWidth = window.innerWidth;
    if (viewportWidth <= 640) {
        promoSection.scrollLeft += 199;
    }else if (viewportWidth > 640 && viewportWidth <= 1024) {
        promoSection.scrollLeft += 238;
    }else {
        promoSection.scrollLeft += 100;
    }
    assingtoEl(promoSection);
    promoLinkClick(promoSection);

    //------------------------------------------

    //Reviews Section
    const reviewSection = document.querySelector('.reviews-section > .review-wrap');

    const revSbtnRight = document.querySelector('.reviews-section > .scroll-btn-right');
    revSbtnRight.onclick = function (){scrollBy(revSbtnRight, reviewSection);enableDisable(reviewSection, revSbtnLeft, revSbtnRight)};

    const revSbtnLeft = document.querySelector('.reviews-section > .scroll-btn-left');
    revSbtnLeft.onclick = function (){scrollBy(revSbtnLeft, reviewSection); enableDisable(reviewSection, revSbtnLeft, revSbtnRight)};

    reviewSection.addEventListener('scroll', ()=> {

        let reviewSection = document.querySelector('.reviews-section > .review-wrap');

        const lastChildVisibility = isInViewportLastChild(reviewSection.offsetWidth, reviewSection.lastElementChild) ? addReviews(reviewSection) :'';

        function isInViewportLastChild(wrapWidth, element) {
            let rect = element.getBoundingClientRect();
            return (
                rect.left >= ((window.innerWidth - wrapWidth) /2 -10 ) &&
                (rect.right >= ((window.innerWidth - wrapWidth) /2 ) && rect.right -2 <= wrapWidth + (window.innerWidth - wrapWidth) )
            );
        }

        function addReviews(reviewSection) {
            let copyReviews = reviewSection.cloneNode(true);
            let reviews = copyReviews.querySelectorAll('li');
            reviews.forEach( review => reviewSection.appendChild(review));
        }

    })
    //--------------------------------------

    // Payment Section
    const paymentSection = document.querySelector('.payment-section ul');
    assingtoEl(paymentSection);
    paymentSection.addEventListener('scroll', event => {
        const lastChildVisibility1 = isInViewportPayment(paymentSection.offsetWidth, paymentSection.firstElementChild) ? paymentSection.scrollLeft += (paymentSection.lastElementChild.offsetWidth + 12)  * (paymentSection.childElementCount / 3) : '';
        const lastChildVisibility2 = isInViewportPayment(paymentSection.offsetWidth, paymentSection.lastElementChild) ? paymentSection.scrollLeft -= (paymentSection.lastElementChild.offsetWidth + 12)  * (paymentSection.childElementCount / 3) : '';
    })

    // Back to Top button
    const jackpotWrapper = document.querySelector('.jp-wrap');
    const backToTopBtn = document.querySelector('#backToTop');
    window.addEventListener('scroll', event => {
        let rect = jackpotWrapper.getBoundingClientRect();
        if (rect.top < 0) {
            backToTopBtn.style.display = "inline-block";
        }else {
            backToTopBtn.style.display = "none";
        }
    })
});

//--------------------------------------

// Hold And Scroll Functionality
function assingtoEl(element) {
    var rowChecker = element.id;

    var timer = setInterval(() => {
        if (rowChecker === 'category-games-row-1'){
            if (element.scrollLeft < element.scrollWidth) {
                element.scrollTo(element.scrollLeft + 1, 0);
            }
        }else if (rowChecker === 'category-games-row-2'){
            if (element.scrollLeft < element.scrollWidth) {
                element.scrollTo(element.scrollLeft - 1, 0);
            }
        }else if (rowChecker === 'payment-wrap') {
            if (element.scrollLeft < element.scrollWidth) {
                element.scrollTo(element.scrollLeft + 1, 0);
            }
        }
    }, 60);

    let isDown = false;
    let startX;
    let scrollLeft;

    var startTime = 0;
    var endTime = 0;

    element.addEventListener('mousedown', (e) => {
        //Stoll auto scrolling
        clearInterval(timer);
        isDown = true;
        element.classList.add('active');
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
    });
    element.addEventListener('mouseleave', () => {
        if (isDown) {
            //Restart Auto Scrolling
            timer = setInterval(() => {
                if (rowChecker === 'category-games-row-1'){
                    if (element.scrollLeft < element.scrollWidth) {
                        element.scrollTo(element.scrollLeft + 1, 0);
                    }
                }else if (rowChecker === 'category-games-row-2'){
                    if (element.scrollLeft < element.scrollWidth) {
                        element.scrollTo(element.scrollLeft - 1, 0);
                    }
                }else if (rowChecker === 'payment-wrap') {
                    if (element.scrollLeft < element.scrollWidth) {
                        element.scrollTo(element.scrollLeft + 1, 0);
                    }
                }
            }, 60);

            isDown = false;
            element.classList.remove('active');
        }
    });

    element.addEventListener('mouseup', () => {
        //Restart Auto Scrolling
        timer = setInterval(() => {
            if (rowChecker === 'category-games-row-1'){
                if (element.scrollLeft < element.scrollWidth) {
                    element.scrollTo(element.scrollLeft + 1, 0);
                }
            }else if (rowChecker === 'category-games-row-2'){
                if (element.scrollLeft < element.scrollWidth) {
                    element.scrollTo(element.scrollLeft - 1, 0);
                }
            }else if (rowChecker === 'payment-wrap') {
                if (element.scrollLeft < element.scrollWidth) {
                    element.scrollTo(element.scrollLeft + 1, 0);
                }
            }
        }, 60);
        isDown = false;
        element.classList.remove('active');

    });
    element.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        element.scrollLeft = scrollLeft - walk;
    });

    // Touch Events
    element.addEventListener('touchstart', (e) => {
        clearInterval(timer);
        isDown = true;
        element.classList.add('active');
    });


    element.addEventListener('touchend', (e) => {
        timer = setInterval(() => {
            if (rowChecker === 'category-games-row-1'){
                if (element.scrollLeft < element.scrollWidth) {
                    element.scrollTo(element.scrollLeft + 1, 0);
                }
            }else if (rowChecker === 'category-games-row-2'){
                if (element.scrollLeft < element.scrollWidth) {
                    element.scrollTo(element.scrollLeft - 1, 0);
                }
            }else if (rowChecker === 'payment-wrap') {
                if (element.scrollLeft < element.scrollWidth) {
                    element.scrollTo(element.scrollLeft + 1, 0);
                }
            }
        }, 60);
        isDown = false;
        element.classList.remove('active');
    });
}

//Click to Scroll Functionality
function scrollBy(btn, gameSection) {

    if(btn.classList.contains('scroll-btn-right')) {
        gameSection.scrollBy(458, 0);
    }else if (btn.classList.contains('scroll-btn-left')){
        gameSection.scrollBy(-458, 0);
    }
}

//Click to Scroll buttons Enable/Disable functionality
function enableDisable (gameSection, btnL, btnR) {

    const firstChildVisibility = isInViewportInternal(gameSection.offsetWidth, gameSection.firstElementChild) ? disableBtn(btnL) : enableBtn(btnL);
    const lastChildVisibility = isInViewportInternal(gameSection.offsetWidth, gameSection.lastElementChild) ? disableBtn(btnR) : enableBtn(btnR);

    function isInViewportInternal(wrapWidth, element) {
        let rect = element.getBoundingClientRect();
        return (
            rect.left >= ((window.innerWidth - wrapWidth) /2 -10 ) &&
            (rect.right >= ((window.innerWidth - wrapWidth) /2 ) && rect.right <= (wrapWidth + (window.innerWidth - wrapWidth) /2 ))
        );
    }

    function disableBtn (btn) {
        if(!btn.classList.contains('disabled')) {
            btn.classList.add('disabled');
        }
    }
    function enableBtn (btn) {
        if(btn.classList.contains('disabled')) {
            btn.classList.remove('disabled');
        }
    }
}

//Payment icons first/last element visibility checker
function isInViewportPayment (wrapWidth, element) {
    let rect = element.getBoundingClientRect();
    return (
        rect.left >= ((window.innerWidth - wrapWidth) /2 -10 ) &&
        (rect.right >= ((window.innerWidth - wrapWidth) /2 ) && rect.right <= (wrapWidth + (window.innerWidth - wrapWidth) /2 ))
    );
}

function promoLinkClick(element){
    let allPromos = element.querySelectorAll("li > a");
    let longpress = false;
    let startTime
    for (let i = 0; i < allPromos.length; i++) {
        allPromos[i].addEventListener('mousedown', () => {
            // Start counting mouse down duration for promotions (needed to avoid clicking while scrolling)
            startTime = new Date().getTime();
        })

        allPromos[i].addEventListener('mouseup', () => {

                let endTime = new Date().getTime();
                if (endTime - startTime < 250) {
                    longpress = false;
                } else if (endTime - startTime >= 300) {
                    longpress = true;
                }
        });

        allPromos[i].addEventListener('click', (e) => {
            (longpress) ?  e.preventDefault() : window.open(allPromos[i].getAttribute('data-href'), '_blank');
        })
    }

}

//-----------------------------------------------
export {getSlideElems};