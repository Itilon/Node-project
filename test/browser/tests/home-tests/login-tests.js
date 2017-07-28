const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('../utils/ui');

const async = require('../../../../utils/async');

describe('Login routes', () => {
    let driver = null;
    const appUrl = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    afterEach(() => {
        return driver.quit();
    });

    describe('Login button', () => {
        beforeEach((done) => {
            Promise.resolve()
                .then(() => driver.get(appUrl))
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#btn-nav-login')
                    );
                })
                .then((btn) => {
                    btn.click();
                    done();
                });
        });


        it('expect to get the welcome sign after logging in', () => {
            const username = 'Gosho';
            const password = '1';

            return async()
                .then(() => ui.setValue('input[id="username"]', username))
                .then(() => ui.setValue('input[id="password"]', password))
                .then(() => ui.click('button[id="login-button"]'))
                .then(() => ui.getText('h1'))
                .then((text) => {
                    expect(text).to.deep.equal('Welcome Gosho!');
                });
        });
        it('expect to get submit text when clicked on editor', () => {
            const username = 'Gosho';
            const password = '1';

            return async()
                .then(() => ui.setValue('input[id="username"]', username))
                .then(() => ui.setValue('input[id="password"]', password))
                .then(() => ui.click('button[id="login-button"]'))
                .then(() => ui.click('#btn-nav-editor'))
                .then(() => ui.getText('#submit-button'))
                .then((text) => {
                    expect(text).to.deep.equal('Submit');
                });
        });
    });
});

