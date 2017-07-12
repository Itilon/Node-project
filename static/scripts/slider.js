/* globals $ */

let index = 0;

setInterval( () => {
    const slides = $('.slide');

    $(slides[index]).hide(2000);

    index++;

    if (index === slides.length) {
        index = 0;
    }

    $(slides[index]).show(2000);
}, 6000);
