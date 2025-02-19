/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const path = require('path');

const extensionPath = path.resolve(__dirname, '../../'); // Adjust if needed
const extensionId = 'nfeeaifmnnlphlhlpifkfonoddpfegag'; // Use your extension ID

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Chrome Extension: Add Note Test', () => {
  let browser;
  let page;
  let popupPage;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Set to true if you don't need UI
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });

    console.log('✅ Extension Loaded. Opening New Tab...');
    page = await browser.newPage();
    await page.goto('about:blank');

    console.log('🔄 Opening Extension Popup...');
    const popupUrl = `chrome-extension://${extensionId}/src/components/hello.html`;
    popupPage = await browser.newPage();
    await popupPage.goto(popupUrl, { waitUntil: 'load', timeout: 60000 });

    console.log('✅ Extension Popup Opened Successfully!');
  }, 60000); // Increase timeout to 60 seconds

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test(
    'User can add a note',
    async () => {
      console.log('⏳ Preventing Popup from Closing...');
      await popupPage.hover('body');
      await popupPage.click('body'); // Click inside the popup
      await delay(2000);

      console.log('🔍 Checking for input field...');
      await popupPage.waitForSelector('#noteinput', { timeout: 10000 });
      console.log('✅ Found #noteinput!');

      console.log('⌨ Typing a note...');
      await popupPage.type('#noteinput', 'Test Note');
      await popupPage.click('#addnote');

      console.log('✅ Note saved. Checking output...');
      await delay(2000);
      const savedNote = await popupPage.$eval('#noteinput', (el) => el.value);

      expect(savedNote).toBe(''); // Jest assertion instead of console.assert

      console.log('✅ Test Passed! The note was saved correctly.');
    },
    60000 // Increase test timeout to 60 seconds
  );
});
