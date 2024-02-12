import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173';

test('should allow the user to login', async ({ page }) => {
	await page.goto(UI_URL);

	// ================== navigates to login page ==================
	// get the login link
	await page.getByRole('link', { name: /login/i }).click();
	// get the login page thru the heading
	await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();

	// ================== login flow ==================
	// make sure to also have "create an account"
	page.getByRole('link', { name: /create an account here/i });

	// make sure to have email/password input (separate database)
	await page.locator('[name=email]').fill('test@test.com');
	await page.locator('[name=password]').fill('password123');

	// make sure to click on Login button after filling in login form
	await page.getByRole('button', { name: /login/i }).click();

	// make sure to have "successful" pop-up
	await expect(page.getByText(/user logged in successful!/i)).toBeVisible();
	await expect(page.getByText(/my bookings/i)).toBeVisible();
	await expect(page.getByText(/my hotels/i)).toBeVisible();
	await expect(page.getByRole('button', { name: /log out/i })).toBeVisible();
});
