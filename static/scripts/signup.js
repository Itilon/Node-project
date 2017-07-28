/* globals $ */

const button = $('#create-button');
const form = $('#logup-form');

button.click( () => {
    button.fadeOut(1200, () => {
        form.fadeIn(1800);
    });
});
