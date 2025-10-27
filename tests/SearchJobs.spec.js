const { test, expect } = require('@playwright/test')

// Test: Navigate to Search Jobs page after login
test("Navigate to Search Jobs page after login", async function({ page }) {
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
    await page.getByPlaceholder("Enter your email").type("john@mailinator.com")
    await page.getByPlaceholder("Enter your password").type("Harin123")

    // Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Capture and log the toast message
    const toast = await page.locator("//div[@role='status']").textContent()
    console.log("The toast message is: " + toast)
    await page.waitForTimeout(3000)

    // Navigate to Search Jobs page
    await page.locator("//a[normalize-space()='Search Jobs']").click()
    await page.waitForTimeout(3000)

    // Verify URL to confirm navigation to Search Jobs page
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/jobs")
    await page.waitForTimeout(2000)
})

// Test: Search jobs with keyword
test("Search jobs with keyword", async function({ page }) {
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
    await page.getByPlaceholder("Enter your email").type("john@mailinator.com")
    await page.getByPlaceholder("Enter your password").type("Harin123")

    // Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Navigate to Search Jobs page
    await page.locator("//a[normalize-space()='Search Jobs']").click()
    await page.waitForTimeout(3000)

    // Enter search keyword in the search box
    await page.getByPlaceholder("Search by job title, facility, location, certification...").type("Nurse", { delay: 100 })
    await page.waitForTimeout(1000)

    // Click the search button
    await page.locator("//button[@class='absolute inset-y-0 right-0 pr-6 flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200']//*[name()='svg']").click()
    await page.waitForTimeout(5000)

    // Verify that search results are displayed using the correct selector
    const searchResults = await page.locator("//div[contains(@class, 'grid')]//div[contains(@class, 'bg-white')]").count()
    console.log("Number of search results found: " + searchResults)
    await page.waitForTimeout(2000)
})

// Test: Search with no results
test("Search with no results", async function({ page }) {
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
    await page.getByPlaceholder("Enter your email").type("john@mailinator.com")
    await page.getByPlaceholder("Enter your password").type("Harin123")

    // Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Navigate to Search Jobs page
    await page.locator("//a[normalize-space()='Search Jobs']").click()
    await page.waitForTimeout(3000)

    // Search for a term that should return no results
    await page.getByPlaceholder("Search by job title, facility, location, certification...").type("XYZInvalidJobTitle123", { delay: 100 })
    await page.waitForTimeout(1000)

    // Click the search button
    await page.locator("//button[@class='absolute inset-y-0 right-0 pr-6 flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200']//*[name()='svg']").click()
    await page.waitForTimeout(5000)

    // Verify that no results are displayed
    const noResultsCount = await page.locator("//div[contains(@class, 'grid')]//div[contains(@class, 'bg-white')]").count()
    console.log("Number of search results found: " + noResultsCount)
    await page.waitForTimeout(2000)
})