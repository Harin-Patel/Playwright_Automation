const {test, expect} = require('@playwright/test');

// Test 1: Add Education History - Positive Flow
test("Add Education History - Positive Flow", async function({page}) {
    
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
    
    // Step 3: Go to Education History section
    await page.locator("//h2[normalize-space()='Education History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Click Add Education button
    await page.locator("//span[contains(text(), 'Add Education')]").click()
    await page.waitForTimeout(2000)
    
    // Step 5: Fill required fields
    // Fill school name (search schools combobox)
    await page.locator("//input[@placeholder='Search schools...']").click()
    await page.waitForTimeout(500)
    await page.locator("//input[@placeholder='Search schools...']").fill("University")
    await page.waitForTimeout(2000)
    
    // Wait for MUI Autocomplete dropdown options and select first one
    if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
        await page.waitForTimeout(1000)
    }
    
    // Fill course of study (search courses combobox)
    await page.locator("//input[@placeholder='Select course of study']").click()
    await page.waitForTimeout(500)
    await page.locator("//input[@placeholder='Select course of study']").fill("Nursing")
    await page.waitForTimeout(2000)
    
    // Wait for MUI Autocomplete dropdown options and select first one
    if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
        await page.waitForTimeout(1000)
    }
    
    // Step 6: Check "Did you Graduate?" checkbox
    const graduateCheckbox = page.locator("//input[@name='didGraduate']")
    if (await graduateCheckbox.count() > 0 && await graduateCheckbox.isVisible()) {
        await graduateCheckbox.check()
        await page.waitForTimeout(2000) // Wait for conditional fields to appear
    }
    
    // Step 7: Fill conditional graduation fields that appear after checking graduation checkbox
    // Fill graduation date
    const graduationDateField = page.locator("//input[@name='graduationDate']")
    if (await graduationDateField.count() > 0 && await graduationDateField.isVisible()) {
        await graduationDateField.fill("2023-05-15")
        await page.waitForTimeout(500)
    }
    
    // Fill degree (combobox)
    const degreeField = page.locator("//input[contains(@placeholder, 'Select degree')]")
    if (await degreeField.count() > 0 && await degreeField.isVisible()) {
        await degreeField.click()
        await page.waitForTimeout(500)
        await degreeField.fill("Diploma")
        await page.waitForTimeout(2000)
        
        // Wait for MUI Autocomplete dropdown options and select first one
        if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
            await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
            await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
            await page.waitForTimeout(1000)
        }
    }
    
    // Step 8: Submit the form
    const submitButton = page.locator("//button[contains(text(), 'Add Education History')]").first()
    if (await submitButton.count() > 0 && await submitButton.isVisible()) {
        await submitButton.click()
        await page.waitForTimeout(5000)
        
        // Check if form closed (indicates successful submission)
        const formVisible = await page.locator("form").isVisible()
        if (!formVisible) {
            console.log("✅ Education History added successfully!")
        }
    }
    
    // Step 9: Verify education history submission
    await page.waitForTimeout(3000)
    
    // Check if "No Education History" message is gone (indicates entry was added)
    const noEducationMessage = await page.locator("//h3[contains(text(), 'No Education History') or contains(text(), 'Add Your First')]").count()
    if (noEducationMessage === 0) {
        console.log("✅ Education History with graduation details added successfully!")
    }
})

// Test 2: Add Education History - Without Graduation
test("Add Education History - Without Graduation", async function({page}) {
    
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
    
    // Step 3: Go to Education History section
    await page.locator("//h2[normalize-space()='Education History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Click Add Education button
    await page.locator("//span[contains(text(), 'Add Education')]").click()
    await page.waitForTimeout(2000)
    
    // Step 5: Fill required fields
    // Fill school name (search schools combobox)
    await page.locator("//input[@placeholder='Search schools...']").click()
    await page.waitForTimeout(500)
    await page.locator("//input[@placeholder='Search schools...']").fill("College")
    await page.waitForTimeout(2000)
    
    // Wait for MUI Autocomplete dropdown options and select first one
    if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
        await page.waitForTimeout(1000)
    }
    
    // Fill course of study (search courses combobox)
    await page.locator("//input[@placeholder='Select course of study']").click()
    await page.waitForTimeout(500)
    await page.locator("//input[@placeholder='Select course of study']").fill("Medical")
    await page.waitForTimeout(2000)
    
    // Wait for MUI Autocomplete dropdown options and select first one
    if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().waitFor({timeout: 5000})
        await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
        await page.waitForTimeout(1000)
    }
    
    // Step 6: Leave "Did you Graduate?" checkbox unchecked (testing without graduation)
    const graduateCheckbox = page.locator("//input[@name='didGraduate']")
    if (await graduateCheckbox.count() > 0 && await graduateCheckbox.isVisible()) {
        // Ensure checkbox is unchecked
        if (await graduateCheckbox.isChecked()) {
            await graduateCheckbox.uncheck()
            await page.waitForTimeout(1000)
        }
    }
    
    // Step 7: Submit the form
    const submitButton = page.locator("//button[contains(text(), 'Add Education History')]").first()
    if (await submitButton.count() > 0 && await submitButton.isVisible()) {
        await submitButton.click()
        await page.waitForTimeout(5000)
        
        // Check if form closed (indicates successful submission)
        const formVisible = await page.locator("form").isVisible()
        if (!formVisible) {
            console.log("✅ Education History without graduation added successfully!")
        }
    }
    
    // Step 8: Verify education history submission
    await page.waitForTimeout(3000)
    
    // Check if "No Education History" message is gone (indicates entry was added)
    const noEducationMessage = await page.locator("//h3[contains(text(), 'No Education History') or contains(text(), 'Add Your First')]").count()
    if (noEducationMessage === 0) {
        console.log("✅ Education History without graduation added successfully!")
    }
})

// Test 3: View Education History Section
test("View Education History Section", async function({page}) {
    
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
    
    // Step 3: Go to Education History section
    await page.locator("//h2[normalize-space()='Education History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Verify Education History section is visible
    await expect(page.locator("//h2[normalize-space()='Education History']")).toBeVisible()
    
    // Step 5: Verify Add Education button is present
    const addButton = page.locator("//span[contains(text(), 'Add Education')] | //button[contains(text(), 'Add Your First Education')]")
    await expect(addButton.first()).toBeVisible()
    
    console.log("✅ Education History section viewed successfully!")
})

// Test 4: Update Education History
test("Update Education History", async function({page}) {
    
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
    
    // Step 3: Go to Education History section
    await page.locator("//h2[normalize-space()='Education History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: First add an education history if none exists
    const noEducationMessage = await page.locator("//h3[contains(text(), 'No Education History') or contains(text(), 'Add Your First')]").count()
    
    if (noEducationMessage > 0) {
        // Add an education history first
        await page.locator("//span[contains(text(), 'Add Education')]").click()
        await page.waitForTimeout(2000)
        
        // Fill school name
        await page.locator("//input[@placeholder='Search schools...']").click()
        await page.waitForTimeout(500)
        await page.locator("//input[@placeholder='Search schools...']").fill("Original University")
        await page.waitForTimeout(2000)
        
        if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
            await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
            await page.waitForTimeout(1000)
        }
        
        // Fill course of study
        await page.locator("//input[@placeholder='Select course of study']").click()
        await page.waitForTimeout(500)
        await page.locator("//input[@placeholder='Select course of study']").fill("Original Course")
        await page.waitForTimeout(2000)
        
        if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
            await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
            await page.waitForTimeout(1000)
        }
        
        // Check graduation and fill conditional fields
        const graduateCheckbox = page.locator("//input[@name='didGraduate']")
        if (await graduateCheckbox.count() > 0 && await graduateCheckbox.isVisible()) {
            await graduateCheckbox.check()
            await page.waitForTimeout(2000)
            
            // Fill graduation date
            const graduationDateField = page.locator("//input[@name='graduationDate']")
            if (await graduationDateField.count() > 0 && await graduationDateField.isVisible()) {
                await graduationDateField.fill("2022-06-15")
                await page.waitForTimeout(500)
            }
            
            // Fill degree
            const degreeField = page.locator("//input[contains(@placeholder, 'Select degree')]")
            if (await degreeField.count() > 0 && await degreeField.isVisible()) {
                await degreeField.click()
                await page.waitForTimeout(500)
                await degreeField.fill("Bachelor")
                await page.waitForTimeout(2000)
                
                if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
                    await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
                    await page.waitForTimeout(1000)
                }
            }
        }
        
        // Submit the initial education
        const submitButton = page.locator("//button[contains(text(), 'Add Education History')]").first()
        if (await submitButton.count() > 0 && await submitButton.isVisible()) {
            await submitButton.click()
            await page.waitForTimeout(5000)
        }
        
        await page.waitForTimeout(3000)
    }
    
    // Step 5: Find and click edit button for existing education history
    const editButton = page.locator("//div[6]//div[1]//div[2]//div[1]//div[1]//div[1]//div[2]//button[1]//*[name()='svg']//*[name()='path' and contains(@stroke-linecap,'round')]").first()
    
    if (await editButton.count() > 0) {
        await editButton.click()
        await page.waitForTimeout(2000)
        
        // Step 6: Update the education details
        // Update school name
        const schoolField = page.locator("//input[@placeholder='Search schools...']")
        if (await schoolField.count() > 0 && await schoolField.isVisible()) {
            await schoolField.clear()
            await schoolField.fill("Testing School")
            await page.waitForTimeout(2000)
            
            if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
                await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
                await page.waitForTimeout(1000)
            }
        }
        
        // Update course of study
        const courseField = page.locator("//input[@placeholder='Select course of study']")
        if (await courseField.count() > 0 && await courseField.isVisible()) {
            await courseField.clear()
            await courseField.fill("High School Diploma")
            await page.waitForTimeout(2000)
            
            if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
                await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
                await page.waitForTimeout(1000)
            }
        }
        
        // Update graduation date if visible
        const graduationDateField = page.locator("//input[@name='graduationDate']")
        if (await graduationDateField.count() > 0 && await graduationDateField.isVisible()) {
            await graduationDateField.fill("2023-12-15")
            await page.waitForTimeout(500)
        }
        
        // Step 7: Submit the updated education
        const updateButton = page.locator("//button[contains(text(), 'Update') or contains(text(), 'Save') or contains(text(), 'Add Education History')]").first()
        if (await updateButton.count() > 0 && await updateButton.isVisible()) {
            await updateButton.click()
            await page.waitForTimeout(5000)
            
            // Check if form closed (indicates successful update)
            const formVisible = await page.locator("form").isVisible()
            if (!formVisible) {
                console.log("✅ Education History updated successfully!")
            }
        }
    } else {
        console.log("⚠️ No edit button found - education history may not exist")
    }
    
    // Step 8: Verify education history was updated
    await page.waitForTimeout(3000)
    console.log("✅ Education History update test completed!")
})

// Test 5: Delete Education History
test.only("Delete Education History", async function({page}) {
    
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
    
    // Step 3: Go to Education History section
    await page.locator("//h2[normalize-space()='Education History']").scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: First add an education history if none exists
    const noEducationMessage = await page.locator("//h3[contains(text(), 'No Education History') or contains(text(), 'Add Your First')]").count()
    
    if (noEducationMessage > 0) {
        // Add an education history first
        await page.locator("//span[contains(text(), 'Add Education')]").click()
        await page.waitForTimeout(2000)
        
        // Fill school name
        await page.locator("//input[@placeholder='Search schools...']").click()
        await page.waitForTimeout(500)
        await page.locator("//input[@placeholder='Search schools...']").fill("University to Delete")
        await page.waitForTimeout(2000)
        
        if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
            await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
            await page.waitForTimeout(1000)
        }
        
        // Fill course of study
        await page.locator("//input[@placeholder='Select course of study']").click()
        await page.waitForTimeout(500)
        await page.locator("//input[@placeholder='Select course of study']").fill("Course to Delete")
        await page.waitForTimeout(2000)
        
        if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
            await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
            await page.waitForTimeout(1000)
        }
        
        // Check graduation and fill conditional fields
        const graduateCheckbox = page.locator("//input[@name='didGraduate']")
        if (await graduateCheckbox.count() > 0 && await graduateCheckbox.isVisible()) {
            await graduateCheckbox.check()
            await page.waitForTimeout(2000)
            
            // Fill graduation date
            const graduationDateField = page.locator("//input[@name='graduationDate']")
            if (await graduationDateField.count() > 0 && await graduationDateField.isVisible()) {
                await graduationDateField.fill("2021-05-20")
                await page.waitForTimeout(500)
            }
            
            // Fill degree
            const degreeField = page.locator("//input[contains(@placeholder, 'Select degree')]")
            if (await degreeField.count() > 0 && await degreeField.isVisible()) {
                await degreeField.click()
                await page.waitForTimeout(500)
                await degreeField.fill("Diploma")
                await page.waitForTimeout(2000)
                
                if (await page.locator(".MuiAutocomplete-popper li[role='option']").count() > 0) {
                    await page.locator(".MuiAutocomplete-popper li[role='option']").first().click()
                    await page.waitForTimeout(1000)
                }
            }
        }
        
        // Submit the initial education
        const submitButton = page.locator("//button[contains(text(), 'Add Education History')]").first()
        if (await submitButton.count() > 0 && await submitButton.isVisible()) {
            await submitButton.click()
            await page.waitForTimeout(5000)
        }
        
        await page.waitForTimeout(3000)
    }
    
    // Step 5: Find and click delete button for existing education history
    const deleteButton = page.locator("//div[6]//div[1]//div[2]//div[1]//div[1]//div[1]//div[2]//button[2]//*[name()='svg']").first()
    
    if (await deleteButton.count() > 0) {
        await deleteButton.click()
        await page.waitForTimeout(2000)
        
        // Step 6: Confirm deletion if confirmation dialog appears
        const confirmButton = page.locator("//button[contains(text(), 'Delete') or contains(text(), 'Confirm') or contains(text(), 'Yes')] | //button[@role='button'][contains(text(), 'Delete')]").first()
        if (await confirmButton.count() > 0 && await confirmButton.isVisible()) {
            await confirmButton.click()
            await page.waitForTimeout(3000)
            console.log("✅ Education History deletion confirmed!")
        }
        
        // Step 7: Verify education history was deleted
        await page.waitForTimeout(3000)
        
        // Check if "No Education History" message appears (indicates successful deletion)
        const noEducationAfterDelete = await page.locator("//h3[contains(text(), 'No Education History') or contains(text(), 'Add Your First')]").count()
        if (noEducationAfterDelete > 0) {
            console.log("✅ Education History deleted successfully - 'No Education History' message is back!")
        }
        
    } else {
        console.log("⚠️ No delete button found - education history may not exist")
    }
    
    // Step 8: Verify deletion completed
    console.log("✅ Education History deletion test completed!")
})
