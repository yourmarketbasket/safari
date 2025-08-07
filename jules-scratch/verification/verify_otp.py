from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Non-superuser registration
    page.goto("http://localhost:4500/signup")
    page.get_by_label("Email Address").fill("test@example.com")
    page.get_by_role("button", name="Send OTP").click()

    try:
        page.wait_for_selector('input[aria-label="Please enter your OTP"]', timeout=10000)
        page.screenshot(path="jules-scratch/verification/non_superuser_otp.png")

        otp_inputs = page.query_selector_all('input[aria-label="Please enter your OTP"]')
        for i, input_field in enumerate(otp_inputs):
            input_field.fill(str(i + 1))

        page.get_by_role("button", name="Verify OTP").click()
        page.wait_for_selector('input[aria-label="Password"]')
        page.screenshot(path="jules-scratch/verification/non_superuser_password.png")
    except Exception as e:
        print("Non-superuser registration failed:", e)
        page.screenshot(path="jules-scratch/verification/non_superuser_error.png")
        print(page.content())


    # Superuser registration
    page.goto("http://localhost:4500/superuser/register")
    page.get_by_label("Email Address").fill("super@example.com")
    page.get_by_role("button", name="Send OTP").click()

    try:
        page.wait_for_selector('input[aria-label="Please enter your OTP"]', timeout=10000)
        page.screenshot(path="jules-scratch/verification/superuser_otp.png")

        otp_inputs = page.query_selector_all('input[aria-label="Please enter your OTP"]')
        for i, input_field in enumerate(otp_inputs):
            input_field.fill(str(i + 1))

        page.get_by_role("button", name="Verify OTP").click()
        page.wait_for_selector('input[aria-label="Password"]')
        page.screenshot(path="jules-scratch/verification/superuser_password.png")
    except Exception as e:
        print("Superuser registration failed:", e)
        page.screenshot(path="jules-scratch/verification/superuser_error.png")
        print(page.content())

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
