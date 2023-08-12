const { Before, BeforeAll, AfterAll, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, waitForTimeout } = require("playwright");
const path = require("path");
const fs = require("fs");
const { Status } = require("@cucumber/cucumber");

// Set a default timeout for Cucumber steps
setDefaultTimeout(60000);
let scenarioName;
let oldvideoPath;

async function launchBrowser() {
  global.browser = await chromium.launch({
    headless: false, //false open with browser/ true dont open browser
    slowMo: 1000, //slow motion
  });
}

async function createBrowserContextwithRecording() {
  global.context = await global.browser.newContext({
    recordVideo: {
      dir: path.join(__dirname, "videos"),
      size: { width: 640, height: 480 },
    }
  });
  await createPageContext()
}

async function createPageContext() {
  global.page = await global.context.newPage();
}

async function captureScreenshot() {
  const screenshotPath = path.join(__dirname, "screenshots")
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath);
  }
  const screenshotName = `${scenarioName}_${new Date().toLocaleString().replace(/[/:,]/g, '_')}.png`;
  console.log('screenshotName: ', screenshotName)
  const screenshotFilePath = path.join(screenshotPath, screenshotName);
  await global.page.screenshot({ path: screenshotFilePath });
}

async function closeContext() {
  await global.page.close();
  await global.page.video().delete();
  await global.context.close();
}

async function closeBrowser() {
  await global.browser.close();
}

async function renamedCapturedVideo() {
  await global.page.close()
  console.log('testing@..')
  const newVideoName = `${scenarioName}_${new Date().toLocaleString().replace(/[/:,]/g, '_')}.webm`;
  const newVideoPath = path.join(__dirname, "videos", newVideoName);
  await fs.promises.rename(oldvideoPath, newVideoPath);
  console.log('File is renamed');
}

// Launch the browser before all scenarios
BeforeAll(async () => {
  await launchBrowser()
});

// Create a new browser context and page before each scenario
Before(async (scenario) => {
  scenarioName = scenario.pickle.name;
  await createBrowserContextwithRecording()
});

// Cleanup and capture a screenshot after each scenario
After(async function (scenario) {
  oldvideoPath = await global.page.video().path();
  if (scenario.result.status === Status.FAILED) {
    await captureScreenshot()
    console.log('Scenario is failed.')
    await renamedCapturedVideo()
  }
  else {
    await closeContext()
    console.log('Your scenario is looking good!.')
  }
});

// Close the browser after all scenarios
AfterAll(async function (){
  await closeBrowser()
});