/* globals $ */

let index = 0;

setInterval( () => {
    const slides = $('.slide');
    let i;


    for (i = 0; i < slides.length; i += 1) {
        $(slides[i]).css('display', 'none');
    }

    index++;

    if (index > slides.length) {
        index = 1;
    }

    $(slides[index - 1]).css('display', 'block');
}, 6000);
