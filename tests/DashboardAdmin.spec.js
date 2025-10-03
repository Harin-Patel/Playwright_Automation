const{test,expect} = require("@playwright/test")

// Test: Navigate to Dashboard Admin after login
test("Navigate to Dashboard Admin after login", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//button[normalize-space()='Log in']").click()
    await page.waitForTimeout(2000)

    // Select For Job Seekers option from the dropdown
    await page.locator("//a[normalize-space()='For Job Seeker']").click()
    await page.waitForTimeout(1000)

    // Enter valid email and password
    await page.getByPlaceholder("Enter your email").type("admin@jobapp.com")
    await page.getByPlaceholder("Enter your password").type("admin123")

    //Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Capture and log the toast message
    const toast = await page.locator("//div[@role='status']").textContent()
    console.log("The toast message is: " + toast)
    await page.waitForTimeout(3000)

    // Verify URL to confirm navigation to Dashboard Admin
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin")
    await page.waitForTimeout(3000)
})

// Test: Verify Logout functionality from Dashboard Admin
test("Verify Logout functionality from Dashboard Admin", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//button[normalize-space()='Log in']").click()
    await page.waitForTimeout(2000)

    // Select For Job Seekers option from the dropdown
    await page.locator("//a[normalize-space()='For Job Seeker']").click()
    await page.waitForTimeout(1000)

    // Enter valid email and password
    await page.getByPlaceholder("Enter your email").type("admin@jobapp.com")
    await page.getByPlaceholder("Enter your password").type("admin123")

    //Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Capture and log the toast message
    const toast = await page.locator("//div[@role='status']").textContent()
    console.log("The toast message is: " + toast)
    await page.waitForTimeout(3000)

    // Verify URL to confirm navigation to Dashboard Admin
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin")
    await page.waitForTimeout(3000)

    // Click on the 'Logout' button
    await page.locator("//button[normalize-space()='Logout']").click()
    await page.waitForTimeout(2000)
    await page.locator("//button[normalize-space()='Sign Out']").click()

    // Handle the confirmation dialog
    page.on('dialog', async (dialogWindow) => {
        // Accept the sign out confirmation dialog
        await dialogWindow.accept()
    })

    // Capture and log the toast message after logout
    const toast1 = await page.locator("//div[@role='status']").textContent()
    console.log("The toast message after logout is: " + toast1)
    await page.waitForTimeout(2000)

    // Verify URL to confirm navigation back to homepage after logout
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/login")
    await page.waitForTimeout(2000)
})