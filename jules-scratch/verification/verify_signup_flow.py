from playwright.sync_api import sync_playwright, Page, expect

def test_signup_flow(page: Page):
    """
    This test verifies that the new signup flow is working correctly.
    It navigates to the role selection page, selects the passenger role,
    and takes a screenshot of the passenger signup form.
    """
    # 1. Arrange: Go to the landing page.
    page.goto("http://localhost:4500")

    # 2. Act: Find the "Get Started" button and click it.
    get_started_button = page.get_by_role("link", name="Get Started")
    get_started_button.click()

    # 3. Assert: Confirm that we are on the role selection page.
    expect(page).to_have_title("Role Selection")

    # 4. Act: Click on the "Passenger" role.
    passenger_role_link = page.get_by_role("link", name="Passenger")
    passenger_role_link.click()

    # 5. Assert: Confirm that we are on the passenger signup page.
    expect(page).to_have_title("Passenger Signup")

    # 6. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/signup_flow.png")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
        test_signup_flow(page)
    except Exception as e:
        print(f"Test failed: {e}")
    finally:
        browser.close()
