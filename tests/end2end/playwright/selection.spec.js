// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Selection', () => {

    test('Selection', async ({ page }) => {
        const url = 'index.php/view/map/?repository=testsrepository&project=selection';
        await page.goto(url, { waitUntil: 'networkidle' });

        await page.locator('#button-selectiontool').click();
        await page.locator('#selectiontool').getByRole('link').nth(1).click();
        await page.locator('.digitizing-point > svg > use').click();

        const xClick = 400;
        const yClick = 150;
        await page.mouse.click(xClick, yClick);

        await page.locator('lizmap-digitizing').getByRole('button').first().click();

        await page.mouse.move(xClick, yClick);
        await page.mouse.down();
        await page.mouse.move(xClick, yClick + 300);
        await page.mouse.up();

    });
});