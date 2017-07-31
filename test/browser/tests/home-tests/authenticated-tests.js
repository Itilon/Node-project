/* eslint-disable max-len */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('../utils/ui');

const async = require('../../../../utils/async');

describe('Authenticated routes', () => {
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
        it('expect to have the latest category updated', () => {
            const username = 'krasi';
            const password = '123456';
            const firstArtileTitle = 'The Rhythms That MakeElephant Seals Run or Fight';
            const category = 'Random category';
            const content = 'And here’s why: In the rhythm and pitch of the first call, you recognize one voice as a familiar, more dominant male that you’ve fought with before. But you can’t discern the other, modified call, according to a study published Thursday in Current Biology. This suggests that elephant seals are the only known mammals other than humans that can use rhythm to recognize and respond to other members of their species in the wild.During breeding season, between December and March, elephant seals take a break from their lives at sea and congregate on the West Coast from San Francisco to Mexico. The males, called bulls, arrive first and fight to establish dominance. Winning males become alphas with a whole harem of females with which they can breed. Losers become betas, connecting with females only opportunistically, when the alphas aren’t around and dominating other males that are even lower in the hierarchy.';
            const file = 'D:/Nodejs Teamwork/Node-project/static/images/image.jpg';
            const tags = 'Animals';

            return async()
                .then(() => ui.click('button[id="login-button"]'))
                .then(() => ui.setValue('input[id="username"]', username))
                .then(() => ui.setValue('input[id="password"]', password))
                .then(() => ui.click('button[id="login-button"]'))
                .then(() => ui.click('#btn-nav-editor'))
                .then(() => ui.setValue('input[id="title"]', firstArtileTitle))
                .then(() => ui.setValue('input[id="file"]', file))
                .then(() => ui.setValue('input[id="category"]', category))
                .then(() => ui.setValue('input[id="tags"]', tags))
                .then(() => ui.setValue('textarea[id="content"]', content))
                .then(() => ui.click('button[id="submit-button"]'))
                .then(() => ui.click('#dropdown-btn'))
                .then(() => ui.click('#logout-button'))
                .then(() => ui.click('#btn-nav-home'))
                .then(() => ui.getTexts('#category-list'))
                .then((texts) => texts.slice(-1)[0])
                .then((text) => {
                    expect(text).to.include(category);
                });
        });
        it('to delete latest post', () => {
            const username = 'krasi';
            const password = '123456';
            const firstArtileTitle = 'The Rhythms That MakeElephant Seals Run or Fight123';
            const secondArtileTitle = 'The perks of being a wallflower';
            const category = 'Something Random';
            const content = 'And here’s why: In the rhythm and pitch of the first call, you recognize one voice as a familiar, more dominant male that you’ve fought with before. But you can’t discern the other, modified call, according to a study published Thursday in Current Biology. This suggests that elephant seals are the only known mammals other than humans that can use rhythm to recognize and respond to other members of their species in the wild.During breeding season, between December and March, elephant seals take a break from their lives at sea and congregate on the West Coast from San Francisco to Mexico. The males, called bulls, arrive first and fight to establish dominance. Winning males become alphas with a whole harem of females with which they can breed. Losers become betas, connecting with females only opportunistically, when the alphas aren’t around and dominating other males that are even lower in the hierarchy.';
            const file = 'D:/Nodejs Teamwork/Node-project/static/images/image.jpg';
            const tags = 'Animals';

            return async()
                .then(() => ui.setValue('input[id="username"]', username))
                .then(() => ui.setValue('input[id="password"]', password))
                .then(() => ui.click('button[id="login-button"]'))
                .then(() => ui.click('#btn-nav-editor'))
                .then(() => ui.setValue('input[id="title"]', firstArtileTitle))
                .then(() => ui.setValue('input[id="file"]', file))
                .then(() => ui.setValue('input[id="category"]', category))
                .then(() => ui.setValue('input[id="tags"]', tags))
                .then(() => ui.setValue('textarea[id="content"]', content))
                .then(() => ui.click('button[id="submit-button"]'))
                .then(() => ui.setValue('input[id="title"]', secondArtileTitle))
                .then(() => ui.setValue('input[id="file"]', file))
                .then(() => ui.setValue('input[id="category"]', category))
                .then(() => ui.setValue('input[id="tags"]', tags))
                .then(() => ui.setValue('textarea[id="content"]', content))
                .then(() => ui.click('button[id="submit-button"]'))
                .then(() => ui.click('#btn-nav-articles'))
                .then(() => ui.click('#delete-btn'))
                .then(() => ui.getText('#article-title'))
                .then((text) => {
                    expect(text).to.deep.equal(firstArtileTitle);
                });
        });
    });
});
