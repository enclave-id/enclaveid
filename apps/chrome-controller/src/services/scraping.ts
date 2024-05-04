import { Page } from 'puppeteer';

export async function scrapeGoogleTakeout(page: Page) {
  const deselectAllElement = await page.waitForSelector(
    `//span[text()="Deselect all"]`,
  );

  deselectAllElement.click();
}
