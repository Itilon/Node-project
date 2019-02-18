/* globals $ */

let index = 0;

setInterval( () => {
    const slides = $('.slide');

    $(slides[index]).slideUp(2400);

    index++;

    if (index === slides.length) {
        index = 0;
    }

    $(slides[index]).slideDown(2400);
}, 6000);
