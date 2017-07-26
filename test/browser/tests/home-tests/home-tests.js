/* eslint-disable no-unused-expressions */

 const { expect } = require('chai');
 const { setupDriver } = require('../utils/setup-driver');
 const webdriver = require('selenium-webdriver');
 const ui = require('../utils/ui');


 describe('Home routes', () => {
     let driver = null;

     const appUrl = 'http://localhost:3002';

        beforeEach(() => {
        driver = setupDriver('chrome');
    });
        afterEach(() => {
        driver.quit();
    });
     it('expect h2 with text "First Article Title"', (done) => {
         driver.get(appUrl)
             .then(() => {
                 return driver.findElement(
                     webdriver.By.css('h2')
                 );
             })
             .then((el) => {
                 return el.getText();
             })
             .then((text) => {
                 expect(text).to.contain('First Article Title');
                 done();
             });
     });
       it('expect h2 with text "About us"', (done) => {
          driver.get(appUrl)
              .then(() => {
                  return driver.findElement(
                      webdriver.By.css('#btn-nav-about')
                  );
              })
              .then((btn) => {
                  btn.click();
                  done();
              })
              .then(() => {
              })
              .then(() => {
                 driver.findElement(webdriver.By.css('h2')
                 );
              })
              .then((el) => {
                  return el.getText();
              })
              .then((text) => {
                  expect(text).to.contain('About us');
                  done();
              });
      });
 });

     describe('Login routes', () => {
      let driver = null;
      const appUrl = 'http://localhost:3002';

         driver = setupDriver('chrome');
         ui.setDriver(driver);
         driver.get(appUrl);

          afterEach(() => {
            driver.quit();
        });
     it('expect h2 with text "REGISTERED USER"', (done) => {
          driver.get(appUrl)
              .then(() => {
                  return driver.findElement(
                      webdriver.By.css('#btn-nav-login')
                  );
              })
              .then((btn) => {
                  btn.click();
                  done();
              })
              .then(() => {
                 driver.findElement(webdriver.By.css('h2')
                 );
              })
              .then((el) => {
                  return el.getText();
              })
              .then((text) => {
                  expect(text).to.contain('REGISTERED USER');
                  done();
              });
      });
  });

   describe('Contact routes', () => {
     let driver = null;

     const appUrl = 'http://localhost:3002';

        driver = setupDriver('chrome');
        ui.setDriver(driver);
        driver.get(appUrl);

     it('expect h2 with text "Contact"', (done) => {
         driver.get(appUrl)
             .then(() => {
                 return driver.findElement(
                     webdriver.By.css('#btn-nav-contact')
                 );
             })
             .then((btn) => {
                 btn.click();
                 done();
             })
             .then(() => {
                driver.findElement(webdriver.By.css('h2')
                );
             })
             .then((el) => {
                 return el.getText();
             })
             .then((text) => {
                 expect(text).to.contain('CONTACT FORM');
                 done();
             });
     });
  });
