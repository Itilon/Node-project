/* globals $ */

const button = $('#create-button');
const logupDiv = $('#logup-div');

button.click( () => {
    button.remove();
    logupDiv
        .append(`<form id="logup-form" 
                class="form-group" action="/logup" 
                method="post"></form>`);

    const form = $('#logup-form');

    form
        .append('<label for="user">Please, select your username:</label>');
    form
        .append(`<input id="user" 
                class="form-control" 
                type="text" 
                placeholder="Select your username" 
                onfocus="this.placeholder = ''" 
                onblur="this.placeholder = 'Enter your username'" 
                name="username">`);
    form
        .append('<label for="pass">Please, choose a password:</label>');
    form
        .append(`<input id="pass" 
                class="form-control" 
                type="password" 
                placeholder="Enter your password" 
                onfocus="this.placeholder = ''" 
                onblur="this.placeholder = 'Enter your password'" 
                name="password">`);
    form
        .append('<button class="button" type="submit">Sign Up</button>');
});
