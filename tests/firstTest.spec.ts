import {test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://console-test.remtrax.com/login');
})

test('The first test', async ({page}) => {  
    await page.getByText('Sign In').click();
})

test('Navigate to page ', async ({page}) => {  
    await page.goto('https://console-test.remtrax.com/login');
    await page.getByText('Sign In').click();
    
})
