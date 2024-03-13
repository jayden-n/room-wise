import test, { expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach("should allow user to login first", async ({ page }) => {
	await page.goto(UI_URL);
	await page.getByRole("link", { name: /login/i }).click();
	await expect(page.getByRole("heading", { name: /login/i })).toBeVisible();
	// ======================== login flow ========================
	await expect(
		page.getByRole("link", { name: /create an account here/i }),
	).toBeVisible();
	await page.getByLabel(/email/i).fill("test@test.com");
	await page.getByLabel(/password/i).fill("password123");
	await page.getByRole("button", { name: /login/i }).click();
	await expect(page.getByText(/user logged in successful!/i)).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
	await page.goto(UI_URL);
	await page.getByPlaceholder(/Search by location/i).fill("york");
	await page.getByRole("button", { name: "Search" }).click();

	await expect(page.getByText(/hotels found in york/i)).toBeVisible();
	await expect(page.getByText(/Khach san 5 sao/i)).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
	await page.goto(UI_URL);
	await page.getByPlaceholder(/Search by location/i).fill("york");
	await page.getByRole("button", { name: "Search" }).click();

	await page.getByText("Khach san 5 sao").click();
	await expect(page).toHaveURL(/detail/);

	await expect(page.getByRole("button", { name: /book now/i })).toBeVisible();
});
