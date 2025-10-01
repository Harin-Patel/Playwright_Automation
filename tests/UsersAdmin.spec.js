const{test,expect} = require('@playwright/test')

// Test: Navigate to Dashboard Admin after login
test("Navigate to Dashboard Admin after login", async function({ page }) {
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

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

// Test: Open the Users Tab
test("Open the Users Tab", async function({ page }){
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

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

    // Navigating to Users tab
    await page.locator("//div[@class='flex flex-col flex-grow bg-white border-r border-accent-200 rounded-r-2xl shadow-2xl']//a[@class='group flex items-center px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 text-gray-600 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2'][normalize-space()='Users']").first().click()
    await page.waitForTimeout(3000)

    // Verify URL to confirm navigation to Users tab
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin/users")
    await page.waitForTimeout(3000)
})

// Test: Create a new user
test("Create a new user", async function ({ page }){
    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

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
    await page.waitForTimeout(2000)

    // Navigating to Users tab
    await page.locator("//div[@class='flex flex-col flex-grow bg-white border-r border-accent-200 rounded-r-2xl shadow-2xl']//a[@class='group flex items-center px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 text-gray-600 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2'][normalize-space()='Users']").first().click()
    await page.waitForTimeout(2000)

    // Open the 'Create New User' modal
    await page.locator("//button[normalize-space()='Add User']").click()
    await page.waitForTimeout(3000)
    
    // Fill in the new user details
    await page.locator("//input[@name='firstName']").type("Julie", {delay:100})
    await page.locator("//input[@name='lastName']").type("Peter", {delay:100})
    await page.locator("//input[@name='email']").type("julie@yopmail.com", {delay:100})
    await page.locator("//input[@id='mobile']").type("9876543210", {delay:100})
    await page.locator("//input[@placeholder='Enter password']").type("Harin123", {delay:100})
    await page.locator("//button[normalize-space()='Create']").click()
    await page.waitForTimeout(2000)

    // Capture and log the toast message
    const toast1 = await page.locator("//div[@role='status']").textContent()
    console.log("The toast message is: " + toast1)
    await page.waitForTimeout(2000)

    // Verify URL to confirm still on Users tab
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin/users")
    await page.waitForTimeout(2000)

    // Search for the newly created user
    await page.locator("//input[@placeholder='Search users...']").fill("Julie")
    await page.waitForTimeout(2000)
})

// Test: Verify Delete user functionality
test("Verify Delete user functionality", async function({ page }){
     // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

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
    await page.waitForTimeout(2000)

    // Navigating to Users tab
    await page.locator("//div[@class='flex flex-col flex-grow bg-white border-r border-accent-200 rounded-r-2xl shadow-2xl']//a[@class='group flex items-center px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 text-gray-600 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2'][normalize-space()='Users']").first().click()
    await page.waitForTimeout(2000)

    // Search for the user to be deleted
    await page.locator("//input[@placeholder='Search users...']").fill("Julie")
    await page.waitForTimeout(2000)

    // Set up the dialog handler before clicking the delete button
    page.on('dialog', async (dialog) => {
        await dialog.accept();
    })

    // Click on the delete icon to delete the user
    await page.locator("//tbody/tr[1]/td[5]/div[1]/button[2]//*[name()='svg']").click()
    await page.waitForTimeout(2000)

    // Capture and log the toast message after deletion
    const toast1 = await page.locator("//div[@role='status']").textContent()
    console.log("The toast message is: " + toast1)
    await page.waitForTimeout(2000)
    
    // Verify URL to confirm still on Users tab
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin/users")
    await page.waitForTimeout(2000)

    // Verify that the user is no longer in the list
    await page.locator("//input[@placeholder='Search users...']").fill("")
    await page.locator("//input[@placeholder='Search users...']").fill("Julie")
    await page.waitForTimeout(2000)
    
    // Check that no user is found after deletion
    const userRows = await page.locator("//tbody/tr").count();
    expect(userRows).toBe(0);
})

// Test: Edit User details
test("Edit User details", async function({ page }){
     // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

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
    await page.waitForTimeout(2000)

    // Navigating to Users tab
    await page.locator("//div[@class='flex flex-col flex-grow bg-white border-r border-accent-200 rounded-r-2xl shadow-2xl']//a[@class='group flex items-center px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 text-gray-600 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2'][normalize-space()='Users']").first().click()
    await page.waitForTimeout(2000)

    // Search for the user to be edited
    await page.locator("//input[@placeholder='Search users...']").fill("Julia")
    await page.waitForTimeout(2000)

    // Click on the edit icon to edit the user details
    await page.locator("//tbody/tr[1]/td[5]/div[1]/button[1]//*[name()='svg']").click()
    await page.waitForTimeout(2000)

    // Update the user details
    await page.locator("//input[@name='firstName']").fill("")
    await page.locator("//input[@name='firstName']").type("Julia", {delay:100})
    await page.locator("//input[@name='lastName']").fill("")
    await page.locator("//input[@name='lastName']").type("Roberts", {delay:100})
    await page.locator("//input[@name='email']").fill("")
    await page.locator("//input[@name='email']").type("julia@mailnesia.com", {delay:100})
    await page.locator("//input[@id='mobile']").fill("")
    await page.locator("//input[@id='mobile']").type("9123456780", {delay:100})
    await page.locator("//button[normalize-space()='Update']").click()
    await page.waitForTimeout(2000)

    //Verify the toast message after updating user details
    const toast1 = await page.locator("//div[@role='status']").textContent()
    console.log("The toast message is: " + toast1)
    await page.waitForTimeout(2000)
    
    // Verify URL to confirm still on Users tab
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin/users")
    await page.waitForTimeout(2000)
})

// Test: Verfiy navigating to the user's details page
test.only("Verfiy navigating to the user's details page", async function({ page }){
     // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

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
    await page.waitForTimeout(2000)

    // Navigating to Users tab
    await page.locator("//div[@class='flex flex-col flex-grow bg-white border-r border-accent-200 rounded-r-2xl shadow-2xl']//a[@class='group flex items-center px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 text-gray-600 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2'][normalize-space()='Users']").first().click()
    await page.waitForTimeout(2000)

    // Search for the user to be edited
    await page.locator("//input[@placeholder='Search users...']").fill("Julia")
    await page.waitForTimeout(2000)

    // Click on the eye icon to navigate to the user's details page
    await page.locator("//tbody/tr[1]/td[5]/div[1]/button[3]//*[name()='svg']").click()
    await page.waitForTimeout(2000)

    // Verify opening of user's details page by checking for the presence of 'User Details' text with the user's name
    const userDetailsHeader = await page.locator("//h2[normalize-space()='User Details - Julia Roberts']").textContent()
    console.log("The header text is: " + userDetailsHeader)
    await expect(page.locator("//h2[normalize-space()='User Details - Julia Roberts']")).toBeVisible()
    await page.waitForTimeout(2000)

    // Close the user details page and return to Users tab
    await page.locator("//button[normalize-space()='×']").click()
    await page.waitForTimeout(2000)

    // Verify URL to confirm still on Users tab
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin/users")
    await page.waitForTimeout(2000)
})
