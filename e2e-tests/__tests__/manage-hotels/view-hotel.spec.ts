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

test('should display hotels', async ({ page }) => {
	await page.goto(`${UI_URL}/my-hotels`);
	await expect(page.getByRole('heading', { name: /my hotels/i })).toBeVisible();

	await expect(
		page.getByRole('heading', { name: /Name: khach san 5 sao/i }),
	).toBeVisible();

	await expect(
		page.getByText(/Desc: This is hotel description/i).first(),
	).toBeVisible();
	await expect(
		page.getByText(/Hotel city, Hotel country/i).first(),
	).toBeVisible();
	await expect(page.getByText(/Romantic/i).first()).toBeVisible();
	await expect(page.getByText(/100 per night/i).first()).toBeVisible();
	await expect(page.getByText(/3 stars/i).first()).toBeVisible();
	await expect(page.getByText(/2 adults, 0 children/i).first()).toBeVisible();

	// buttons
	await expect(
		page.getByRole('link', { name: /view details/i }).first(),
	).toBeVisible();
	await expect(page.getByRole('link', { name: /add hotel/i })).toBeVisible();
});
