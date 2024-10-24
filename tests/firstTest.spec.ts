import {test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://console-test.remtrax.com/login');
})

test('User facing locator', async ({page}) => {  
    await page.getByRole('textbox', { name: 'E-mail' }).fill('pablo.sapitan@live.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('password');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForTimeout(5000);
})

test('Locating child elements', async ({page}) => {  
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();
})

test('locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'E-mail'}).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: 'E-mail'}).click();

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: 'E-mail'}).click();
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'E-mail'}).click();

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign In"}).getByRole('textbox', {name: "Email"}).click();

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click();
})