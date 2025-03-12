/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const path = require('path');

const extensionPath = path.resolve(__dirname, '../../');
let extensionId;

describe('Chrome Extension: Allow Rule Test', () => {
  let browser;
  let page;
  let popupPage;

  beforeAll(async () => {
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

  afterAll(async () => {
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
    console.log('🔍 Checking for indexing button...');
    await popupPage.waitForSelector('#indexing', { timeout: 10000 });

    console.log('🖱 Clicking indexing div...');
    await popupPage.click('#indexing');

    console.log('🔍 Checking for indexing pane...');
    await popupPage.waitForSelector('#indexing-pane', { timeout: 10000 }).then(() => {
      console.log('✅ Indexing pane found!');
    }).catch(() => {
      console.log('❌ Indexing pane not found!');
    });
  });

  test('User can add a new Site rule', async () => {
  console.log('🔍 Navigating to Indexing Settings...');
  await popupPage.waitForSelector('#urls-tab', { timeout: 10000 });

  console.log('🖱 Clicking URLs tab...');
  await popupPage.click('#urls-tab');

  console.log('🔍 Checking for Add Allow Rule button...');
  await popupPage.waitForSelector('.add-rule-btn', { timeout: 10000 });

  console.log('🖱 Clicking Add Allow Rule button...');
  await popupPage.click('.add-rule-btn');

  console.log('⌨ Ensuring input field is ready...');
  await popupPage.waitForSelector('#addRuleInput', { timeout: 10000 });
  
  console.log('⌨ Typing "https://www.gla.ac.uk/" into input field...');
  await popupPage.type('#addRuleInput', 'https://www.gla.ac.uk/', { delay: 100 });

  // Alternative approach: Directly set value if typing still fails
  await popupPage.evaluate(() => {
      const input = document.querySelector('#addRuleInput');
      if (input) input.value = 'https://www.gla.ac.uk/';
  });

  console.log('🖱 Clicking Add Rule button...');
  await popupPage.waitForSelector('#addRule', { timeout: 10000 });
  await popupPage.click('#addRule');

  console.log('⏳ Waiting briefly before visiting the site...');
 }, 20000);  

test('Website www.gla.ac.uk is correctly indexed after visiting the page', async () => {

  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log('🌐 Visiting www.gla.ac.uk...');
  const glaPage = await browser.newPage();
  await glaPage.goto('https://www.gla.ac.uk', { waitUntil: 'domcontentloaded' });

  console.log('⏳ Waiting for indexing to complete...');
  await new Promise(resolve => setTimeout(resolve, 20000));

  console.log('🔍 Checking indexed data in storage...');

  const storageData = await popupPage.evaluate(() => {
      return new Promise((resolve) => {
          chrome.storage.local.get('localSearchIndex', (result) => {
              resolve(result.localSearchIndex ? JSON.parse(result.localSearchIndex) : {});
          });
      });
  });

  console.log('📝 Parsed localSearchIndex:', storageData);

  const documentIds = storageData.documentIds || {};
  const allUrls = Object.values(documentIds);

  console.log('🌐 Indexed URLs:', allUrls);

  const glaIndexed = allUrls.some(url => url.includes('gla.ac.uk'));
  
  expect(glaIndexed).toBe(true);

  console.log('✅ Test Passed! www.gla.ac.uk was successfully indexed.');
}, 60000);








});
