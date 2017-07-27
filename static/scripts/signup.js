/* globals $ */

const button = $('#create-button');
const form = $('#logup-form');

button.click( () => {
    button.fadeOut(2400, () => {
        form.fadeIn(1200);
    });
});
