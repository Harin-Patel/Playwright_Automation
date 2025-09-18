const { test, expect } = require("@playwright/test")
test.use({viewport: { width: 1920, height: 849 }})

// Test: Sign Up Flow with valid credentials
test("Sign Up Flow with valid credentials", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Sign Up' link
    await page.locator("//a[normalize-space()='Sign Up']").click()
    await page.waitForTimeout(2000)

    // Fill out the registration form with valid data
    await page.getByPlaceholder("First name").type("Jack", { delay: 200 })
    await page.getByPlaceholder("Last name").type("Peter", { delay: 200 })
    await page.getByPlaceholder("Enter 10 digits").type("2066578172", { delay: 200 })
    await page.getByPlaceholder("Enter your email").type("jack@mailinator.com", { delay: 200 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 200 })
    await page.getByPlaceholder("Confirm your password").type("Harin123", { delay: 200 })

    // Scroll to the bottom to ensure the Register button is visible
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));

    // Click the Register button
    await page.locator("//button[normalize-space()='Register']").click()

    // Capture and log the toast message
    const toast = await page.locator("//div[@role='status']").textContent()
    console.log("The totast message is: " + toast)
    await page.waitForTimeout(3000)
})

// Test: Check validation for already existing email
test("Check email already exists validation", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Sign Up' link
    await page.locator("//a[normalize-space()='Sign Up']").click()
    await page.waitForTimeout(2000)

    // Fill out the registration form with an existing email
    await page.getByPlaceholder("First name").type("John", { delay: 200 })
    await page.getByPlaceholder("Last name").type("Doe", { delay: 200 })
    await page.getByPlaceholder("Enter 10 digits").type("2066578173", { delay: 200 })
    await page.getByPlaceholder("Enter your email").type("john@mailinator.com", { delay: 200 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 200 })
    await page.getByPlaceholder("Confirm your password").type("Harin123", { delay: 200 })

    // Scroll to the bottom to ensure the Register button is visible
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));

    // Click the Register button
    await page.locator("//button[normalize-space()='Register']").click()

    // Capture and log the toast message
    const toast = await page.locator("//div[@role='status']").textContent()
    console.log("The totast message is: " + toast)
    await page.waitForTimeout(3000)
})

// Test: Check validation messages for all fields when no data is filled
test("Check validation messages for all fields when no data is filled", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Sign Up' link
    await page.locator("//a[normalize-space()='Sign Up']").click()
    await page.waitForTimeout(2000)

    // Scroll to the bottom to ensure the Register button is visible
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));

    // Click the Register button without filling any fields
    await page.locator("//button[normalize-space()='Register']").click()
    await page.waitForTimeout(1000)

    // Scroll again to ensure all validation messages are visible
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
    await page.waitForTimeout(2000)

    // Assert validation messages for each required field
    await expect(page.locator("text=First name is required")).toBeVisible()
    await expect(page.locator("text=Last name is required")).toBeVisible()
    await expect(page.locator("text=Email is required")).toBeVisible()
    await expect(page.locator("text=Password is required")).toBeVisible()
    await expect(page.locator("text=Please confirm your password")).toBeVisible()
})

// Test: Redirect to Login page when clicking 'Login here' label from Register screen
test.only("Redirect to Login page from Register screen", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Sign Up' link to go to the registration page
    await page.locator("//a[normalize-space()='Sign Up']").click()
    await page.waitForTimeout(2000)

    // Scroll to the bottom of the page to ensure the 'Login here' link is visible
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
    await page.waitForTimeout(2000)

    // Click on the 'Login here' label/link
    await page.locator("text=Login here").click()
    await page.waitForTimeout(2000)

    // Assert that the URL contains 'login' indicating redirection to the login page
    await expect(page).toHaveURL(/.*login.*/)
})
