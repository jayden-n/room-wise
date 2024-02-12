import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173';

// LOGIN
test('should allow the user to login', async ({ page }) => {
	await page.goto(UI_URL);

	// ======================== navigates to login page ========================
	// get the login link
	await page.getByRole('link', { name: /login/i }).click();
	// get the login page thru the heading
	await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();

	// ======================== login flow ========================
	// make sure to also have "create an account"
	await expect(
		page.getByRole('link', { name: /create an account here/i }),
	).toBeVisible();

	// make sure to have email/password input (separate database)
	await page.locator('[name=email]').fill('test@test.com');
	await page.locator('[name=password]').fill('password123');

	// make sure to click on Login button after filling in login form
	await page.getByRole('button', { name: /login/i }).click();

	// make sure to have "successful" pop-up
	await expect(page.getByText(/user logged in successful!/i)).toBeVisible();
	await expect(page.getByRole('link', { name: /my bookings/i })).toBeVisible();
	await expect(page.getByRole('link', { name: /my hotels/i })).toBeVisible();
	await expect(page.getByRole('button', { name: /log out/i })).toBeVisible();
});

// REGISTER
test('should allow user to register', async ({ page }) => {
	const testEmail = `test_register_${
		Math.floor(Math.random() * 90000) + 10000
	}@test.com`;

	await page.goto(UI_URL);

	// navigates to login page first
	await page.getByRole('link', { name: /login/i }).click();
	// expect "create account link" pop ups
	await page.getByRole('link', { name: /create an account here/i }).click();
	// expect "create an account" heading text
	await expect(
		page.getByRole('heading', { name: /create an account/i }),
	).toBeVisible();

	// fill in register form
	await page.locator('[name=firstName]').fill('test_firstName_2');
	await page.locator('[name=lastName]').fill('test_lastName_2');
	await page.locator('[name=email]').fill(testEmail); // => pass in unique email every time
	await page.locator('[name=password]').fill('password123');
	await page.locator('[name=confirmPassword]').fill('password123');

	// register button
	await page.getByRole('button', { name: /register/i }).click();
	// make sure to have "successful" pop-up

	await expect(page.getByText(/Registration successful!/i)).toBeVisible();
	await expect(page.getByRole('link', { name: /my bookings/i })).toBeVisible();
	await expect(page.getByRole('link', { name: /my hotels/i })).toBeVisible();
	await expect(page.getByRole('button', { name: /log out/i })).toBeVisible();
});