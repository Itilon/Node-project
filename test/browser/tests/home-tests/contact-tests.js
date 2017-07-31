/* eslint-disable max-len */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('../utils/ui');

const async = require('../../../../utils/async');

describe('Contact routes', () => {
    let driver = null;
    const appUrl = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    afterEach(() => {
        return driver.quit();
    });

    describe('Contact button', () => {
        beforeEach((done) => {
            Promise.resolve()
                .then(() => driver.get(appUrl))
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#btn-nav-contact')
                    );
                })
                .then((btn) => {
                    btn.click();
                    done();
                });
        });


        it('expect to get text CONTACT FORM', () => {
            return async()
                .then(() => ui.getText('#form-title'))
                .then((text) => {
                    expect(text).to.deep.equal('CONTACT FORM');
                });
        });
    });
});

