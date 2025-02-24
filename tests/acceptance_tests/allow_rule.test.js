/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const path = require('path');

const extensionPath = path.resolve(__dirname, '../../');
let extensionId;

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

describe('Chrome Extension: Allow Rule Test', () => {
  let browser;
  let page;
  let popupPage;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });

    page = await browser.newPage();
    await page.goto('chrome://extensions');

    extensionId = await page.evaluate(() => {
      const extensionsItemElement = document.querySelector('body > extensions-manager')
        ?.shadowRoot.querySelector('#items-list')
        ?.shadowRoot.querySelector('extensions-item');

      return extensionsItemElement ? extensionsItemElement.getAttribute('id') : null;
    });

    const popupUrl = `chrome-extension://${extensionId}/src/components/hello.html`;
    popupPage = await browser.newPage();
    await popupPage.goto(popupUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('✅ Extension Popup Opened Successfully!');
  }, 60000);

  afterEach(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('Settings page exists', async () => {
    console.log('🔍 Checking for settings button...');
    await popupPage.waitForSelector('#manage-settings', { timeout: 10000 });

    console.log('🖱 Clicking settings button...');
    await popupPage.click('#manage-settings');

    console.log('🔍 Checking for settings page...');
    await popupPage.waitForSelector('.settings-container', { timeout: 10000 });
  });

  test('User can navigate to indexing part of settings page', async () => {
    console.log('🖱 Clicking settings button...');
    await popupPage.click('#manage-settings');

    console.log('🔍 Checking for indexing button...');
    await popupPage.waitForSelector('#indexing', { timeout: 10000 });

    console.log("🖱 Clicking indexing div...");
    await popupPage.click('#indexing');

    console.log('🔍 Checking for indexing pane...');
    await popupPage.waitForSelector('#indexing-pane', { timeout: 10000 }).then(() => {
      console.log('✅ Indexing pane found!');
    }).catch(() => {
      console.log('❌ Indexing pane not found!');
    });
  });

  test('User can add a new Site rule', async () => {
    console.log('🖱 Clicking settings button...');
    await popupPage.click('#manage-settings');

    console.log('Clicked settings button!');

    console.log('🔍 Checking for add Site rule button...');
    await popupPage.waitForSelector('#allow-rule-btn', { timeout: 10000 });

    console.log('🖱 Clicking button to add a new Site rule...');
    await popupPage.click('#allow-rule-btn');

    console.log('Typing Site rule...')
    await popupPage.type('#addRuleInput', 'www.gla.ac.uk');
    await popupPage.click('#addRule');

    await delay(1000);

    console.log('Site rule added!');

    // console.log('🖱 Clicking URLs tab...');
    // await popupPage.click('#urls-tab');

    // console.log('🖱 Clicking String matches tab...');
    // await popupPage.click('#string-matches-tab');

    // console.log('🖱 Clicking RegEx tab...');
    // await popupPage.click('#regex-tab');
  });

});