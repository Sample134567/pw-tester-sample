import {test, expect} from '@playwright/test';

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

test('Reusing locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    const emailField = basicForm.getByRole('textbox', {name: 'E-mail'});

    await emailField.fill('test@test.com');
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Welcome1234')
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();

    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting Values', async({page}) => {    
    // single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    const buttonText = await basicForm.locator('button').textContent();
    expect (buttonText).toBe('Submit');

    //all text values
    const allReadionButtonLabels = await page.locator('nb-readio').allTextContents();
    expect(allReadionButtonLabels).toContain('Option 1')

    const emailField = basicForm.getByRole('textbox', {name: 'E-mail'});
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect (emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect (placeholderValue).toEqual('E-mail')
})
