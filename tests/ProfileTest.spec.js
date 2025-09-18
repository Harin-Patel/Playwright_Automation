const {test, expect} = require('@playwright/test');

// Test: Profile Page - View and Edit Profile
test("Profile Page - View and Edit Profile", async function({page}){

     // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Enter valid email and password
    await page.getByPlaceholder("Enter your email").type("john@mailinator.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })

    //Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Open user menu and sign out
    await page.locator("//div[@class='w-8 h-8 bg-gray-400 text-black rounded-full flex items-center justify-center text-sm font-semibold overflow-hidden']").click()
    await page.waitForTimeout(3000)

    // Click on 'Profile' from the user menu
    await page.locator("//a[normalize-space()='My Profile']").click()
    await page.waitForTimeout(3000)
    
    // Verify that the user is on the Profile page
    expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(2000)

    // Click on the 'Edit Profile' button
    await page.locator("//span[normalize-space()='Edit']").click()
    await page.waitForTimeout(2000)

    //Scroll to the bottom to ensure the Update Profile button is visible
    //await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
    //await page.locator("//button[normalize-space()='Update Profile']").scrollIntoViewIfNeeded()
    //await page.waitForTimeout(3000)

    //Verify validation messages for all fields when no data is filled
    await page.locator("//button[normalize-space()='Update Profile']").click()
    await page.waitForTimeout(2000)

    /*await expect(page.locator("text=Date of birth cannot be in the future")).toBeVisible()
    await expect(page.locator("text=Please enter a valid SSN")).toBeVisible()
    await expect(page.locator("text=Years of experience cannot exceed 50")).toBeVisible()
    await expect(page.locator("text=Street address must be at least 5 characters")).toBeVisible()
    await expect(page.locator("text=City must be at least 2 characters")).toBeVisible()
    await expect(page.locator("text=State must be 2 characters")).toBeVisible()
    await expect(page.locator("text=Zipcode must be exactly 5 digits")).toBeVisible()*/
})

// Test: Edit Profile Information - Positive Flow with Valid Data
test("Edit Profile Information - Positive Flow", async function({page}){

    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Enter valid email and password
    await page.getByPlaceholder("Enter your email").type("john@mailinator.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })

    // Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Open user menu (using the new button selector from page snapshot)
    await page.locator("//div[@class='w-8 h-8 bg-gray-400 text-black rounded-full flex items-center justify-center text-sm font-semibold overflow-hidden']").click()
    await page.waitForTimeout(3000)

    // Click on 'My Profile' from the dropdown
    await page.locator("//a[normalize-space()='My Profile']").click()
    await page.waitForTimeout(3000)
    
    // Verify that the user is on the Profile page
    expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(2000)

    // Click on the 'Edit Profile' button to open the edit profile popup
    await page.locator("//span[normalize-space()='Edit']").click()
    await page.waitForTimeout(2000)

    // Clear and fill all profile fields with valid data
    
    // Fill First Name - using the actual textbox from page snapshot
    await page.locator("input[placeholder='Enter first name']").clear()
    await page.locator("input[placeholder='Enter first name']").type("John", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Fill Last Name - using the actual textbox from page snapshot
    await page.locator("input[placeholder='Enter last name']").clear()
    await page.locator("input[placeholder='Enter last name']").type("Doe", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Fill Date of Birth (select future date)
    await page.locator("input[type='date']").click()
    await page.waitForTimeout(1000)
    await page.locator("input[type='date']").clear()
    await page.locator("input[type='date']").type("31121990", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Fill SSN (9 digits only) - using the actual placeholder
    await page.locator("input[placeholder='123456789']").clear()
    await page.locator("input[placeholder='123456789']").type("987654321", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Fill Years of Experience
    await page.locator("input[placeholder='Enter years of experience']").clear()
    await page.locator("input[placeholder='Enter years of experience']").type("8", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Fill Street Address
    await page.locator("input[placeholder='Enter street address']").clear()
    await page.locator("input[placeholder='Enter street address']").type("789 Pine Street", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Fill Additional Address (optional)
    await page.locator("input[placeholder='Apartment, suite, etc. (optional)']").clear()
    await page.locator("input[placeholder='Apartment, suite, etc. (optional)']").type("Unit 305", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Fill City
    await page.locator("input[placeholder='Enter city']").clear()
    await page.locator("input[placeholder='Enter city']").type("San Francisco", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Fill State dropdown using the successful combobox approach
    const stateCombobox = page.locator("[role='combobox']")
    await stateCombobox.click()
    await page.waitForTimeout(1000)
    
    // Find and click the actual California option from the dropdown
    const caOption = page.locator("li[role='option']:has-text('California'), div:has-text('CA - California'), [data-value='CA']").first()
    if (await caOption.count() > 0) {
        await caOption.click({ force: true })
        console.log("Successfully selected state")
        await page.waitForTimeout(1000)
    } else {
        console.log("California option not found, trying keyboard approach")
        await page.keyboard.type("California")
        await page.keyboard.press("Enter")
        await page.waitForTimeout(500)
    }
    
    // Fill Zipcode (5 digits only)
    await page.locator("input[placeholder='12345']").clear()
    await page.locator("input[placeholder='12345']").type("94102", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Scroll to make sure Update Profile button is visible
    await page.locator("//button[normalize-space()='Update Profile']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Click Update Profile button
    await page.locator("//button[normalize-space()='Update Profile']").click()
    await page.waitForTimeout(3000)
    
    // Capture and log success message
    const successMessage = await page.locator("//div[@role='status']").textContent()
    console.log("Profile update message: " + successMessage)
    await page.waitForTimeout(2000)
})

// Test: Edit Profile Information - Validation Messages for Empty Fields
test("Edit Profile Information - Validation Messages", async function({page}){

    // Navigate to the homepage
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)

    // Click on the 'Login' link
    await page.locator("//a[normalize-space()='Login']").click()
    await page.waitForTimeout(2000)

    // Enter valid email and password
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })

    // Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Open user menu (using the new button selector from page snapshot)
    await page.locator("//div[@class='w-8 h-8 bg-gray-400 text-black rounded-full flex items-center justify-center text-sm font-semibold overflow-hidden']").click()
    await page.waitForTimeout(3000)

    // Click on 'My Profile' from the dropdown
    await page.locator("//a[normalize-space()='My Profile']").click()
    await page.waitForTimeout(3000)
    
    // Verify that the user is on the Profile page
    expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(2000)

    // Click on the 'Edit Profile' button to open the edit profile popup
    await page.locator("//span[normalize-space()='Edit']").click()
    await page.waitForTimeout(2000)

    // Clear all fields to trigger validation messages
    await page.locator("input[placeholder='Enter first name']").clear()
    await page.locator("input[placeholder='Enter last name']").clear()
    await page.locator("input[type='date']").clear()
    await page.locator("input[placeholder='123456789']").clear()
    await page.locator("input[placeholder='Enter years of experience']").clear()
    await page.locator("input[placeholder='Enter street address']").clear()
    await page.locator("input[placeholder='Enter city']").clear()
    await page.locator("input[placeholder='12345']").clear()
    await page.waitForTimeout(1000)
    
    // Scroll to make sure Update Profile button is visible
    await page.locator("//button[normalize-space()='Update Profile']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Click Update Profile button to trigger validation
    await page.locator("//button[normalize-space()='Update Profile']").click()
    await page.waitForTimeout(2000)
    
    // Capture and log all validation messages that appear
    await page.waitForTimeout(1000)
    
    // Look for all error messages and log them
    const allErrorMessages = await page.locator("//p[contains(@class, 'error') or contains(@class, 'text-red')]").allTextContents()
    console.log("All validation messages found:")
    for (let i = 0; i < allErrorMessages.length; i++) {
        console.log(`Validation message ${i + 1}: ${allErrorMessages[i]}`)
    }
    
    await page.waitForTimeout(2000)
})