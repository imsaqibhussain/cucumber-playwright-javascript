const { Before, BeforeAll, AfterAll, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

// Set a default timeout for Cucumber steps
setDefaultTimeout(60000);

// Launch the browser before all scenarios
BeforeAll(async () => {
  global.browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });
});

// Close the browser after all scenarios
AfterAll(async () => {
  await global.browser.close();
});

// Create a new browser context and page before each scenario
Before(async () => {
  global.context = await global.browser.newContext();
  global.page = await global.context.newPage();
});

// Cleanup and capture a screenshot after each scenario
After(async () => {
  // Define the path for storing screenshots
  const screenshotPath = path.join(__dirname, "screenshots");

  // Create the screenshot directory if it doesn't exist
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath);
  }

  // Generate a unique screenshot filename based on the current timestamp
  const screenshotFileName = `${Date.now()}.png`;
  const screenshotFilePath = path.join(screenshotPath, screenshotFileName);

  // Capture a screenshot and save it to the specified path
  await global.page.screenshot({ path: screenshotFilePath });
  console.log(`Screenshot captured: ${screenshotFileName}`);

  // Close the page and browser context
  await global.page.close();
  await global.context.close();
});
