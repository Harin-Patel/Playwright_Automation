const{test,expect} = require('@playwright/test')

// Test: Navigate to Jobs Admin page
test("Navigate to Jobs Admin page", async function({ page }){
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

    // Verify URL to confirm navigation to Dashboard Admin
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin")
    //await page.waitForTimeout(2000)

    // Click on the Jobs from the side menu
    await page.locator("//div[@class='flex flex-col flex-grow bg-white border-r border-accent-200 rounded-r-2xl shadow-2xl']//a[@class='group flex items-center px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 text-gray-600 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2'][normalize-space()='Jobs']").first().click()
    await page.waitForTimeout(2000)

    // Verify URL to confirm navigation to Jobs Management page
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin/jobs")
    await page.waitForTimeout(2000)

    // Capture and log the page title
    const pageTitle = await page.locator("//h1[normalize-space()='Job Management']").textContent()
    console.log("The page title is: " + pageTitle)
    await page.waitForTimeout(2000)
})

// Test: Add New Job
test("Add New Job", async function({ page }){
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
    await page.waitForTimeout(3000)

    // Capture and log the toast message
    const toast = await page.locator("//div[@role='status']").textContent()
    console.log("The toast message is: " + toast)
    //await page.waitForTimeout(2000)

    // Verify URL to confirm navigation to Dashboard Admin
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin")
    //await page.waitForTimeout(2000)

    // Click on the Jobs from the side menu
    await page.locator("//div[@class='flex flex-col flex-grow bg-white border-r border-accent-200 rounded-r-2xl shadow-2xl']//a[@class='group flex items-center px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 text-gray-600 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2'][normalize-space()='Jobs']").first().click()
    //await page.waitForTimeout(2000)

    // Verify URL to confirm navigation to Jobs Management page
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/admin/jobs")
    //await page.waitForTimeout(2000)

    // Capture and log the page title
    const pageTitle = await page.locator("//h1[normalize-space()='Job Management']").textContent()
    console.log("The page title is: " + pageTitle)
    //await page.waitForTimeout(2000)

    // Click on the 'Add Job' button
    await page.locator("//button[normalize-space()='Add Job']").click()
    //await page.waitForTimeout(2000)

    // Fill in the job details
    const facilityTypeCombobox = page.getByPlaceholder("Search facilities...")
    await facilityTypeCombobox.click()
    await facilityTypeCombobox.fill("Advanced Care of St Joseph")
    await page.waitForTimeout(2000)
    await page.locator("//div[normalize-space()='Advanced Care of St Joseph']").first().click()
    await page.waitForTimeout(200)
    
    const certificationTypeCombobox = page.getByPlaceholder("Search certifications...")
    await certificationTypeCombobox.click()
    await certificationTypeCombobox.fill("Assembler")
    await page.waitForTimeout(1000)
    await page.locator('div:has-text("Assembler")').first().click()
    await page.waitForTimeout(2000)

    const specialtyTypeCombobox = page.getByPlaceholder("Search specialties...")
    await specialtyTypeCombobox.click()
    await specialtyTypeCombobox.fill("Hospital")
    await page.waitForTimeout(2000)
    await page.locator("//div[normalize-space()='Hospital']").first().click()
    await page.waitForTimeout(2000)

    await page.getByPlaceholder("e.g., 50000").fill("2025")
    await page.waitForTimeout(2000)

    const stateTypeCombobox = page.getByPlaceholder("Search states...")
    await stateTypeCombobox.click()
    await stateTypeCombobox.fill("New York")
    await page.waitForTimeout(2000)
    await page.locator("//div[normalize-space()='New York (NY)']").first().click()
    await page.waitForTimeout(200)

    const shiftTypeCombobox = page.locator("//select[@name='shift']")
    await shiftTypeCombobox.click()
    await page.waitForTimeout(2000)
    await shiftTypeCombobox.selectOption("Night")
    await page.waitForTimeout(2000)

    const shiftTimeTypeCombobox = page.locator("//select[@name='shiftTime']")
    await shiftTimeTypeCombobox.click()
    await page.waitForTimeout(2000)
    await shiftTimeTypeCombobox.selectOption("H10")
    await page.waitForTimeout(2000)

    await page.locator("//button[normalize-space()='Create Job']").click()
    await page.waitForTimeout(3000)

    // Capture and log the toast message
    const jobToast = await page.locator("//div[@role='status']").textContent()
    console.log("The toast message is: " + jobToast)
    await page.waitForTimeout(200)
})
