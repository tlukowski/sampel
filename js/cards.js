let cardsFirstInit = false;
let cardsFirstInitTimeout;

let cardsElementsArray = [];
let cardsIndex = 500;
let cardsResetFlag = false;
let cardLastVisible = false;
let cardRemoving = false;
let dragClickTimeout;
let cardDragPosition = 0;

let cardInitTransition = parseFloat($('.post-cards').css('transition-duration')) * 1000;
let cardFadeTransition;
let cardDragTransition;

function cardsInit(element) {
    if ($(element).length == 0) {
        return false;
    }

    cardsElementsArray = [];
    let cardsElementsTempArray = {};

    $(element).children().each(function(i) {
        cardsElementsTempArray = {
            html: $(this).html()
        };

        cardsElementsArray.push(cardsElementsTempArray);
    });

    $(element).children('div').remove();

    let cardsClone = 2;

    switch (cardsElementsArray.length) {
        case 1:
            cardsClone = 6;
            break;
        case 2:
            cardsClone = 3;
            break;
    }

    let cardsLoopIndex = 0;

    for (i = 0; i < (cardsElementsArray.length * cardsClone); i++) {
        let cardClass = 'post-card-wrapper visible';

        if (i > 2) {
            cardClass = 'post-card-wrapper';
        }

        if (cardsLoopIndex == cardsElementsArray.length) {
            cardsLoopIndex = 0;
        }

        $(element).append('<div class="' + cardClass + '" style="z-index: ' + cardsIndex + ';"><div class="post-card-dragger">' + cardsElementsArray[cardsLoopIndex].html + '</div></div>');

        cardsIndex = cardsIndex - 1;
        cardsLoopIndex++;
    }

    cardsFirstInitScroll();

    cardFadeTransition = parseFloat($('.post-card-wrapper').css('transition-duration')) * 1000;
    cardDragTransition = parseFloat($('.post-card-dragger').css('transition-duration')) * 1000;

    let $card = $(element).find('.post-card-dragger');

    $card.on('mousedown touchstart', function(e) {
        e.preventDefault();

        if (e.which == 2 || e.which == 3 || cardsResetFlag == true || cardRemoving == true || $(element).hasClass('loading')) {
            return false;
        }

        let $cardDragged = $(this);
        let dragStartClientX = e.clientX || e.touches[0].clientX;

        $cardDragged.addClass('is-dragging');

        cardDragPosition = 0;

        $('body').on('mousemove.mve touchmove.tve', function(e) {
            let dragActualClientX = e.clientX || e.touches[0].clientX;
            let dragSumClientX = dragStartClientX - dragActualClientX;
            let dragTransformCard = Math.round(dragSumClientX) * -1;

            let cardRemoveSettings = {
                elements: {
                    container: $(element),
                    card: $cardDragged
                },
                values: {
                    transform: dragTransformCard
                }
            }

            if (dragSumClientX > 0) {
                if (dragTransformCard <= -100) {
                    cardRemove(cardRemoveSettings);

                    cardsIndex = cardsIndex - 1;
                } else {
                    cardSetTransform($cardDragged, dragTransformCard);
                }
            }

            if (dragSumClientX < 0) {
                if (dragTransformCard >= 100) {
                    cardRemove(cardRemoveSettings);

                    cardsIndex = cardsIndex - 1;
                } else {
                    cardSetTransform($cardDragged, dragTransformCard);
                }
            }

            cardDragPosition = dragSumClientX;
        });

        $('body').on('mouseleave.mlv', '.post-card-dragger', function() {
            if (cardRemoving == false) {
                cardsResetFlag = true;

                $cardDragged.removeClass('is-dragging');
                cardSetTransform($cardDragged, 0);
                cardUnbindTransform();

                setTimeout(function() {
                    cardsResetFlag = false;
                }, cardDragTransition);
            }
        });
    });

    $card.on('mouseup touchend', function(e) {
        e.preventDefault();

        if (e.which == 2 || e.which == 3 || cardsResetFlag == true || cardRemoving == true || $(element).hasClass('loading')) {
            return false;
        }

        if (cardDragPosition <= 3 && cardDragPosition >= -3) {
            window.location.href = $(element).find('.post-card').attr('href');
        }

        cardsResetFlag = true;

        let $cardDragged = $(this);

        $cardDragged.removeClass('is-dragging');
        cardSetTransform($cardDragged, 0);
        cardUnbindTransform();

        setTimeout(function() {
            cardsResetFlag = false;
        }, cardDragTransition);
    });

    $card.on('click', function(e) {
        e.preventDefault();
    });
}

function cardUnbindTransform() {
    $('body').unbind('mousemove.mve');
    $('body').unbind('touchmove.tve');
    $('body').unbind('mouseleave.mlv');
}

function cardSetTransform(element, value) {
    element.css({
        'touch-action': 'pan-y',
        'user-select': 'none',
        '-webkit-transform': 'translate(' + value + 'px) rotate(' + (value / 10) + 'deg)',
        'transform': 'translate(' + value + 'px) rotate(' + (value / 10) + 'deg)'
    });
}

function cardRemove(arraySettings) {
    cardRemoving = true;

    arraySettings.elements.card.removeClass('is-dragging');
    arraySettings.elements.card.parent('.post-card-wrapper').removeClass('visible');

    if (cardLastVisible == true) {
        if (arraySettings.elements.container.children('.post-card-wrapper.visible').first().next().hasClass('visible') == true) {
            cardLastVisible = false;

            arraySettings.elements.container.children('.post-card-wrapper.visible').first().next().next().addClass('visible');
        }

        arraySettings.elements.container.children('.post-card-wrapper.visible').first().next().addClass('visible');
    } else {
        arraySettings.elements.container.children('.post-card-wrapper.visible').last().next().addClass('visible');
    }

    if (arraySettings.elements.container.children('.post-card-wrapper.visible').last().next().length == 0 && arraySettings.elements.container.children('.post-card-wrapper.visible').length == 2) {
        cardLastVisible = true;

        arraySettings.elements.container.children('.post-card-wrapper').first().addClass('visible');
    }

    cardSetTransform(arraySettings.elements.card, (arraySettings.values.transform * 2));
    cardUnbindTransform();

    setTimeout(function() {
        cardSetTransform(arraySettings.elements.card, 0);
        arraySettings.elements.card.parent('.post-card-wrapper').css('zIndex', cardsIndex);

        cardRemoving = false;
    }, cardFadeTransition);
}

function cardsFirstInitScroll() {
    if (cardsFirstInit == false) {
        cardsFirstInit = true;

        $(window).on('load scroll resize', function() {
            clearTimeout(cardsFirstInitTimeout);

            cardsFirstInitTimeout = setTimeout(function() {
                let windowTop = $(this).scrollTop();
                let windowHeight = $(this).height();

                $('.post-cards').each(function() {
                    let $card = $(this);

                    let cardHeight = $card.outerHeight();
                    let cardOffsetTop = $card.offset().top;
                    let cardWidth = $card.outerWidth();
                    let cardOffsetLeft = $card.offset().left;                    
                    if (windowTop + windowHeight > cardOffsetTop && windowTop - cardHeight < cardOffsetTop && ww() > cardWidth + cardOffsetLeft && cardOffsetLeft > 0) {

                        if (!$card.hasClass('init')) {
                            $card.addClass('init loading');

                            setTimeout(function() {
                                $card.addClass('animated');

                                setTimeout(function() {
                                    $card.removeClass('animated loading');
                                }, 1500);
                            }, cardInitTransition);
                        }
                    }
                });
            }, 250);
        });
    }
}

cardsInit('#post_cards');