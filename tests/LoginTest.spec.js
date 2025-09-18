const { test, expect } = require("@playwright/test")

// Test: Login Flow with valid credentials
test("Login Flow with valid credentials", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Enter valid email and password
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com")
    await page.getByPlaceholder("Enter your password").type("Harin123")

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
})

// Test: Login Flow with invalid credentials
test("Login Flow with invalid credentials", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Enter invalid email or password
    await page.getByPlaceholder("Enter your email").type("qa1@yopmail.com")
    await page.getByPlaceholder("Enter your password").type("Harin123")

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Capture and log the toast message
    const toast = await page.locator("//div[@role='status']").textContent()
    console.log("The totast message is: " + toast)
    await page.waitForTimeout(3000)
})

// Test: Login Flow with empty credentials
test("Login Flow with empty credentials", async function({ page }){
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Click the Login button without entering credentials
    await page.locator("//button[normalize-space()='Login']").click()

    // Capture and log validation messages
    const emailValidation = await page.locator("//p[@id='email-error']").textContent()
    console.log("The email validation message is: " + emailValidation)
    const passwordValidation = await page.locator("//p[@id='password-error']").textContent()
    console.log("The password validation message is: " + passwordValidation)
    await page.waitForTimeout(2000)
})

// Test: Enter email only and click on login
test("Enter email only and click on login", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Enter only the email
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com")
    await page.waitForTimeout(2000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Capture and log the password validation message
    const passwordValidation = await page.locator("//p[@id='password-error']").textContent()
    console.log("The password validation message is: " + passwordValidation)
    await page.waitForTimeout(2000)
})

// Test: Enter password only and click on login
test("Enter password only and click on login", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Enter only the password
    await page.getByPlaceholder("Enter your password").type("Harin123")
    await page.waitForTimeout(2000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Capture and log the email validation message
    const emailValidation = await page.locator("//p[@id='email-error']").textContent()
    console.log("The email validation message is: " + emailValidation)
    await page.waitForTimeout(2000)
})

// Test: Sign out from the app
test("Sign out from the app", async function({ page }){
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Enter valid email and password
    await page.getByPlaceholder("Enter your email").type("JenLail1117@gmail.com")
    await page.getByPlaceholder("Enter your password").type("Harin123")

    //Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Open user menu and sign out
    await page.locator("//div[@class='w-8 h-8 bg-gray-400 text-black rounded-full flex items-center justify-center text-sm font-semibold overflow-hidden']").click()
    await page.waitForTimeout(3000)
    await page.locator("//button[normalize-space()='Sign Out']").click()

    // Handle the confirmation dialog
    page.on('dialog', async (dialogWindow) => {
        // Accept the sign out confirmation dialog
        await dialogWindow.accept()
    })
    //await page.waitForTimeout(2000)

    // Verify that the user is redirected to the homepage after sign out
    expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)
})

// Test: Forgot Password Flow
test.only("Forgot Password Flow", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Click on 'Forgot your password?' link
    await page.locator("//button[normalize-space()='Forgot your password?']").click()
    await page.waitForTimeout(2000)

    // Enter the email address for password reset
    await page.getByPlaceholder("Enter your email address").type("qa@yopmail.com")

    // Click the 'Send Reset Link' button
    await page.locator("//button[normalize-space()='Send Reset Link']").click()

    // Verify navigation to forgot-password page and log the toast message
    expect(page).toHaveURL(/forgot-password/)
    const toast = await page.locator("//div[@role='status']").textContent()
    console.log("The totast message is: " + toast)
    await page.waitForTimeout(5000)

    // Click 'Back to Login' and verify navigation
    await page.locator("//a[normalize-space()='Back to Login']").click()
    expect(page).toHaveURL(/login/)
    await page.waitForTimeout(2000)
})