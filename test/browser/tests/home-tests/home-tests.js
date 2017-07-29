/* eslint-disable max-len */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const ui = require('../utils/ui');

const async = require('../../../../utils/async');

describe('Home routes', () => {
    let driver = null;
    const appUrl = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    afterEach(() => {
        return driver.quit();
    });

    describe('Home button', () => {
        beforeEach((done) => {
            Promise.resolve()
                .then(() => driver.get(appUrl));
            done();
        });
        it('expect to get text Latest Posts when on home', () => {
            return async()
                .then(() => ui.getText('#latest-posts'))
                .then((text) => {
                    expect(text).to.deep.equal('Latest Posts');
                });
        });
        it('expect to have the latest category updated', () => {
            return async()
                .then(() => ui.click('#btn-nav-home'))
                .then(() => ui.getTexts('#category-list'))
                .then((texts) => texts.slice(-1)[0])
                .then((text) => {
                    expect(text).to.include('Something Random');
                });
        });
    });
});
