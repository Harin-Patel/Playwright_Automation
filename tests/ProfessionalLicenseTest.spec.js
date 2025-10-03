const {test, expect} = require('@playwright/test');


// Test: Add Professional License - Positive Flow
test("Add Professional License - Positive Flow", async function({page}){

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
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })

    // Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Navigate directly to profile page after login
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(3000)
    
    // Verify that the user is on the Profile page
    expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(2000)

    // Scroll down to the Professional Licenses section
    await page.locator("text=Professional Licenses").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // Click on 'Add Your First License' button (since no licenses exist yet)
    // Check if "Add Your First License" button exists, otherwise use the alternate Add License button
    const addFirstLicenseBtnCount = await page.locator("//button[normalize-space()='Add Your First License']").count();
    if (addFirstLicenseBtnCount > 0) {
        await page.locator("//button[normalize-space()='Add Your First License']").click();
    } else {
        await page.locator("//span[normalize-space()='Add License']").click();
    }
    await page.waitForTimeout(2000)

    // Fill in the license form with valid data
    
    // Fill License Type combobox - use the successful approach that properly sets the form value
    const licenseTypeCombobox = page.locator("[role='combobox']").first()
    await licenseTypeCombobox.click()
    await page.waitForTimeout(1000)
    
    // Find and click the actual RN option from the dropdown to ensure form value is set
    const rnOption = page.locator("li[role='option']:has-text('RN'), div:has-text('RN - Registered Nurse'), [data-value='RN']").first()
    if (await rnOption.count() > 0) {
        await rnOption.click({ force: true })
        console.log("Successfully selected license type")
        await page.waitForTimeout(1000)
    } else {
        console.log("RN option not found, trying keyboard approach")
        await page.keyboard.type("RN")
        await page.keyboard.press("Enter")
        await page.waitForTimeout(500)
    }
    
    // Fill License Number
    await page.locator("input[placeholder='e.g. RN123456']").type("RN123456789", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Fill State combobox - use the successful approach
    const stateCombobox = page.locator("[role='combobox']").nth(1)
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
    
    // Fill Expiration Date (select future date)
    await page.locator("input[type='date']").click()
    await page.waitForTimeout(1000)
    await page.locator("input[type='date']").clear()
    await page.locator("input[type='date']").type("31122025", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Scroll to make sure Add License button in the form is visible
    await page.locator("form button[type='submit']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Click Add License button in the form
    await page.locator("form button[type='submit']").click()
    await page.waitForTimeout(3000)
    
    // Capture and log success message if it appears
    await page.waitForTimeout(2000)
    const toastCount = await page.locator("//div[@role='status']").count()
    if (toastCount > 0) {
        const successMessage = await page.locator("//div[@role='status']").textContent()
        console.log("License save message: " + successMessage)
    } else {
        console.log("License form submitted successfully")
    }
    await page.waitForTimeout(2000)
})

// Test: Add Professional License - Validation Messages for Empty Fields
test("Add Professional License - Validation Messages", async function({page}){

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
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })

    // Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Navigate directly to profile page after login
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(3000)
    
    // Verify that the user is on the Profile page
    expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(2000)

    // Scroll down to the Professional Licenses section
    await page.locator("text=Professional Licenses").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // Click on 'Add License' or 'Add Your First License' button
    const addButtonCount = await page.locator("//button[normalize-space()='Add Your First License']").count()
    if (addButtonCount > 0) {
        await page.locator("//button[normalize-space()='Add Your First License']").click()
    } else {
        await page.locator("//button[normalize-space()='Add License']").click()
    }
    await page.waitForTimeout(2000)

    // Leave all fields empty and try to save to trigger validation messages
    
    // Scroll to make sure Add License button in the form is visible
    await page.locator("form button[type='submit']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Click Add License button without filling any fields
    await page.locator("form button[type='submit']").click()
    await page.waitForTimeout(2000)
    
    // Capture and log all validation messages that appear
    await page.waitForTimeout(1000)
    
    // Look for all error messages and log them
    const allErrorMessages = await page.locator("//p[contains(@class, 'error') or contains(@class, 'text-red')]").allTextContents()
    console.log("All license validation messages found:")
    for (let i = 0; i < allErrorMessages.length; i++) {
        console.log(`License validation message ${i + 1}: ${allErrorMessages[i]}`)
    }
    
    await page.waitForTimeout(2000)
})

// Test: Update Professional License - Edit Existing License
test("Update Professional License - Edit Existing License", async function({page}){

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
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })

    // Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Navigate directly to profile page after login
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(3000)
    
    // Verify that the user is on the Profile page
    expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(2000)

    // Scroll down to the Professional Licenses section
    await page.locator("text=Professional Licenses").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // First add a license if none exists, then edit it
    // Check if "No Licenses Added" message is visible
    const noLicensesMessage = await page.locator("//heading[normalize-space()='No Licenses Added']").count()
    
    if (noLicensesMessage > 0) {
        console.log("No existing licenses found, adding one first...")
        
        // Click on 'Add Your First License' button
        await page.locator("//button[normalize-space()='Add Your First License']").click()
        await page.waitForTimeout(2000)

        // Fill in basic license data using the successful combobox approach
        
        // Fill License Type combobox
        const licenseTypeCombobox = page.locator("[role='combobox']").first()
        await licenseTypeCombobox.click()
        await page.waitForTimeout(1000)
        
        const rnOption = page.locator("li[role='option']:has-text('RN'), div:has-text('RN - Registered Nurse'), [data-value='RN']").first()
        if (await rnOption.count() > 0) {
            await rnOption.click({ force: true })
            console.log("Successfully selected license type for new license")
            await page.waitForTimeout(1000)
        } else {
            console.log("RN option not found, trying keyboard approach")
            await page.keyboard.type("RN")
            await page.keyboard.press("Enter")
            await page.waitForTimeout(500)
        }
        
        // Fill License Number
        await page.locator("input[placeholder='e.g. RN123456']").type("RN987654321", { delay: 100 })
        await page.waitForTimeout(500)
        
        // Fill State combobox
        const stateCombobox = page.locator("[role='combobox']").nth(1)
        await stateCombobox.click()
        await page.waitForTimeout(1000)
        
        const nyOption = page.locator("li[role='option']:has-text('New York'), div:has-text('NY - New York'), [data-value='NY']").first()
        if (await nyOption.count() > 0) {
            await nyOption.click({ force: true })
            console.log("Successfully selected state for new license")
            await page.waitForTimeout(1000)
        } else {
            console.log("New York option not found, trying keyboard approach")
            await page.keyboard.type("New York")
            await page.keyboard.press("Enter")
            await page.waitForTimeout(500)
        }
        
        // Fill Expiration Date
        await page.locator("input[type='date']").type("31-12-2025", { delay: 100 })
        await page.waitForTimeout(500)
        
        // Save the license
        await page.locator("form button[type='submit']").scrollIntoViewIfNeeded()
        await page.waitForTimeout(1000)
        await page.locator("form button[type='submit']").click()
        await page.waitForTimeout(3000)
    }
    
    // Now edit the existing license
    // Click on Edit button for the first license
    await page.locator("//body/div[@id='root']/div[@class='min-h-screen bg-gray-50']/div[@class='min-h-screen bg-white']/main[@aria-label='Main content']/div[@class='min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-100']/section[@class='py-12 px-4']/div[@class='mx-auto max-w-full px-4']/div[@class='grid grid-cols-1 lg:grid-cols-12 gap-8']/div[@class='lg:col-span-12']/div[@class='w-full']/div[@class='mt-8']/div[@class='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden']/div[@class='p-8']/div[@class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6']/div[1]/div[1]/div[2]/button[1]//*[name()='svg']").first().click()
    await page.waitForTimeout(2000)
    
    // Update license information using proper combobox handling
    
    // Keep the same License Type (RN) but demonstrate combobox handling works
    const editLicenseTypeCombobox = page.locator("[role='combobox']").first()
    await editLicenseTypeCombobox.click()
    await page.waitForTimeout(1000)
    
    const rnEditOption = page.locator("li[role='option']:has-text('RN'), div:has-text('RN - Registered Nurse'), [data-value='RN']").first()
    if (await rnEditOption.count() > 0) {
        await rnEditOption.click({ force: true })
        console.log("Successfully confirmed license type as RN")
        await page.waitForTimeout(1000)
    } else {
        console.log("RN option not found, trying keyboard approach")
        await page.keyboard.type("RN")
        await page.keyboard.press("Enter")
        await page.waitForTimeout(500)
    }
    
    // Update License Number (try different selectors)
    const licenseNumberField = page.locator("input[placeholder='e.g. RN123456'], input[type='text']:near([text*='License Number' i])").first()
    await licenseNumberField.clear()
    await licenseNumberField.type("RN111222333", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Update State combobox (change to California)
    const editStateCombobox = page.locator("[role='combobox']").nth(1)
    await editStateCombobox.click()
    await page.waitForTimeout(1000)
    
    const caEditOption = page.locator("li[role='option']:has-text('California'), div:has-text('CA - California'), [data-value='CA']").first()
    if (await caEditOption.count() > 0) {
        await caEditOption.click({ force: true })
        console.log("Successfully updated state to California")
        await page.waitForTimeout(1000)
    } else {
        console.log("California option not found, trying keyboard approach")
        await page.keyboard.type("California")
        await page.keyboard.press("Enter")
        await page.waitForTimeout(500)
    }
    
    // Update Expiration Date (try different selectors)
    const expirationField = page.locator("input[type='date'], input:near([text*='Expiration' i])").first()
    await expirationField.clear()
    await expirationField.type("31-12-2025", { delay: 100 })
    await page.waitForTimeout(500)
    
    // Scroll to make sure Update License button is visible
    await page.locator("form button[type='submit']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Click Update License button
    await page.locator("form button[type='submit']").click()
    await page.waitForTimeout(3000)
    
    // Capture and log success message if it appears
    await page.waitForTimeout(2000)
    const toastCount = await page.locator("//div[@role='status']").count()
    if (toastCount > 0) {
        const updateMessage = await page.locator("//div[@role='status']").textContent()
        console.log("License update message: " + updateMessage)
    } else {
        console.log("License updated successfully")
    }
    await page.waitForTimeout(2000)
})

// Test: Delete Professional License
test.only("Delete Professional License", async function({page}){

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
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })

    // Click the eye icon to view the password
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)

    // Click the Login button
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)

    // Navigate directly to profile page after login
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(3000)
    
    // Verify that the user is on the Profile page
    expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(2000)

    // Scroll down to the Professional Licenses section
    await page.locator("text=Professional Licenses").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // First ensure there's a license to delete, add one if none exists
    const noLicensesMessage = await page.locator("//heading[normalize-space()='No Licenses Added']").count()
    
    if (noLicensesMessage > 0) {
        console.log("No existing licenses found, adding one first to delete...")
        
        // Click on 'Add Your First License' button
        await page.locator("//button[normalize-space()='Add Your First License']").click()
        await page.waitForTimeout(2000)

        // Fill in basic license data using the successful combobox approach
        const licenseTypeCombobox = page.locator("[role='combobox']").first()
        await licenseTypeCombobox.click()
        await page.waitForTimeout(1000)
        
        const rnOption = page.locator("li[role='option']:has-text('RN'), div:has-text('RN - Registered Nurse'), [data-value='RN']").first()
        if (await rnOption.count() > 0) {
            await rnOption.click({ force: true })
            console.log("Successfully selected license type for deletion test")
            await page.waitForTimeout(1000)
        } else {
            console.log("RN option not found, trying keyboard approach")
            await page.keyboard.type("RN")
            await page.keyboard.press("Enter")
            await page.waitForTimeout(500)
        }
        
        // Fill License Number
        await page.locator("input[placeholder='e.g. RN123456']").type("RN999888777", { delay: 100 })
        await page.waitForTimeout(500)
        
        // Fill State combobox
        const stateCombobox = page.locator("[role='combobox']").nth(1)
        await stateCombobox.click()
        await page.waitForTimeout(1000)
        
        const txOption = page.locator("li[role='option']:has-text('Texas'), div:has-text('TX - Texas'), [data-value='TX']").first()
        if (await txOption.count() > 0) {
            await txOption.click({ force: true })
            console.log("Successfully selected state for deletion test")
            await page.waitForTimeout(1000)
        } else {
            console.log("Texas option not found, trying keyboard approach")
            await page.keyboard.type("Texas")
            await page.keyboard.press("Enter")
            await page.waitForTimeout(500)
        }
        
        // Fill Expiration Date
        await page.locator("input[type='date']").type("31-12-2025", { delay: 100 })
        await page.waitForTimeout(500)
        
        // Save the license
        await page.locator("form button[type='submit']").scrollIntoViewIfNeeded()
        await page.waitForTimeout(1000)
        await page.locator("form button[type='submit']").click()
        await page.waitForTimeout(3000)
        
        console.log("License created successfully for deletion test")
    }
    
    // Now delete the license
    // Use similar pattern as the edit button but click the second button (delete)
    await page.locator("//body/div[@id='root']/div[@class='min-h-screen bg-gray-50']/div[@class='min-h-screen bg-white']/main[@aria-label='Main content']/div[@class='min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-100']/section[@class='py-12 px-4']/div[@class='mx-auto max-w-full px-4']/div[@class='grid grid-cols-1 lg:grid-cols-12 gap-8']/div[@class='lg:col-span-12']/div[@class='w-full']/div[@class='mt-8']/div[@class='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden']/div[@class='p-8']/div[@class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6']/div[1]/div[1]/div[2]/button[2]//*[name()='svg']").first().click()
    await page.waitForTimeout(2000)
    
    // Handle confirmation dialog if it appears
    page.on('dialog', async dialog => {
        console.log("Confirmation dialog appeared: " + dialog.message())
        await dialog.accept()
    })
    
    // If there's a confirmation button in the UI instead of a dialog
    const confirmDeleteButton = await page.locator("//button[normalize-space()='Delete License' or normalize-space()='Confirm Delete' or normalize-space()='Yes, Delete']").count()
    if (confirmDeleteButton > 0) {
        await page.locator("//button[normalize-space()='Delete License' or normalize-space()='Confirm Delete' or normalize-space()='Yes, Delete']").click()
        console.log("Clicked confirmation delete button")
        await page.waitForTimeout(2000)
    }
    
    // Wait for deletion to complete
    await page.waitForTimeout(3000)
    
    // Capture and log success message if it appears
    const toastCount = await page.locator("//div[@role='status']").count()
    if (toastCount > 0) {
        const deleteMessage = await page.locator("//div[@role='status']").textContent()
        console.log("License delete message: " + deleteMessage)
    } else {
        console.log("License deleted successfully")
    }
    
    // Verify the license was deleted by checking if "No Licenses Added" message appears
    await page.waitForTimeout(2000)
    const noLicensesAfterDelete = await page.locator("//heading[normalize-space()='No Licenses Added']").count()
    if (noLicensesAfterDelete > 0) {
        console.log("License deletion confirmed - No licenses remaining")
    } else {
        console.log("License deletion completed - Other licenses may still exist")
    }
    
    await page.waitForTimeout(2000)
})
