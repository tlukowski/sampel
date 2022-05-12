function counter() {
    if ($('.counter').length == 0) {
        return false;
    }

    let numbersCount = 10; // MINIMAL INT 5
    let animateNumberSpeed = 150;
    let animateNumberSlowSpeed = animateNumberSpeed * 2;
    let animateNumberInterval = animateNumberSpeed * .75;

    let counterScrollTimeout;

    function resetCounter(element) {        
        let counterData = element.data('counter');
        let counterDataLength = counterData.toString().length;

        element.children().remove();

        for (i = 0; i < counterDataLength; i++) {
            if (counterDataLength == 7 && i == 1 || counterDataLength == 7 && i == 4 || counterDataLength == 6 && i == 3 || counterDataLength == 5 && i == 2 || counterDataLength == 4 && i == 1) {
                element.append('<div class="spacer">&nbsp;</div><div class="number"><div class="placeholder">0</div></div>');
            } else {
                element.append('<div class="number"><div class="placeholder">0</div></div>');
            }
        }

        if (!element.hasClass('first-init')) {
            element.addClass('first-init');
         }

        element.addClass('clear').removeClass('init');
    }

    function animateCounter(element, array, numbers) {
        element.addClass('init');

        element.children('.number').each(function(i) {
            let $number = $(this);

            for (a = 0; a < numbers; a++) {
                let aTemp = a;
                let randomNumber = Math.floor(Math.random() * 10);

                setTimeout(function() {
                    if (aTemp == numbers - 1) {
                        $number.append('<div class="animate-number slow">' + randomNumber + '</div>');

                        let $animatedNumber = $number.children('.animate-number:not(.final)');

                        setTimeout(function() {
                            $animatedNumber.remove();
                        }, animateNumberSlowSpeed);
                    } else {
                        $number.append('<div class="animate-number blur">' + randomNumber + '</div>');

                        let $animatedNumber = $number.children('.animate-number:not(.final)');

                        setTimeout(function() {
                            $animatedNumber.remove();
                        }, animateNumberSpeed);
                    }
                }, ((animateNumberInterval * a) + (animateNumberSpeed * i)));
            }

            setTimeout(function() {
                $number.children('.placeholder').addClass('go-out');

                setTimeout(function() {
                    $number.children('.placeholder').remove();
                }, animateNumberSpeed);
            }, (animateNumberSpeed * i));

            setTimeout(function() {
                $number.append('<div class="animate-number final">' + array[i] + '</div>');
            }, ((animateNumberSpeed * i) + (animateNumberInterval * (numbersCount - 1)) + (animateNumberSlowSpeed / 2)));
        });

        element.removeClass('clear');
    }

    function startCounter() {
        let windowTop = $(window).scrollTop();
        let windowHeight = $(window).height();

        $('.counter').each(function() {
            let $counter = $(this);
            let counterDataArray = $counter.data('counter').toString().split('');

            let counterHeight = $counter.outerHeight();
            let counterOffsetTop = $counter.offset().top;
            let counterWidth = $counter.outerWidth();
            let counterOffsetLeft = $counter.offset().left;             
            if (windowTop + windowHeight > counterOffsetTop && windowTop - counterHeight < counterOffsetTop && ww() > counterWidth + counterOffsetLeft && counterOffsetLeft > 0) {                
                if (!$counter.hasClass('init')) {
                    if (!$counter.hasClass('clear')) {
                        resetCounter($counter);
                    }

                    animateCounter($counter, counterDataArray, numbersCount);
                }
            } else if (!$counter.hasClass('clear')) {
                resetCounter($counter);
            }
        });
    }


    $(window).on('load scroll resize', function() {
        clearTimeout(counterScrollTimeout);

        counterScrollTimeout = setTimeout(function() {
            startCounter();
        }, animateNumberSpeed);
    });    
    if ($('.counter-carousel').length > 0) {
        swiper4.on('slideChangeTransitionEnd', function() {            
            setTimeout(function() {
                 startCounter();
             }, 0);
         });
    }   
}

counter();