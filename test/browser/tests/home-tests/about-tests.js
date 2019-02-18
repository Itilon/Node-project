const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('../utils/ui');

const async = require('../../../../utils/async');

describe('About routes', () => {
    let driver = null;
    const appUrl = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    afterEach(() => {
        return driver.quit();
    });

    describe('About button', () => {
        beforeEach((done) => {
            Promise.resolve()
                .then(() => driver.get(appUrl))
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#btn-nav-about')
                    );
                })
                .then((btn) => {
                    btn.click();
                    done();
                });
        });


        it('expect to get text About us', () => {
            return async()
                .then(() => ui.getText('#about-title'))
                .then((text) => {
                    expect(text).to.deep.equal('About us');
                });
        });
    });
});

