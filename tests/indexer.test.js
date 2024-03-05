const puppeteer = require('puppeteer');

const EXTENSION_PATH = process.cwd();
let EXTENSION_ID;
let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  page = await browser.newPage();
  await page.goto('chrome://extensions');

  EXTENSION_ID = await page.evaluate(() => {
    const extensionsItemElement = document
      .querySelector('body > extensions-manager')
      ?.shadowRoot.querySelector('#items-list')
      ?.shadowRoot.querySelector('extensions-item');
    return extensionsItemElement
      ? extensionsItemElement.getAttribute('id')
      : null;
  });
});

afterAll(async () => {
  await browser.close();
  browser = undefined;
});

test('Test if page is indexed', async () => {
  const testLink = 'https://www.amazon.com/';
  let linkExists = false;
  await page.goto(testLink);
  await page.waitForTimeout(3000);
  await page.goto(`chrome-extension://${EXTENSION_ID}/settings.html`);
  const indexedData = await page.evaluate(
    () => new Promise((resolve) => {
      chrome.storage.local.get('indexed', (result) => {
        resolve(result.indexed);
      });
    }),
  );
  if (indexedData != null) {
    linkExists = indexedData.links.includes(testLink);
  }
  expect(linkExists).toBe(true);
});

test('Add new rule to indexing sites', async ()=>{
    const testLink = "https://www.nba.com/games";
    await page.goto(`chrome-extension://${EXTENSION_ID}/settings.html`);
    await page.click("#indexing");
    await page.click("#string-matches-tab");
    await page.click('button[data-bs-target="#addRuleModal"]');
    await page.waitForTimeout(2000);
    await page.type("#addRuleInput","nba");
    await page.click("#addRule");

    let linkExists = false;
    await page.goto(testLink);
    await page.waitForTimeout(3000);
    await page.goto(`chrome-extension://${EXTENSION_ID}/settings.html`);
    const indexedData = await page.evaluate(
      () => new Promise((resolve) => {
        chrome.storage.local.get('indexed', (result) => {
          resolve(result.indexed);
        });
      }),
    );
    if (indexedData != null) {
      linkExists = indexedData.links.includes(testLink);
    }
    expect(linkExists).toBe(true);
});
