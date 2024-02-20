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

test('should edit hotel', async ({ page }) => {
	page.goto(`${UI_URL}/my-hotels`);
	page
		.getByRole('link', { name: /view details/i })
		.first()
		.click();
	await expect(
		page.getByRole('heading', { name: /edit hotel/i }),
	).toBeVisible();

	// wait for data fetching in dom
	await page.waitForSelector('[name="name"]', { state: 'attached' });
	await expect(page.locator('[name="name"]')).toHaveValue(/khach san 5 sao/i);

	// Fill the input with the updated value
	await page.locator('[name="name"]').fill('khach san 5 sao. updated!');
	await page.getByRole('button', { name: /save/i }).click();
	await expect(page.getByText(/hotel saved!/i)).toBeVisible();

	await page.reload();

	// looping to pass test every time
	await expect(page.locator('[name="name"]')).toHaveValue(
		/khach san 5 sao. updated!/i,
	);
	await page.locator('[name="name"]').fill('khach san 5 sao');
	await page.getByRole('button', { name: /save/i }).click();
});
