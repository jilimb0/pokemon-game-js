import { expect, test } from "@playwright/test"

test.describe("Pokemon Game", () => {
  test("selection screen shows 6 Pokemon", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("#selection")).toBeVisible()
    const cards = page.locator(".selection-card")
    await expect(cards).toHaveCount(6)
  })

  test("can select a Pokemon and start battle", async ({ page }) => {
    await page.goto("/")
    await page.locator(".selection-card").first().click()
    await expect(page.locator("#start-battle")).toBeEnabled()
    await page.locator("#start-battle").click()
    await expect(page.locator("#game")).toBeVisible()
    await expect(page.locator(".control button")).toHaveCount(4)
  })

  test("battle log updates after attack", async ({ page }) => {
    await page.goto("/")
    await page.locator(".selection-card").first().click()
    await page.locator("#start-battle").click()
    const attackBtn = page.locator(".control button").first()
    await expect(attackBtn).toBeVisible()
    await attackBtn.click()
    await expect(page.locator("#logs p")).toHaveCount(1)
  })

  test("HP bar decreases after attack", async ({ page }) => {
    await page.goto("/")
    await page.locator(".selection-card").first().click()
    await page.locator("#start-battle").click()
    const initialWidth = await page.locator("#progressbar-player2").getAttribute("style")
    await page.locator(".control button").first().click()
    await page.waitForTimeout(200)
    const newWidth = await page.locator("#progressbar-player2").getAttribute("style")
    expect(newWidth).not.toBe(initialWidth)
  })

  test("result modal appears on victory", async ({ page }) => {
    await page.goto("/")
    await page.locator(".selection-card").first().click()
    await page.locator("#start-battle").click()
    // Click attacks rapidly to finish battle
    for (let i = 0; i < 10; i++) {
      const btn = page.locator(".control button:not([disabled])").first()
      if (await btn.isVisible().catch(() => false)) {
        await btn.click().catch(() => {})
      }
      await page.waitForTimeout(300)
      const modal = page.locator("#result")
      if (await modal.isVisible().catch(() => false)) break
    }
    await expect(page.locator("#result")).toBeVisible({ timeout: 10000 })
    await expect(page.locator("#result-text")).not.toBeEmpty()
  })

  test("restart button reloads the game", async ({ page }) => {
    await page.goto("/")
    await page.locator(".selection-card").first().click()
    await page.locator("#start-battle").click()
    // Do some attacks to trigger restart
    for (let i = 0; i < 5; i++) {
      const btn = page.locator(".control button:not([disabled])").first()
      if (await btn.isVisible().catch(() => false)) {
        await btn.click().catch(() => {})
      }
      await page.waitForTimeout(100)
    }
    await page
      .locator("#restart-game")
      .click()
      .catch(() => {})
    await page.waitForTimeout(500)
    await expect(page.locator("#selection")).toBeVisible()
  })
})
