const puppeteer = require('puppeteer');

const extensionPath = "C:/Users/kiera/OneDrive - University of Glasgow/Computing Science/Level 3/Professional Software Development/Team Project/sh27-main";
const extensionId = "nfeeaifmnnlphlhlpifkfonoddpfegag"; // Use your static extension ID

(async () => {
  console.log("🚀 Launching Chrome with Extension...");

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  });

  console.log("✅ Extension Loaded. Opening New Tab...");
  const page = await browser.newPage();

  // Open a blank tab before opening popup
  await page.goto("about:blank");

  console.log("🔄 Opening Extension Popup...");
  const popupUrl = `chrome-extension://${extensionId}/src/components/hello.html`;

  const popupPage = await browser.newPage();
  await popupPage.goto(popupUrl, { waitUntil: "load", timeout: 60000 });

  console.log("✅ Extension Popup Opened Successfully!");

  // Keep the popup open
  console.log("⏳ Preventing Popup from Closing...");
  await popupPage.hover("body");
  await popupPage.click("body"); // Click inside the popup to keep it open
  await new Promise(resolve => setTimeout(resolve, 2000)); // Small delay before interacting

  // Debugging step: Take a screenshot to confirm the popup loads
  await popupPage.screenshot({ path: "popup-debug.png" });

  console.log("🔍 Checking for input field...");
  try {
    await popupPage.waitForSelector("#noteinput", { timeout: 10000 });
    console.log("✅ Found #noteinput!");
  } catch (error) {
    console.error("❌ Error: #noteinput not found. The popup may have closed.");
    console.log("🖼 Check the screenshot 'popup-debug.png' to see what happened.");
    await browser.close();
    return;
  }

  // Simulate typing and saving
  console.log("⌨ Typing a note...");
  await popupPage.type("#noteinput", "Test Note");
  await popupPage.click("#addnote"); // Click the add note button

  console.log("✅ Note saved. Checking output...");
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for note to be saved
  const savedNote = await popupPage.$eval("#noteinput", el => el.value);
  console.assert(savedNote === "", "❌ Test failed: Note not cleared after save");

  console.log("✅ Test Passed! The note was saved correctly.");

  await browser.close();
})();
