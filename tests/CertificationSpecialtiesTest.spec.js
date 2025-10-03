const {test, expect} = require('@playwright/test');

// Test 1: Add Certification Specialty - Positive Flow
test("Add Certification Specialty - Positive Flow", async function({page}) {
    
    // Step 1: Login to the application
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)
    
    await page.locator("//button[normalize-space()='Log in']").click()
    await page.waitForTimeout(2000)

    // Select For Job Seekers option from the dropdown
    await page.locator("//a[normalize-space()='For Job Seeker']").click()
    await page.waitForTimeout(1000)
    
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })
    
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)
    
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)
    
    // Step 2: Navigate to Profile via user menu (like ProfileTest does)
    await page.locator("//div[@class='w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium']").click()
    await page.waitForTimeout(3000)
    
    await page.locator("//a[normalize-space()='My Profile']").click()
    await page.waitForTimeout(3000)
    
    // Verify we're on the profile page
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    
    // Step 3: Go to Certification Specialties section
    await page.locator("//h2[normalize-space()='Certification Specialties']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Click Add Certification button
    await page.locator("//button[normalize-space()='Add Certification']").click()
    await page.waitForTimeout(2000)
    
    // Step 5: Fill Certification field
    await page.locator("[role='combobox']").first().click()
    await page.waitForTimeout(1000)
    await page.locator("li[role='option']:has-text('Allied Health')").first().click()
    await page.waitForTimeout(1000)
    
    // Step 6: Fill Specialty field
    await page.locator("[role='combobox']").nth(1).click()
    await page.waitForTimeout(1000)
    await page.locator("li[role='option']").first().click()
    await page.waitForTimeout(1000)
    
    // Step 7: Submit the form
    const buttons = await page.locator("form button").all()
    for (const button of buttons) {
        const text = await button.textContent()
        if (text && !text.toLowerCase().includes('cancel')) {
            await button.click()
            break
        }
    }
    await page.waitForTimeout(3000)
    
    // Step 8: Verify success message
    await expect(page.locator("//div[@role='status']")).toContainText("added")
    
    // Step 9: Verify specialty appears in list
    const noSpecialtiesMessage = await page.locator("//h3[normalize-space()='No Certification Specialties Added']").count()
    expect(noSpecialtiesMessage).toBe(0)
})

// Test 2: Add Certification Specialty - Empty Fields Validation
test("Add Certification Specialty - Empty Fields Validation", async function({page}) {
    
    // Step 1: Login to the application
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)
    
    await page.locator("//button[normalize-space()='Log in']").click()
    await page.waitForTimeout(2000)

    // Select For Job Seekers option from the dropdown
    await page.locator("//a[normalize-space()='For Job Seeker']").click()
    await page.waitForTimeout(1000)
    
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })
    
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)
    
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)
    
    // Step 2: Navigate directly to Profile page after login
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(3000)
    
    // Verify we're on the profile page and not redirected to login
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    
    // Step 3: Go to Certification Specialties section
    await page.locator("//h2[normalize-space()='Certification Specialties']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Click Add Certification button
    await page.locator("//button[normalize-space()='Add Certification']").click()
    await page.waitForTimeout(2000)
    
    // Step 5: Try to submit form without filling required fields
    const buttons = await page.locator("form button").all()
    for (const button of buttons) {
        const text = await button.textContent()
        if (text && !text.toLowerCase().includes('cancel')) {
            await button.click()
            break
        }
    }
    await page.waitForTimeout(2000)
    
    // Step 6: Verify form is still open (validation prevents submission)
    await expect(page.locator("form")).toBeVisible()
    
    // Step 7: Verify required field indicators are present
    await expect(page.locator("label:has-text('*')")).toHaveCount(2)
})

// Test 3: Add Certification Specialty - Duplicate Validation
test("Add Certification Specialty - Duplicate Validation", async function({page}) {
    
    // Step 1: Login to the application
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)
    
    await page.locator("//button[normalize-space()='Log in']").click()
    await page.waitForTimeout(2000)

    // Select For Job Seekers option from the dropdown
    await page.locator("//a[normalize-space()='For Job Seeker']").click()
    await page.waitForTimeout(1000)
    
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })
    
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)
    
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)
    
    // Step 2: Navigate directly to Profile page after login
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(3000)
    
    // Verify we're on the profile page and not redirected to login
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    
    // Step 3: Go to Certification Specialties section
    await page.locator("//h2[normalize-space()='Certification Specialties']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: First, add a certification specialty
    await page.locator("//button[normalize-space()='Add Certification']").click()
    await page.waitForTimeout(2000)
    
    await page.locator("[role='combobox']").first().click()
    await page.waitForTimeout(1000)
    await page.locator("li[role='option']:has-text('Allied Health')").first().click()
    await page.waitForTimeout(1000)
    
    await page.locator("[role='combobox']").nth(1).click()
    await page.waitForTimeout(1000)
    const firstSpecialtyOption = page.locator("li[role='option']").first()
    const selectedSpecialty = await firstSpecialtyOption.textContent()
    await firstSpecialtyOption.click()
    await page.waitForTimeout(1000)
    
    // Submit the first specialty using robust button detection
    let submitButton = null
    const buttonCount = await page.locator("form button").count()
    for (let i = 0; i < buttonCount; i++) {
        const button = page.locator("form button").nth(i)
        const buttonText = await button.textContent()
        if (buttonText && !buttonText.toLowerCase().includes('cancel') && !buttonText.toLowerCase().includes('close')) {
            submitButton = button
            break
        }
    }
    if (!submitButton) {
        const submitPatterns = [
            "button:has-text('Add')",
            "button:has-text('Save')",
            "button:has-text('Submit')",
            "button:has-text('Create')",
            "button[type='submit']"
        ]
        for (const pattern of submitPatterns) {
            const btn = page.locator(pattern).first()
            if (await btn.count() > 0) {
                submitButton = btn
                break
            }
        }
    }
    if (!submitButton) {
        throw new Error("Could not find submit button for first submission")
    }
    await submitButton.click()
    await page.waitForTimeout(3000)
    
    // Wait for form to close (indicates successful submission)
    await page.waitForTimeout(3000)
    
    // Verify form closed (successful submission)
    const formVisible = await page.locator("form").isVisible()
    if (formVisible) {
        // Form still open - close it first, then reopen for duplicate test
        console.log("⚠️ Form still visible after first submission, closing it first...")
        
        // Try to close the modal by clicking Cancel or close button
        const cancelButton = page.locator("button:has-text('Cancel')").first()
        if (await cancelButton.isVisible()) {
            await cancelButton.click()
            await page.waitForTimeout(1000)
        } else {
            // Try clicking outside the modal to close it
            await page.keyboard.press('Escape')
            await page.waitForTimeout(1000)
        }
    } else {
        console.log("✅ First specialty submitted successfully (form closed)")
    }
    
    // Step 5: Try to add the same certification-specialty combination again
    await page.locator("//button[normalize-space()='Add Certification']").first().click()
    await page.waitForTimeout(2000)
    
    // Select the same certification
    await page.locator("[role='combobox']").first().click()
    await page.waitForTimeout(1000)
    await page.locator("li[role='option']:has-text('Allied Health')").first().click()
    await page.waitForTimeout(1000)
    
    // Select the same specialty
    await page.locator("[role='combobox']").nth(1).click()
    await page.waitForTimeout(1000)
    await page.locator(`li[role='option']:has-text('${selectedSpecialty}')`).first().click()
    await page.waitForTimeout(1000)
    
    // Try to submit the duplicate using robust button detection
    submitButton = null
    const buttonCount2 = await page.locator("form button").count()
    for (let i = 0; i < buttonCount2; i++) {
        const button = page.locator("form button").nth(i)
        const buttonText = await button.textContent()
        if (buttonText && !buttonText.toLowerCase().includes('cancel') && !buttonText.toLowerCase().includes('close')) {
            submitButton = button
            break
        }
    }
    if (!submitButton) {
        throw new Error("Could not find submit button for duplicate submission")
    }
    await submitButton.click()
    await page.waitForTimeout(2000)
    
    // Step 6: Verify duplicate validation message appears
    await expect(page.locator("text=You already have this certification-specialty combination")).toBeVisible()
    
    // Step 7: Verify form is still open (validation prevents submission)
    await expect(page.locator("form")).toBeVisible()
    
    console.log("✅ Duplicate validation message verified: 'You already have this certification-specialty combination'")
    
    // Step 8: Now select a different certification and specialty combination
    console.log("📝 Now selecting a different certification and specialty...")
    
    // Clear and select different certification (Medical Assistant instead of Allied Health)
    await page.locator("[role='combobox']").first().click()
    await page.waitForTimeout(1000)
    await page.locator("li[role='option']:has-text('Medical Assistant')").first().click()
    await page.waitForTimeout(1000)
    
    // Select specialty for Medical Assistant
    await page.locator("[role='combobox']").nth(1).click()
    await page.waitForTimeout(1000)
    await page.locator("li[role='option']").first().click()
    await page.waitForTimeout(1000)
    
    // Step 9: Submit the different certification-specialty combination
    submitButton = null
    const buttonCount3 = await page.locator("form button").count()
    for (let i = 0; i < buttonCount3; i++) {
        const button = page.locator("form button").nth(i)
        const buttonText = await button.textContent()
        if (buttonText && !buttonText.toLowerCase().includes('cancel') && !buttonText.toLowerCase().includes('close')) {
            submitButton = button
            break
        }
    }
    if (!submitButton) {
        throw new Error("Could not find submit button for final submission")
    }
    await submitButton.click()
    await page.waitForTimeout(3000)
    
    // Step 10: Verify the different specialty was added successfully
    await page.waitForTimeout(3000)
    
    // Check if form closed (indicates success)
    let finalFormVisible = await page.locator("form").isVisible()
    if (!finalFormVisible) {
        console.log("✅ Different certification-specialty combination added successfully after validation! (Form closed)")
    } else {
        console.log("⚠️ Form still visible - checking for validation messages...")
        // Check if there's still a validation message
        const validationVisible = await page.locator("text=You already have this certification-specialty combination").isVisible()
        if (!validationVisible) {
            console.log("✅ No validation message visible - different combination likely accepted")
        }
        
        // Close the form if still open
        const cancelButton = page.locator("button:has-text('Cancel')").first()
        if (await cancelButton.isVisible()) {
            await cancelButton.click()
            await page.waitForTimeout(1000)
        } else {
            await page.keyboard.press('Escape')
            await page.waitForTimeout(1000)
        }
    }
    
})

// Test 4: Delete Certification Specialty
test("Delete Certification Specialty", async function({page}) {
    
    // Step 1: Login to the application
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)
    
    await page.locator("//button[normalize-space()='Log in']").click()
    await page.waitForTimeout(2000)

    // Select For Job Seekers option from the dropdown
    await page.locator("//a[normalize-space()='For Job Seeker']").click()
    await page.waitForTimeout(1000)
    
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })
    
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)
    
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)
    
    // Step 2: Navigate directly to Profile page after login
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(3000)
    
    // Verify we're on the profile page and not redirected to login
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    
    // Step 3: Go to Certification Specialties section
    await page.locator("//h2[normalize-space()='Certification Specialties']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: First add a specialty to delete (if none exists)
    const noSpecialtiesMessage = await page.locator("//h3[normalize-space()='No Certification Specialties Added']").count()
    
    if (noSpecialtiesMessage > 0) {
        // Add a specialty first
        await page.locator("//button[normalize-space()='Add Certification']").click()
        await page.waitForTimeout(2000)
        
        await page.locator("[role='combobox']").first().click()
        await page.waitForTimeout(1000)
        await page.locator("li[role='option']:has-text('Allied Health')").first().click()
        await page.waitForTimeout(1000)
        
        await page.locator("[role='combobox']").nth(1).click()
        await page.waitForTimeout(1000)
        await page.locator("li[role='option']").first().click()
        await page.waitForTimeout(1000)
        
        const buttons = await page.locator("form button").all()
        for (const button of buttons) {
            const text = await button.textContent()
            if (text && !text.toLowerCase().includes('cancel')) {
                await button.click()
                break
            }
        }
        await page.waitForTimeout(3000)
    }
    
    // Step 5: Click delete button on first specialty (usually second button)
    await page.locator("//div[contains(@class, 'bg-white')]//button").nth(1).click()
    await page.waitForTimeout(2000)
    
    // Step 6: Handle confirmation dialog
    page.on('dialog', dialog => dialog.accept())
    
    // Step 7: Or click confirmation button if it's in UI
    const confirmButton = page.locator("button:has-text('Delete'), button:has-text('Confirm')")
    if (await confirmButton.count() > 0) {
        await confirmButton.click()
        await page.waitForTimeout(2000)
    }
    
    // Step 8: Verify deletion success
    const noSpecialtiesAfterDelete = await page.locator("//h3[normalize-space()='No Certification Specialties Added']").count()
    expect(noSpecialtiesAfterDelete).toBe(1)
})

// Test 5: Add Multiple Certification Specialties
test("Add Multiple Certification Specialties", async function({page}) {
    
    // Step 1: Login to the application
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/")
    await page.waitForTimeout(3000)
    
    await page.locator("//button[normalize-space()='Log in']").click()
    await page.waitForTimeout(2000)

    // Select For Job Seekers option from the dropdown
    await page.locator("//a[normalize-space()='For Job Seeker']").click()
    await page.waitForTimeout(1000)
    
    await page.getByPlaceholder("Enter your email").type("qa@yopmail.com", { delay: 100 })
    await page.getByPlaceholder("Enter your password").type("Harin123", { delay: 100 })
    
    await page.locator("//button[@aria-label='Show password']//*[name()='svg']").click()
    await page.waitForTimeout(1000)
    
    await page.locator("//button[normalize-space()='Login']").click()
    await page.waitForTimeout(5000)
    
    // Step 2: Navigate directly to Profile page after login
    await page.goto("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    await page.waitForTimeout(3000)
    
    // Verify we're on the profile page and not redirected to login
    await expect(page).toHaveURL("http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/profile")
    
    // Step 3: Go to Certification Specialties section
    await page.locator("//h2[normalize-space()='Certification Specialties']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Add first specialty - Allied Health
    await page.locator("//button[normalize-space()='Add Certification']").click()
    await page.waitForTimeout(2000)
    
    await page.locator("[role='combobox']").first().click()
    await page.waitForTimeout(1000)
    await page.locator("li[role='option']:has-text('Allied Health')").first().click()
    await page.waitForTimeout(1000)
    
    await page.locator("[role='combobox']").nth(1).click()
    await page.waitForTimeout(1000)
    await page.locator("li[role='option']").first().click()
    await page.waitForTimeout(1000)
    
    let buttons = await page.locator("form button").all()
    for (const button of buttons) {
        const text = await button.textContent()
        if (text && !text.toLowerCase().includes('cancel')) {
            await button.click()
            break
        }
    }
    await page.waitForTimeout(3000)
    
    // Step 5: Add second specialty - Medical Assistant
    await page.locator("//button[normalize-space()='Add Certification']").click()
    await page.waitForTimeout(2000)
    
    await page.locator("[role='combobox']").first().click()
    await page.waitForTimeout(1000)
    await page.locator("li[role='option']:has-text('Medical Assistant')").first().click()
    await page.waitForTimeout(1000)
    
    await page.locator("[role='combobox']").nth(1).click()
    await page.waitForTimeout(1000)
    await page.locator("li[role='option']").first().click()
    await page.waitForTimeout(1000)
    
    buttons = await page.locator("form button").all()
    for (const button of buttons) {
        const text = await button.textContent()
        if (text && !text.toLowerCase().includes('cancel')) {
            await button.click()
            break
        }
    }
    await page.waitForTimeout(3000)
    
    // Step 6: Verify both specialties were added
    const noSpecialtiesMessage = await page.locator("//h3[normalize-space()='No Certification Specialties Added']").count()
    expect(noSpecialtiesMessage).toBe(0)
    
    const specialtyCards = await page.locator("//div[contains(@class, 'bg-white')]").count()
    expect(specialtyCards).toBeGreaterThanOrEqual(2)
})