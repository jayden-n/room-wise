import test, { expect } from '@playwright/test';

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

test('should book hotel', async ({ page }) => {
	await page.goto(UI_URL);
	await page.getByPlaceholder(/Search by location/i).fill('york');

	// check in/out time
	const date = new Date();
	date.setDate(date.getDate() + 3);
	const formattedDate = date.toISOString().split('T')[0]; //"2024-03-14T12:34:56.789Z" would become ["2024-03-14", "12:34:56.789Z"]

	await page.getByPlaceholder('Check-out Date').fill(formattedDate);

	await page.getByRole('button', { name: 'Search' }).click();

	await page.getByText('Khach san 5 sao').click();
	await expect(page).toHaveURL(/detail/);

	await page.getByRole('button', { name: /book now/i }).click();

	await expect(page.getByText('Total Cost: $46.00')).toBeVisible();

	const stripeFrame = page.frameLocator('iframe').first();
	await stripeFrame
		.locator('[placeholder="Card number"]')
		.fill('4242 4242 4242 4242');
	await stripeFrame.locator('[placeholder="MM / YY"]').fill('12/34');
	await stripeFrame.locator('[placeholder="CVC"]').fill('123');
	await stripeFrame.locator('[placeholder="ZIP"]').fill('12345');

	await page.getByRole('button', { name: 'Confirm Booking' }).click();
	await expect(page.getByText('Booking Saved!')).toBeVisible();

	await page.getByRole('link', { name: 'My Bookings' }).click();
	await expect(page.getByText('Khach san 5 sao')).toBeVisible();
});
