import {test, expect} from '@playwright/test';

test.beforeEach(async({page}) => { 
await page.goto('https://uitestingplayground.com/ajax');

await page.getByText('Button Triggering AJAX Request').click();
});

test('Auto waiting', async ({page}) => {
    const succesButton = page.locator('.bg-success');

    // await succesButton.click();

    // const text = await succesButton.textContent();
    // await succesButton.waitFor({state: "attached"})
    // const text = await succesButton.allTextContents();

    //expect(text).toContain('Data loaded with AJAX get request.');

    await expect(succesButton).toHaveText('Data loaded with AJAX get request')
});


test('alternative waits', async ({page}) => {
    const succesButton = page.locator('.bg-success');

    // Wait element selectors
    // await page.waitforSelector('.bg-success');

    // wait for particular response
    await page.waitForResponse('https://uitestingplayground.com/ajaxdata')
    
    const text = await succesButton.allTextContents();
    await expect(succesButton).toHaveText('Data loaded with AJAX get request.')
});

test('timeouts', async ({page}) => {
    const succesButton = page.locator('.bg-success');
    await succesButton.click();
});