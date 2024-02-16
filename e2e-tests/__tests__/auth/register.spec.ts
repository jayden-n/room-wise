import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173';

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
