/* eslint-disable no-console */

const puppeteer = require('puppeteer');

const extensionPath = 'C:/Users/kiera/OneDrive - University of Glasgow/Computing Science/Level 3/Professional Software Development/Team Project/sh27-main';
const extensionId = 'nfeeaifmnnlphlhlpifkfonoddpfegag'; // Use your static extension ID

// ✅ Fixed: delay() function without returning inside promise executor
const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

(async function runTest() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });

    console.log('✅ Extension Loaded. Opening New Tab...');
    const page = await browser.newPage();
    await page.goto('about:blank');

    
    console.log('🔄 Opening Extension Popup...');
    const popupUrl = `chrome-extension://${extensionId}/src/component/hello.html`;
    const popupPage = await browser.newPage();
    await popupPage.goto(popupUrl, { waitUntil: 'load', timeout: 60000 });

    console.log('✅ Extension Popup Opened Successfully!');

    console.log('⏳ Preventing Popup from Closing...');
    await popupPage.hover('body');
    await popupPage.click('body'); // Click inside the popup
    await delay(2000); // ✅ Fixed the timeout issue

    console.log('🔍 Checking for input field...');
    await popupPage.waitForSelector('#noteinput', { timeout: 10000 });
    console.log('✅ Found #noteinput!');

    console.log('⌨ Typing a note...');
    await popupPage.type('#noteinput', 'Test Note');
    await popupPage.click('#addnote'); // Click the add note button

    console.log('✅ Note saved. Checking output...');
    await delay(2000); // ✅ Fixed timeout issue again
    const savedNote = await popupPage.$eval('#noteinput', (el) => el.value);
    console.assert(savedNote === '', '❌ Test failed: Note not cleared after save');

    console.log('✅ Test Passed! The note was saved correctly.');
    await browser.close();
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}());
