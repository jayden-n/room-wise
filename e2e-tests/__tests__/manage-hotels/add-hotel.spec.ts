import test, { expect } from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173';

test.beforeEach('should allow user to login first', async ({ page }) => {
	await page.goto(UI_URL);
	await page.getByRole('link', { name: /login/i }).click();
	await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
	// ======================== login flow ========================
	await expect(
		page.getByRole('link', { name: /create an account here/i }),
	).toBeVisible();
	await page.getByLabel(/email/i).fill('test@test.com');
	await page.getByLabel(/password/i).fill('password123');
	await page.getByRole('button', { name: /login/i }).click();
	await expect(page.getByText(/user logged in successful!/i)).toBeVisible();
});

// add hotel
test('should allow user to add a hotel', async ({ page }) => {
	await page.goto(`${UI_URL}/add-hotel`);
	await expect(page.getByRole('heading', { name: /add hotel/i })).toBeVisible();

	// inputs
	await page.locator('[name="name"]').fill('Test hotel');
	await page.locator('[name="city"]').fill('Hotel city');
	await page.locator('[name="country"]').fill('Hotel country');
	await page.locator('[name="description"]').fill('This is hotel description');
	await page.locator('[name="pricePerNight"]').fill('100');
	await page.selectOption('[name="starRating"]', '3'); // choose value 3

	// hotel type
	await page.getByText(/romantic/i).click();

	// facilities
	await page.getByLabel(/free wifi/i).check();
	await page.getByLabel(/parking/i).check();

	// guests
	await page.locator('[name="adultCount"]').fill('2');
	await page.locator('[name="childCount"]').fill('0');

	// image uploads
	await page.setInputFiles('[name="imageFiles"]', [
		path.join('__tests__', 'assets', '1.png'),
		path.join('__tests__', 'assets', '2.png'),
	]);

	// submit button
	await page.getByRole('button', { name: /add hotel/i }).click();
	await expect(page.getByText(/hotel saved!/i)).toBeVisible(); // successful
});
