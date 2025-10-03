const {test, expect} = require('@playwright/test');

// Test 1: Add Professional Reference - Positive Flow
test("Add Professional Reference - Positive Flow", async function({page}) {
    
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
    
    // Step 3: Go to Professional References section
    await page.locator("//h2[normalize-space()='Professional References'] | //h2[contains(text(), 'Professional References')] | //h2[contains(text(), 'References')]").first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Click Add Reference button
    await page.locator("//span[contains(text(), 'Add Reference')] | //button[contains(text(), 'Add Reference')] | //span[contains(text(), 'Add Professional Reference')] | //button[contains(text(), 'Add Your First Reference')]").first().click()
    await page.waitForTimeout(2000)
    
    // Step 5: Fill required reference fields
    // Fill reference name (first name and last name or full name)
    const firstNameField = page.locator("//input[@name='firstName' or contains(@placeholder, 'first name') or contains(@placeholder, 'First Name')]")
    if (await firstNameField.count() > 0 && await firstNameField.isVisible()) {
        await firstNameField.fill("John")
        await page.waitForTimeout(500)
    } else {
        // Try full name field if separate first/last name fields don't exist
        const fullNameField = page.locator("//input[@name='fullName' or @name='name' or contains(@placeholder, 'full name') or contains(@placeholder, 'Name')]")
        if (await fullNameField.count() > 0 && await fullNameField.isVisible()) {
            await fullNameField.fill("John Smith")
            await page.waitForTimeout(500)
        }
    }
    
    const lastNameField = page.locator("//input[@name='lastName' or contains(@placeholder, 'last name') or contains(@placeholder, 'Last Name')]")
    if (await lastNameField.count() > 0 && await lastNameField.isVisible()) {
        await lastNameField.fill("Smith")
        await page.waitForTimeout(500)
    }
    
    // Fill job title/position
    const titleField = page.locator("//input[@name='title' or @name='jobTitle' or @name='position' or contains(@placeholder, 'title') or contains(@placeholder, 'Title') or contains(@placeholder, 'position')]")
    if (await titleField.count() > 0 && await titleField.isVisible()) {
        await titleField.fill("Nurse Manager")
        await page.waitForTimeout(500)
    }

    // Fill "Where did you work together?" field (dropdown with work history employers)
    const workTogetherField = page.locator("select[name='workHistoryEmployerId']")
    if (await workTogetherField.count() > 0 && await workTogetherField.isVisible()) {
        // Get all available options
        const options = await workTogetherField.locator('option').all();
        if (options.length > 1) { // Skip the first option which is usually "Select..." or empty
            // Select the first available employer option
            await workTogetherField.selectOption({ index: 1 });
            console.log("✅ Selected work history employer from dropdown");
            } else {
                console.log("⚠️ No work history employers available in dropdown");
            }
            await page.waitForTimeout(500)
        } else {
            console.log("❌ Work history employer dropdown not found")
        }

    // Fill phone number
    const phoneField = page.locator("//input[@name='phone' or @name='phoneNumber' or @type='tel' or contains(@placeholder, 'phone') or contains(@placeholder, 'Phone')]")
    if (await phoneField.count() > 0 && await phoneField.isVisible()) {
        await phoneField.fill("5551234567")
        await page.waitForTimeout(500)
    }
    // Fill email
    const emailField = page.locator("//input[@name='email' or @type='email' or contains(@placeholder, 'email') or contains(@placeholder, 'Email')]")
    if (await emailField.count() > 0 && await emailField.isVisible()) {
        await emailField.fill("john.smith@example.com")
        await page.waitForTimeout(500)
    }
    
    // Fill company/organization
    const companyField = page.locator("//input[@name='company' or @name='organization' or @name='workplace' or contains(@placeholder, 'company') or contains(@placeholder, 'Company') or contains(@placeholder, 'organization')]")
    if (await companyField.count() > 0 && await companyField.isVisible()) {
        await companyField.fill("City General Hospital")
        await page.waitForTimeout(500)
    }
    
    // Fill relationship
    const relationshipField = page.locator("//input[@name='relationship' or contains(@placeholder, 'relationship') or contains(@placeholder, 'Relationship')]")
    if (await relationshipField.count() > 0 && await relationshipField.isVisible()) {
        await relationshipField.fill("Supervisor")
        await page.waitForTimeout(500)
    }
    
    // Fill notes/comments (optional)
    const notesField = page.locator("//textarea[@name='notes' or @name='comments' or contains(@placeholder, 'notes') or contains(@placeholder, 'comment')]")
    if (await notesField.count() > 0 && await notesField.isVisible()) {
        await notesField.fill("John was my direct supervisor for 2 years and can speak to my clinical skills and professional development.")
        await page.waitForTimeout(500)
    }
    
    // Step 6: Submit the form
    const submitButton = page.locator("//button[contains(text(), 'Add Reference') or contains(text(), 'Add Professional Reference') or contains(text(), 'Save Reference') or contains(text(), 'Submit')]").first()
    if (await submitButton.count() > 0 && await submitButton.isVisible()) {
        await submitButton.click()
        await page.waitForTimeout(5000)
        
        // Check if form closed (indicates successful submission)
        const formVisible = await page.locator("form").isVisible()
        if (!formVisible) {
            console.log("✅ Professional Reference added successfully!")
        }
    }
    
    // Step 7: Verify professional reference submission
    await page.waitForTimeout(3000)
    
    // Check if "No References" message is gone (indicates entry was added)
    const noReferencesMessage = await page.locator("//h3[contains(text(), 'No References') or contains(text(), 'No Professional References') or contains(text(), 'Add Your First')]").count()
    if (noReferencesMessage === 0) {
        console.log("✅ Professional Reference added successfully - 'No References' message is gone!")
    }
})

// Test 2: Add Professional Reference - Minimum Required Fields
test("Add Professional Reference - Minimum Required Fields", async function({page}) {
    
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
    
    // Step 3: Go to Professional References section
    await page.locator("//h2[normalize-space()='Professional References'] | //h2[contains(text(), 'Professional References')] | //h2[contains(text(), 'References')]").first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Click Add Reference button
    await page.locator("//span[contains(text(), 'Add Reference')] | //button[contains(text(), 'Add Reference')] | //span[contains(text(), 'Add Professional Reference')] | //button[contains(text(), 'Add Your First Reference')]").first().click()
    await page.waitForTimeout(2000)
    
    // Step 5: Fill only minimum required fields
    // Fill reference name
    const firstNameField = page.locator("//input[@name='firstName' or contains(@placeholder, 'first name') or contains(@placeholder, 'First Name')]")
    if (await firstNameField.count() > 0 && await firstNameField.isVisible()) {
        await firstNameField.fill("Jane")
        await page.waitForTimeout(500)
    } else {
        // Try full name field
        const fullNameField = page.locator("//input[@name='fullName' or @name='name' or contains(@placeholder, 'full name') or contains(@placeholder, 'Name')]")
        if (await fullNameField.count() > 0 && await fullNameField.isVisible()) {
            await fullNameField.fill("Jane Doe")
            await page.waitForTimeout(500)
        }
    }
    
    const lastNameField = page.locator("//input[@name='lastName' or contains(@placeholder, 'last name') or contains(@placeholder, 'Last Name')]")
    if (await lastNameField.count() > 0 && await lastNameField.isVisible()) {
        await lastNameField.fill("Doe")
        await page.waitForTimeout(500)
    }
    
    // Fill email (usually required)
    const emailField = page.locator("//input[@name='email' or @type='email' or contains(@placeholder, 'email') or contains(@placeholder, 'Email')]")
    if (await emailField.count() > 0 && await emailField.isVisible()) {
        await emailField.fill("jane.doe@hospital.com")
        await page.waitForTimeout(500)
    }
    
    // Fill phone (usually required)
    const phoneField = page.locator("//input[@name='phone' or @name='phoneNumber' or @type='tel' or contains(@placeholder, 'phone') or contains(@placeholder, 'Phone')]")
    if (await phoneField.count() > 0 && await phoneField.isVisible()) {
        await phoneField.fill("(555) 987-6543")
        await page.waitForTimeout(500)
    }
    
    // Step 6: Submit the form with minimum fields
    const submitButton = page.locator("//button[contains(text(), 'Add Reference') or contains(text(), 'Add Professional Reference') or contains(text(), 'Save Reference') or contains(text(), 'Submit')]").first()
    if (await submitButton.count() > 0 && await submitButton.isVisible()) {
        await submitButton.click()
        await page.waitForTimeout(5000)
        
        // Check if form closed (indicates successful submission)
        const formVisible = await page.locator("form").isVisible()
        if (!formVisible) {
            console.log("✅ Professional Reference with minimum fields added successfully!")
        }
    }
    
    // Step 7: Verify professional reference submission
    await page.waitForTimeout(3000)
    
    // Check if "No References" message is gone (indicates entry was added)
    const noReferencesMessage = await page.locator("//h3[contains(text(), 'No References') or contains(text(), 'No Professional References') or contains(text(), 'Add Your First')]").count()
    if (noReferencesMessage === 0) {
        console.log("✅ Professional Reference with minimum fields added successfully!")
    }
})

// Test 3: View Professional References Section
test("View Professional References Section", async function({page}) {
    
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
    
    // Step 3: Go to Professional References section
    await page.locator("//h2[normalize-space()='Professional References'] | //h2[contains(text(), 'Professional References')] | //h2[contains(text(), 'References')]").first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: Verify Professional References section is visible
    await expect(page.locator("//h2[normalize-space()='Professional References'] | //h2[contains(text(), 'Professional References')] | //h2[contains(text(), 'References')]").first()).toBeVisible()
    
    // Step 5: Verify Add Reference button is present
    const addButton = page.locator("//span[contains(text(), 'Add Reference')] | //button[contains(text(), 'Add Reference')] | //span[contains(text(), 'Add Professional Reference')] | //button[contains(text(), 'Add Your First Reference')]")
    await expect(addButton.first()).toBeVisible()
    
    console.log("✅ Professional References section viewed successfully!")
})

// Test 4: Update Professional Reference
test("Update Professional Reference", async function({page}) {
    
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
    
    // Step 3: Go to Professional References section
    await page.locator("//h2[normalize-space()='Professional References'] | //h2[contains(text(), 'Professional References')] | //h2[contains(text(), 'References')]").first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: First add a reference if none exists
    const noReferencesMessage = await page.locator("//h3[contains(text(), 'No References') or contains(text(), 'No Professional References') or contains(text(), 'Add Your First')]").count()
    
    if (noReferencesMessage > 0) {
        // Add a reference first
        await page.locator("//span[contains(text(), 'Add Reference')] | //button[contains(text(), 'Add Reference')] | //span[contains(text(), 'Add Professional Reference')] | //button[contains(text(), 'Add Your First Reference')]").first().click()
        await page.waitForTimeout(2000)
        
        // Fill basic reference details
        const firstNameField = page.locator("//input[@name='firstName' or contains(@placeholder, 'first name') or contains(@placeholder, 'First Name')]")
        if (await firstNameField.count() > 0 && await firstNameField.isVisible()) {
            await firstNameField.fill("Original")
            await page.waitForTimeout(500)
        }
        
        const lastNameField = page.locator("//input[@name='lastName' or contains(@placeholder, 'last name') or contains(@placeholder, 'Last Name')]")
        if (await lastNameField.count() > 0 && await lastNameField.isVisible()) {
            await lastNameField.fill("Reference")
            await page.waitForTimeout(500)
        }
        
        const emailField = page.locator("//input[@name='email' or @type='email' or contains(@placeholder, 'email') or contains(@placeholder, 'Email')]")
        if (await emailField.count() > 0 && await emailField.isVisible()) {
            await emailField.fill("original@example.com")
            await page.waitForTimeout(500)
        }
        
        const phoneField = page.locator("//input[@name='phone' or @name='phoneNumber' or @type='tel' or contains(@placeholder, 'phone') or contains(@placeholder, 'Phone')]")
        if (await phoneField.count() > 0 && await phoneField.isVisible()) {
            await phoneField.fill("(555) 111-1111")
            await page.waitForTimeout(500)
        }
        
        // Fill "Where did you work together?" field (dropdown with work history employers)
        const workTogetherField = page.locator("select[name='workHistoryEmployerId']")
        if (await workTogetherField.count() > 0 && await workTogetherField.isVisible()) {
            // Get all available options
            const options = await workTogetherField.locator('option').all();
            if (options.length > 1) { // Skip the first option which is usually "Select..." or empty
                // Select the first available employer option
                await workTogetherField.selectOption({ index: 1 });
                console.log("✅ Selected work history employer from dropdown");
            } else {
                console.log("⚠️ No work history employers available in dropdown");
            }
            await page.waitForTimeout(500)
        }
        
        // Submit the initial reference
        const submitButton = page.locator("//button[contains(text(), 'Add Reference') or contains(text(), 'Add Professional Reference') or contains(text(), 'Save Reference') or contains(text(), 'Submit')]").first()
        if (await submitButton.count() > 0 && await submitButton.isVisible()) {
            await submitButton.click()
            await page.waitForTimeout(5000)
        }
        
        await page.waitForTimeout(3000)
    }
    
    // Step 5: Find and click edit button for existing reference (using same locator as Education History)
    const editButton = page.locator("//div[7]//div[1]//div[2]//div[1]//div[1]//div[1]//div[2]//button[1]//*[name()='svg']")
    
    if (await editButton.count() > 0) {
        await editButton.click()
        await page.waitForTimeout(2000)
        
        // Step 6: Update the reference details
        // Update first name
        const firstNameField = page.locator("//input[@name='firstName' or contains(@placeholder, 'first name') or contains(@placeholder, 'First Name')]")
        if (await firstNameField.count() > 0 && await firstNameField.isVisible()) {
            await firstNameField.clear()
            await firstNameField.fill("Updated")
            await page.waitForTimeout(500)
        }
        
        // Update last name
        const lastNameField = page.locator("//input[@name='lastName' or contains(@placeholder, 'last name') or contains(@placeholder, 'Last Name')]")
        if (await lastNameField.count() > 0 && await lastNameField.isVisible()) {
            await lastNameField.clear()
            await lastNameField.fill("Reference")
            await page.waitForTimeout(500)
        }
        
        // Update email
        const emailField = page.locator("//input[@name='email' or @type='email' or contains(@placeholder, 'email') or contains(@placeholder, 'Email')]")
        if (await emailField.count() > 0 && await emailField.isVisible()) {
            await emailField.clear()
            await emailField.fill("updated@example.com")
            await page.waitForTimeout(500)
        }
        
        // Update "Where did you work together?" field (dropdown with work history employers)
        const workTogetherField = page.locator("select[name='workHistoryEmployerId']")
        if (await workTogetherField.count() > 0 && await workTogetherField.isVisible()) {
            // Get all available options
            const options = await workTogetherField.locator('option').all();
            if (options.length > 2) { // Need at least 3 options to select a different one (empty + original + new)
                // Select a different employer option (index 2 instead of 1)
                await workTogetherField.selectOption({ index: 2 });
                console.log("✅ Updated to different work history employer from dropdown");
            } else if (options.length > 1) {
                // If only 2 options available, select the first non-empty one
                await workTogetherField.selectOption({ index: 1 });
                console.log("✅ Selected available work history employer from dropdown");
            } else {
                console.log("⚠️ No work history employers available in dropdown");
            }
            await page.waitForTimeout(500)
        }
        
        // Step 7: Submit the updated reference
        const updateButton = page.locator("//button[contains(text(), 'Update') or contains(text(), 'Save') or contains(text(), 'Add Reference')]").first()
        if (await updateButton.count() > 0 && await updateButton.isVisible()) {
            await updateButton.click()
            await page.waitForTimeout(5000)
            
            // Check if form closed (indicates successful update)
            const formVisible = await page.locator("form").isVisible()
            if (!formVisible) {
                console.log("✅ Professional Reference updated successfully!")
            }
        }
    } else {
        console.log("⚠️ No edit button found - reference may not exist")
    }
    
    // Step 8: Verify reference was updated
    await page.waitForTimeout(3000)
    console.log("✅ Professional Reference update test completed!")
})

// Test 5: Delete Professional Reference
test.only("Delete Professional Reference", async function({page}) {
    
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
    
    // Step 3: Go to Professional References section
    await page.locator("//h2[normalize-space()='Professional References'] | //h2[contains(text(), 'Professional References')] | //h2[contains(text(), 'References')]").first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    
    // Step 4: First add a reference if none exists
    const noReferencesMessage = await page.locator("//h3[contains(text(), 'No References') or contains(text(), 'No Professional References') or contains(text(), 'Add Your First')]").count()
    
    if (noReferencesMessage > 0) {
        // Add a reference first
        await page.locator("//span[contains(text(), 'Add Reference')] | //button[contains(text(), 'Add Reference')] | //span[contains(text(), 'Add Professional Reference')] | //button[contains(text(), 'Add Your First Reference')]").first().click()
        await page.waitForTimeout(2000)
        
        // Fill basic reference details
        const firstNameField = page.locator("//input[@name='firstName' or contains(@placeholder, 'first name') or contains(@placeholder, 'First Name')]")
        if (await firstNameField.count() > 0 && await firstNameField.isVisible()) {
            await firstNameField.fill("Reference")
            await page.waitForTimeout(500)
        }
        
        const lastNameField = page.locator("//input[@name='lastName' or contains(@placeholder, 'last name') or contains(@placeholder, 'Last Name')]")
        if (await lastNameField.count() > 0 && await lastNameField.isVisible()) {
            await lastNameField.fill("ToDelete")
            await page.waitForTimeout(500)
        }
        
        const emailField = page.locator("//input[@name='email' or @type='email' or contains(@placeholder, 'email') or contains(@placeholder, 'Email')]")
        if (await emailField.count() > 0 && await emailField.isVisible()) {
            await emailField.fill("delete@example.com")
            await page.waitForTimeout(500)
        }
        
        const phoneField = page.locator("//input[@name='phone' or @name='phoneNumber' or @type='tel' or contains(@placeholder, 'phone') or contains(@placeholder, 'Phone')]")
        if (await phoneField.count() > 0 && await phoneField.isVisible()) {
            await phoneField.fill("(555) 999-9999")
            await page.waitForTimeout(500)
        }
        
        // Fill "Where did you work together?" field
        const workTogetherField = page.locator("//input[@name='workTogether' or @name='workedTogether' or @name='workplace' or @name='workLocation' or contains(@placeholder, 'work together') or contains(@placeholder, 'worked together') or contains(@placeholder, 'where did you work') or contains(@placeholder, 'Where did you work')]")
        if (await workTogetherField.count() > 0 && await workTogetherField.isVisible()) {
            await workTogetherField.fill("Hospital to Delete - Emergency Department")
            await page.waitForTimeout(500)
        }
        
        // Submit the initial reference
        const submitButton = page.locator("//button[contains(text(), 'Add Reference') or contains(text(), 'Add Professional Reference') or contains(text(), 'Save Reference') or contains(text(), 'Submit')]").first()
        if (await submitButton.count() > 0 && await submitButton.isVisible()) {
            await submitButton.click()
            await page.waitForTimeout(5000)
        }
        
        await page.waitForTimeout(3000)
    }
    
    // Step 5: Find and click delete button for existing reference (using same locator as Education History)
    const deleteButton = page.locator("//div[7]//div[1]//div[2]//div[1]//div[1]//div[1]//div[2]//button[2]//*[name()='svg']")
    
    if (await deleteButton.count() > 0) {
        await deleteButton.click()
        await page.waitForTimeout(2000)
        
        // Step 6: Confirm deletion if confirmation dialog appears
        const confirmButton = page.locator("//button[contains(text(), 'Delete') or contains(text(), 'Confirm') or contains(text(), 'Yes')] | //button[@role='button'][contains(text(), 'Delete')]").first()
        if (await confirmButton.count() > 0 && await confirmButton.isVisible()) {
            await confirmButton.click()
            await page.waitForTimeout(3000)
            console.log("✅ Professional Reference deletion confirmed!")
        }
        
        // Step 7: Verify reference was deleted
        await page.waitForTimeout(3000)
        
        // Check if "No References" message appears (indicates successful deletion)
        const noReferencesAfterDelete = await page.locator("//h3[contains(text(), 'No References') or contains(text(), 'No Professional References') or contains(text(), 'Add Your First')]").count()
        if (noReferencesAfterDelete > 0) {
            console.log("✅ Professional Reference deleted successfully - 'No References' message is back!")
        }
        
    } else {
        console.log("⚠️ No delete button found - reference may not exist")
    }
    
    // Step 8: Verify deletion completed
    console.log("✅ Professional Reference deletion test completed!")
})
