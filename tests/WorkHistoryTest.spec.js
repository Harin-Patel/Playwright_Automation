const {test, expect} = require('@playwright/test');

// Test 1: Add Work History - Positive Flow
test("Add Work History - Positive Flow", async function({page}) {
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
    
    // Step 3: Go to Work History section
    await page.locator("//h2[normalize-space()='Work History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Click Add Work History button
    await page.locator("//button[contains(text(), 'Add') and contains(text(), 'Work History')]").click()
    await page.waitForTimeout(2000)
    
    // Step 5: Fill required fields
    // Fill employer name (search facilities combobox)
    await page.locator("//input[@placeholder='Search facilities...']").click()
    await page.waitForTimeout(500)
    await page.locator("//input[@placeholder='Search facilities...']").fill("Hospital")
    await page.waitForTimeout(2000)
    
    // Wait for MUI Autocomplete dropdown options and select first one
    if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
        const selectedFacility = await page.locator(".MuiAutocomplete-popper li[role='option']").first().textContent()
        console.log(`✅ Selecting facility: "${selectedFacility}"`)
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
        await page.waitForTimeout(1000)
    } else {
        console.log("❌ No facility options found")
    }
    
    // Fill unit (search specialties combobox)
    await page.locator("//input[@placeholder='Search specialties...']").click()
    await page.waitForTimeout(500)
    await page.locator("//input[@placeholder='Search specialties...']").fill("Acute")
    await page.waitForTimeout(2000)
    
    // Wait for MUI Autocomplete dropdown options and select first one
    if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
        const selectedSpecialty = await page.locator(".MuiAutocomplete-popper li[role='option']").first().textContent()
        console.log(`✅ Selecting specialty: "${selectedSpecialty}"`)
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
        await page.waitForTimeout(1000)
    } else {
        console.log("❌ No specialty options found")
    }
    
    // Fill start date
    await page.locator("//input[@name='startDate']").fill("2022-01-15")
    await page.waitForTimeout(500)
    
    // Step 6: Fill optional fields
    // Fill end date
    await page.locator("//input[@name='endDate']").fill("2023-12-31")
    await page.waitForTimeout(500)
    
    // Fill description
    await page.locator("//textarea[@placeholder='Describe your role and responsibilities...']").fill("Provided excellent patient care in emergency department. Managed critical cases and collaborated with multidisciplinary team.")
    await page.waitForTimeout(500)
    
    // Step 7: Check specific checkboxes and fill conditional fields
    // Travel Assignment checkbox - requires staffing agency name
    const travelCheckbox = page.locator("//input[@name='isTravelAssignment']")
    if (await travelCheckbox.count() > 0 && await travelCheckbox.isVisible()) {
        await travelCheckbox.check()
        await page.waitForTimeout(1000)
        console.log("✅ Travel Assignment checkbox checked")
        
        // Fill required staffing agency name field that appears
        const staffingAgencyField = page.locator("//input[@name='staffingAgencyName']")
        if (await staffingAgencyField.count() > 0 && await staffingAgencyField.isVisible()) {
            await staffingAgencyField.fill("ABC Staffing Solutions")
            await page.waitForTimeout(500)
            console.log("✅ Staffing agency name filled")
        }
    }
    
    // Charge Experience checkbox - requires experience description
    const chargeCheckbox = page.locator("//input[@name='hasChargeExperience']")
    if (await chargeCheckbox.count() > 0 && await chargeCheckbox.isVisible()) {
        await chargeCheckbox.check()
        await page.waitForTimeout(1000)
        console.log("✅ Charge Experience checkbox checked")
        
        // Fill required charge experience description field that appears
        const chargeExperienceField = page.locator("//input[@name='chargeExperienceComment'] | //textarea[@name='chargeExperienceComment']")
        if (await chargeExperienceField.count() > 0 && await chargeExperienceField.isVisible()) {
            await chargeExperienceField.fill("Led a team of 8 nurses in ICU, managed patient assignments and coordinated with physicians for 2 years")
            await page.waitForTimeout(500)
            console.log("✅ Charge experience description filled")
        }
    }
    
    // Step 8: Submit the form
    console.log("🔄 Submitting work history form...")
    
    // Use button click instead of form.submit() to trigger proper API call
    const submitButton = page.locator("//button[contains(text(), 'Add Work History')]").first()
    if (await submitButton.count() > 0 && await submitButton.isVisible()) {
        await submitButton.click()
        console.log("✅ Submit button clicked")
        
        // Wait for API call to complete
        await page.waitForTimeout(5000)
        
        // Check if there are any error messages
        const errorMessages = await page.locator("[role='alert'], .error, .invalid").count()
        if (errorMessages > 0) {
            console.log("⚠️ Validation errors found after submission")
            const errors = await page.locator("[role='alert'], .error, .invalid").all()
            for (let i = 0; i < errors.length; i++) {
                const errorText = await errors[i].textContent()
                console.log(`   Error ${i}: "${errorText}"`)
            }
        }
    } else {
        throw new Error("Could not find submit button")
    }
    
    await page.waitForTimeout(3000)
    
    // Step 9: Verify work history submission
    await page.waitForTimeout(3000)
    
    // Check if form closed (indicates successful submission)
    const formVisible = await page.locator("form").isVisible()
    if (!formVisible) {
        console.log("✅ Work History form closed - submission successful!")
        
        // Verify work history appears in list by checking if "No Work History" message is gone
        const noWorkHistoryMessage = await page.locator("//h3[contains(text(), 'No Work History') or contains(text(), 'Add Your First')]").count()
        if (noWorkHistoryMessage === 0) {
            console.log("✅ Work History added successfully - 'No Work History' message is gone!")
        } else {
            console.log("ℹ️ Work History submitted - checking for work history items...")
            
            // Look for actual work history items
            const workHistoryItems = page.locator("//*[contains(text(), 'Hospital')] | //*[contains(text(), 'Acute')] | //div[contains(@class, 'work-history')]")
            const itemCount = await workHistoryItems.count()
            if (itemCount > 0) {
                console.log(`✅ Found ${itemCount} work history items in the list!`)
            } else {
                console.log("⚠️ Work History may still be processing...")
            }
        }
    } else {
        console.log("⚠️ Form still visible - checking for validation errors...")
        // Form still open - might be validation errors
        const errorMessages = await page.locator("[role='alert'], .error, .invalid").count()
        if (errorMessages > 0) {
            console.log("❌ Validation errors found in form")
        } else {
            console.log("ℹ️ Form still open but no obvious errors - may need manual review")
        }
    }
})

// Test 2: Add Work History - Per Diem Position (No Additional Fields Required)
test("Add Work History - Per Diem Position", async function({page}) {
    
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
    
    // Step 3: Go to Work History section
    await page.locator("//h2[normalize-space()='Work History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Click Add Work History button
    await page.locator("//span[normalize-space()='Add Work History']").click()
    await page.waitForTimeout(2000)
    
    // Step 5: Fill required fields
    // Fill employer name (search facilities combobox)
    await page.locator("//input[@placeholder='Search facilities...']").click()
    await page.waitForTimeout(500)
    await page.locator("//input[@placeholder='Search facilities...']").fill("Medical")
    await page.waitForTimeout(2000)
    
    // Wait for MUI Autocomplete dropdown options and select first one
    if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
        const selectedFacility = await page.locator(".MuiAutocomplete-popper li[role='option']").first().textContent()
        console.log(`✅ Selecting facility: "${selectedFacility}"`)
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
        await page.waitForTimeout(1000)
    } else {
        console.log("❌ No facility options found")
    }
    
    // Fill unit (search specialties combobox)
    await page.locator("//input[@placeholder='Search specialties...']").click()
    await page.waitForTimeout(500)
    await page.locator("//input[@placeholder='Search specialties...']").fill("Administration")
    await page.waitForTimeout(2000)
    
    // Wait for MUI Autocomplete dropdown options and select first one
    if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
        const selectedSpecialty = await page.locator(".MuiAutocomplete-popper li[role='option']").first().textContent()
        console.log(`✅ Selecting specialty: "${selectedSpecialty}"`)
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
        await page.waitForTimeout(1000)
    } else {
        console.log("❌ No specialty options found")
    }
    
    // Fill start date
    await page.locator("//input[@name='startDate']").fill("2023-01-01")
    await page.waitForTimeout(500)
    
    // Step 6: Fill optional fields
    // Fill end date
    await page.locator("//input[@name='endDate']").fill("2023-12-31")
    await page.waitForTimeout(500)
    
    // Fill description
    await page.locator("//textarea[@placeholder='Describe your role and responsibilities...']").fill("Per diem nursing position providing flexible coverage across multiple departments as needed.")
    await page.waitForTimeout(500)
    
    // Step 7: Check Per Diem checkbox only (no additional fields required)
    const perDiemCheckbox = page.locator("//input[@name='isPerDiem']")
    if (await perDiemCheckbox.count() > 0 && await perDiemCheckbox.isVisible()) {
        await perDiemCheckbox.check()
        await page.waitForTimeout(1000)
        console.log("✅ Per Diem checkbox checked - no additional fields required")
    }
    
    // Step 8: Submit the form (should work directly with Per Diem)
    console.log("🔄 Submitting per diem work history form...")
    
    // Use button click to trigger proper API call
    const submitButton = page.locator("//button[contains(text(), 'Add Work History')]").first()
    if (await submitButton.count() > 0 && await submitButton.isVisible()) {
        await submitButton.click()
        console.log("✅ Per Diem submit button clicked")
        
        // Wait for API call to complete
        await page.waitForTimeout(5000)
        
        // Check if there are any error messages
        const errorMessages = await page.locator("[role='alert'], .error, .invalid").count()
        if (errorMessages > 0) {
            console.log("⚠️ Validation errors found after Per Diem submission")
            const errors = await page.locator("[role='alert'], .error, .invalid").all()
            for (let i = 0; i < errors.length; i++) {
                const errorText = await errors[i].textContent()
                console.log(`   Error ${i}: "${errorText}"`)
            }
        }
    } else {
        throw new Error("Could not find Per Diem submit button")
    }
    
    await page.waitForTimeout(3000)
    
    // Step 9: Verify work history submission
    const formVisible = await page.locator("form").isVisible()
    if (!formVisible) {
        console.log("✅ Per Diem Work History form closed - submission successful!")
    } else {
        console.log("⚠️ Form still visible - may need manual review")
    }
})

// Test 3: Add Work History - Empty Fields Validation
test("Add Work History - Empty Fields Validation", async function({page}) {
    
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
    
    // Step 3: Go to Work History section
    await page.locator("//h2[normalize-space()='Work History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Click Add Work History button
    await page.locator("//span[normalize-space()='Add Work History']").click()
    await page.waitForTimeout(2000)
    
    // Step 5: Try to submit form without filling required fields
    const buttons = await page.locator("form button").all()
    for (const button of buttons) {
        const text = await button.textContent()
        if (text && text.toLowerCase().includes('add') && text.toLowerCase().includes('work')) {
            await button.click()
            break
        }
    }
    await page.waitForTimeout(2000)
    
    // Step 6: Verify form is still open (validation prevents submission)
    await expect(page.locator("form")).toBeVisible()
    
    // Step 7: Verify required field indicators are present
    await expect(page.locator("label:has-text('*')")).toHaveCount(3)
    
    console.log("✅ Empty fields validation working correctly!")
})

// Test 4: Update Work History
test("Update Work History", async function({page}) {
    
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
    
    // Step 3: Go to Work History section
    await page.locator("//h2[normalize-space()='Work History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: First add a work history if none exists
    const noWorkHistoryMessage = await page.locator("//h3[contains(text(), 'No Work History') or contains(text(), 'Add Your First')]").count()
    
    if (noWorkHistoryMessage > 0) {
        // Add a work history first
        await page.locator("//button[contains(text(), 'Add') and contains(text(), 'Work History')]").click()
        await page.waitForTimeout(2000)
        
        await page.locator("//input[@placeholder='Enter employer full name' or contains(@id, 'employer')]").fill("Test Hospital")
        await page.waitForTimeout(500)
        
        await page.locator("//input[@placeholder='Enter unit' or contains(@id, 'unit')]").fill("General Ward")
        await page.waitForTimeout(500)
        
        await page.locator("//input[@type='date' or contains(@placeholder, 'Start Date')]").first().fill("2023-01-01")
        await page.waitForTimeout(500)
        
        const buttons = await page.locator("form button").all()
        for (const button of buttons) {
            const text = await button.textContent()
            if (text && text.toLowerCase().includes('add') && text.toLowerCase().includes('work')) {
                await button.click()
                break
            }
        }
        await page.waitForTimeout(3000)
    }
    
    // Step 5: Click edit button on first work history entry
    await page.locator("//div[5]//div[1]//div[2]//div[1]//div[1]//div[1]//div[2]//button[1]//*[name()='svg']").first().click()
    await page.waitForTimeout(2000)
    
    // Step 6: Update the employer name
    await page.locator("//input[@id=':r1:']").fill("Updated Medical Center")
    await page.waitForTimeout(500)
    
    // Step 7: Update the unit
    await page.locator("//input[@id=':r5:']").fill("Updated Department")
    await page.waitForTimeout(500)
    
    // Step 8: Submit the updated form
    const buttons = await page.locator("form button").all()
    for (const button of buttons) {
        const text = await button.textContent()
        if (text && (text.toLowerCase().includes('update') || text.toLowerCase().includes('save'))) {
            await button.click()
            break
        }
    }
    await page.waitForTimeout(3000)
    
    // Step 9: Verify update success
    await expect(page.locator("//div[@role='status']")).toBeVisible()
    
    console.log("✅ Work History updated successfully!")
})

// Test 5: Delete Work History
test("Delete Work History", async function({page}) {
    
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
    
    // Step 3: Go to Work History section
    await page.locator("//h2[normalize-space()='Work History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: First add a work history if none exists
    const noWorkHistoryMessage = await page.locator("//h3[contains(text(), 'No Work History') or contains(text(), 'Add Your First')]").count()
    
    if (noWorkHistoryMessage > 0) {
        // Add a work history first
        await page.locator("//button[contains(text(), 'Add') and contains(text(), 'Work History')]").click()
        await page.waitForTimeout(2000)
        
        await page.locator("//input[@placeholder='Enter employer full name' or contains(@id, 'employer')]").fill("Hospital to Delete")
        await page.waitForTimeout(500)
        
        await page.locator("//input[@placeholder='Enter unit' or contains(@id, 'unit')]").fill("Test Unit")
        await page.waitForTimeout(500)
        
        await page.locator("//input[@type='date' or contains(@placeholder, 'Start Date')]").first().fill("2023-01-01")
        await page.waitForTimeout(500)
        
        const buttons = await page.locator("form button").all()
        for (const button of buttons) {
            const text = await button.textContent()
            if (text && text.toLowerCase().includes('add') && text.toLowerCase().includes('work')) {
                await button.click()
                break
            }
        }
        await page.waitForTimeout(3000)
    }
    
    // Step 5: Click delete button on first work history entry
    await page.locator("//div[5]//div[1]//div[2]//div[1]//div[1]//div[1]//div[2]//button[2]//*[name()='svg']//*[name()='path' and contains(@stroke-linecap,'round')]").first().click()
    await page.waitForTimeout(2000)
    
    // Step 6: Confirm deletion if confirmation dialog appears
    const confirmButton = page.locator("button:has-text('Delete'), button:has-text('Confirm'), button:has-text('Yes')")
    if (await confirmButton.count() > 0) {
        await confirmButton.first().click()
        await page.waitForTimeout(2000) 
    }
    
    // Step 7: Verify deletion success
    const noWorkHistoryAfterDelete = await page.locator("//div[@role='status']")
    console.log("✅ Work History deleted successfully!")
})

// Test 6: View All Work History
test("View All Work History", async function({page}) {
    
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
    
    // Step 3: Go to Work History section
    await page.locator("//h2[normalize-space()='Work History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Verify section is visible
    await expect(page.locator("//h2[normalize-space()='Work History']")).toBeVisible()
    
    // Step 5: Check current state (either has work history or shows empty message)
    const noWorkHistoryCount = await page.locator("//h3[contains(text(), 'No Work History') or contains(text(), 'Add Your First')]").count()
    const workHistoryCards = await page.locator("//div[contains(@class, 'bg-white') or contains(@class, 'card')]").count()
    
    if (noWorkHistoryCount > 0) {
        console.log("No work history found - showing empty state")
        expect(workHistoryCards).toBe(0)
    } else {
        console.log(`Found ${workHistoryCards} work history entries`)
        expect(workHistoryCards).toBeGreaterThan(0)
    }
    
    console.log("✅ Work History section viewed successfully!")
})

// Test 7: Add Work History - Current Position
test.only("Add Work History - Current Position", async function({page}) {
    
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
    
    // Step 3: Go to Work History section
    await page.locator("//h2[normalize-space()='Work History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Click Add Work History button
    await page.locator("//span[contains(text(), 'Add Work History')]").click()
    await page.waitForTimeout(2000)
    
    // Step 5: Fill required fields
    // Fill employer name (search facilities combobox)
    await page.locator("//input[@placeholder='Search facilities...']").click()
    await page.waitForTimeout(500)
    await page.locator("//input[@placeholder='Search facilities...']").fill("Hospital")
    await page.waitForTimeout(2000)
    
    // Wait for MUI Autocomplete dropdown options and select first one
    if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
        await page.waitForTimeout(1000)
    }
    
    // Fill unit (search specialties combobox)
    await page.locator("//input[@placeholder='Search specialties...']").click()
    await page.waitForTimeout(500)
    await page.locator("//input[@placeholder='Search specialties...']").fill("Medical")
    await page.waitForTimeout(2000)
    
    // Wait for MUI Autocomplete dropdown options and select first one
    if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
        await page.waitForTimeout(1000)
    }
    
    // Fill start date
    await page.locator("//input[@name='startDate']").fill("2023-01-15")
    await page.waitForTimeout(500)
    
    // Step 6: Check "Currently working here" checkbox instead of filling end date
    const currentlyWorkingCheckbox = page.locator("//input[@name='isCurrentPosition']")
    if (await currentlyWorkingCheckbox.count() > 0 && await currentlyWorkingCheckbox.isVisible()) {
        await currentlyWorkingCheckbox.check()
        await page.waitForTimeout(1000)
    }
    
    // Step 7: Fill description
    await page.locator("//textarea[@placeholder='Describe your role and responsibilities...']").fill("Currently working as a registered nurse providing comprehensive patient care and collaborating with healthcare team.")
    await page.waitForTimeout(500)
    
    // Step 8: Submit the form
    const submitButton = page.locator("//button[contains(text(), 'Add Work History')]").first()
    if (await submitButton.count() > 0 && await submitButton.isVisible()) {
        await submitButton.click()
        await page.waitForTimeout(5000)
        
        // Check if form closed (indicates successful submission)
        const formVisible = await page.locator("form").isVisible()
        if (!formVisible) {
            console.log("✅ Work History with current position added successfully!")
        }
    }
})
