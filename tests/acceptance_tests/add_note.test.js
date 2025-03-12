/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const path = require('path');

const extensionPath = path.resolve(__dirname, '../../'); // Adjust if needed
let extensionId = 'nfeeaifmnnlphlhlpifkfonoddpfegag'; // Use your extension ID dynamically

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

describe('Chrome Extension: Note Management Tests', () => {
  let browser;
  let page;
  let popupPage;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Visible mode for debugging
      slowMo: 100, // Slow down for better debugging
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });

    console.log('✅ Extension Loaded. Opening New Tab...');

    page = await browser.newPage();
    await page.goto('chrome://extensions');

    extensionId = await page.evaluate(() => {
      const extensionsItemElement = document.querySelector('body > extensions-manager')
        ?.shadowRoot.querySelector('#items-list')
        ?.shadowRoot.querySelector('extensions-item');

      return extensionsItemElement ? extensionsItemElement.getAttribute('id') : null;
    });

    console.log('🔄 Opening Extension Popup...');
    const popupUrl = `chrome-extension://${extensionId}/src/components/hello.html`;
    popupPage = await browser.newPage();
    await popupPage.goto(popupUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('✅ Extension Popup Opened Successfully!');
  }, 60000);

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test(
    'User can add a note',
    async () => {
      console.log('🔍 Checking for input field...');
      await popupPage.waitForSelector('#noteinput', { timeout: 10000 });

      console.log('⌨ Typing a note...');
      await popupPage.type('#noteinput', 'Test Note');

      // Debug: Check if text is typed
      const noteValue = await popupPage.$eval('#noteinput', (el) => el.value);
      console.log('📝 Note Field Value Before Saving:', noteValue);

      await delay(1000); // Ensure input is registered

      console.log('🔘 Waiting for the add button to be visible and enabled...');
      await popupPage.waitForSelector('#addnote', { visible: true, timeout: 10000 });

      // Check if the button is disabled
      const isButtonDisabled = await popupPage.$eval('#addnote', (el) => el.disabled);
      console.log('🔘 Add Button Disabled?:', isButtonDisabled);

      if (isButtonDisabled) {
        throw new Error('❌ Add button is disabled. The note may not be properly typed.');
      }

      console.log('🖱 Clicking the add button...');
      await popupPage.click('#addnote');

      console.log('✅ Note saved. Checking output...');
      await delay(2000);

      // Wait for the note to appear in the list
      await popupPage.waitForSelector('#tasks-display tr', { timeout: 10000 });

      const notesList = await popupPage.evaluate(() => Array.from(document.querySelectorAll('#tasks-display tr'))
        .map((el) => el.innerText));

      console.log('📝 Notes in UI:', notesList);

      expect(notesList.some((text) => text.includes('Test Note'))).toBe(true);

      console.log('✅ Test Passed! The note was successfully added.');
    },
    60000,
  );
});
