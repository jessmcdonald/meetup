import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(50000);
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/", { timeout: 50000 });
    await page.waitForSelector(".Event");
  });

  afterAll(async () => {
    browser.close();
  });

  //scenario 1

  test("An event element is collapsed by default", async () => {
    const extra = await page.$(".Event .eventDetails");
    expect(extra).toBeNull();
  });

  //scenario 2

  test("User can expand an event to see its details", async () => {
    await page.click(".Event .showDetailsButton");
    const extra = await page.$(".Event .eventDetails");
    expect(extra).toBeDefined();
  });

  //scenario 3

  test("User can collapse an event to hide its details", async () => {
    await page.click(".Event .showDetailsButton");
    await page.click(".hideDetailsButton");
    const extra = await page.$(".Event .eventDetails");
    expect(extra).toBeNull();
  });
});

describe("Filter events by city", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      ignoreDefaultArgs: ["--disable-extensions"],
      args: ["--no-sandbox"],
      headless: false,
      slowMo: 150
    });

    page = await browser.newPage();
    await page.goto("http://localhost:3000/", { timeout: 50000 });
    await page.waitForSelector(".Event");
  });

  afterAll(() => {
    browser.close();
  });

  //scenario 1

  test("by default, if user has not searched  for a city, show upcoming events based on user location", async () => {
    const events = await page.$(".EventList");
    expect(events).toBeDefined();
  });

  //scenario 2

  test("user should see list of suggestions when they type city into search input", async () => {
    await page.type(".city", "Munich");
    let suggestions = await page.$(".suggestions li");
    expect(suggestions).toBeDefined();
  });

  //scenario 3

  test("user can select a city from suggestions list", async () => {
    await page.click(".suggestions li:first-child");
    //get contents of city input after user clicks on suggestoin
    const city = await page.$(".city", el => el.value);

    expect(city).toBeDefined();
  });
});
