import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Valid login redirects to products page', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/.*inventory.html/);
        
        const header = page.locator('.title');
        await expect(header).toBeVisible();
        await expect(header).toHaveText('Products');
    });

    test('Invalid login displays correct error message', async () => {
        await loginPage.login('wrong_user', 'wrong_password');

        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toContainText(
            'Username and password do not match any user in this service'
        );
    });
});