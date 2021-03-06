import sys
sys.path.insert(0, '../UniMuse')

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep

from UniMuse.models import db, User, Playlist, PlaylistSong, Song


BROWSER_URL = 'http://localhost:5000'


class TestMixin:
    """Mixin for base test methods."""

    def setUp(self):
        """Set-up for testing."""
        self.browser = webdriver.Firefox()
        self.wait = WebDriverWait(self.browser, 5)
    
    def tearDown(self):
        """Tear-down for testing."""
        self.browser.quit()

    def verify_url(self, actual_url, expected_url):
       """Compare actual vs. expected URLs."""
       unittest.TestCase.assertEqual(self, actual_url, expected_url,
                                      "Actual url: " + actual_url + " is not equal to expected url: " + expected_url)


class TestIndex(TestMixin, unittest.TestCase):
    """Class to test the home page of UniMuse."""

    def test_title(self):
        """Test main page title."""
        self.browser.get(BROWSER_URL)
        self.assertEqual(self.browser.title, 'UniMuse')

    def test_main_btn_value(self):
        """Test main page button value."""
        self.browser.get(BROWSER_URL)
        new_user_signup = self.browser.find_element_by_id('main-signup-btn')
        self.assertEqual(new_user_signup.text, 'NEW USER')
    
    def test_new_user_btn(self):
        """Test main page new user sign-up button."""
        self.browser.get(BROWSER_URL)
        self.browser.find_element(By.ID, 'main-signup-btn').click()

        actual_url = self.browser.current_url
        self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/sign-up-form')

    def test_login_btn(self):
        """Test main page log-in button."""
        self.browser.get(BROWSER_URL)
        self.browser.find_element(By.ID, 'main-login-btn').click()

        actual_url = self.browser.current_url
        self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/login-form')

    def test_about_header(self):
        """Test main page about section header."""
        self.browser.get(BROWSER_URL)
        about_header = self.browser.find_element_by_id('about-header')
        self.assertEqual(about_header.text, 'About')
    
    def test_about_section(self):
        """Test main page about section."""
        self.browser.get(BROWSER_URL)
        about_section = self.browser.find_element_by_id('about-p')
        self.assertIn("Welcome", about_section.text)

    def test_avail_services_header(self):
        """Test main page available services section."""
        self.browser.get(BROWSER_URL)
        avail_serv_header = self.browser.find_element_by_id('available-subs-header')
        self.assertEqual(avail_serv_header.text, "Available Music Services")


class TestMainSignUp(TestMixin, unittest.TestCase):
    """Class to test the UniMuse account sign-up page."""

    def test_title(self):
        """Test sign-up page title."""
        self.browser.get(BROWSER_URL+'/sign-up-form')
        self.assertEqual(self.browser.title, 'Sign-Up!')

    def test_header(self):
        """Test sign-up page header."""
        self.browser.get(BROWSER_URL+'/sign-up-form')
        main_header = self.browser.find_element_by_id('signup-header').text
        self.assertIn('Sign-Up', main_header)

    def test_signup_input_label(self):
        """Test sign-up page label for username input box."""
        self.browser.get(BROWSER_URL+'/sign-up-form')
        input_label = self.browser.find_element_by_id('signup-username-label')
        self.assertEqual(input_label.text, 'Username:')

    def test_signup_button_value(self):
        """Test sign-up page value for submit button."""
        self.browser.get(BROWSER_URL+'/sign-up-form')
        button = self.browser.find_element(By.ID, 'submit-new-user-btn')
        self.assertEqual(button.text, 'SIGN-UP!')

    def test_back_to_main_btn(self):
        """Test sign-up page back to main page button."""
        self.browser.get(BROWSER_URL+'/sign-up-form')
        self.browser.find_element(By.ID, 'signup-to-main-btn').click()
        actual_url = self.browser.current_url
        self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/')

    def test_new_user_create_btn(self):
        """Test new user sign-up submission."""
        self.browser.get(BROWSER_URL+'/sign-up-form')

        username = self.browser.find_element(By.NAME, 'new-username')
        username.send_keys("mortysmith")
        password = self.browser.find_element(By.NAME, 'new-password')
        password.send_keys("ilovejessica")

        self.browser.find_element(By.ID, 'submit-new-user-btn').click()
        self.wait

        alert = self.browser.find_element(By.CLASS_NAME, 'alert')
        if alert.text == 'Sign-up successful!':
            actual_url = self.browser.current_url
            self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/services-login')

        else:
            self.assertEqual(alert.text, "That username is already taken!")

    def test_existing_user_create_btn(self):
        """Test sign-up page attempt to create account with existing user info."""
        self.browser.get(BROWSER_URL+'/sign-up-form')

        username = self.browser.find_element(By.NAME, 'new-username')
        username.send_keys("test_human")
        password = self.browser.find_element(By.NAME, 'new-password')
        password.send_keys("iamnothuman")

        self.browser.find_element(By.ID, 'submit-new-user-btn').click()
        self.wait

        alert = self.browser.find_element(By.CLASS_NAME, 'alert')
        if alert.text == 'That username is already taken!':
            actual_url = self.browser.current_url
            self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/sign-up-form')
        else:
            print(alert.text)
    
    
class TestMainLogin(TestMixin, unittest.TestCase):
    """Class to test the UniMuse user login page."""

    def test_title(self):
        """Test login page title."""
        self.browser.get(BROWSER_URL+'/login-form')
        self.assertEqual(self.browser.title, 'Login')

    def test_header(self):
        """Test login page header."""
        self.browser.get(BROWSER_URL+'/login-form')
        main_header = self.browser.find_element_by_id('login-header').text
        self.assertIn('Log-in to UniMuse', main_header)

    def test_login_input_label(self):
        """Test login page label for username input box."""
        self.browser.get(BROWSER_URL+'/login-form')
        input_label = self.browser.find_element_by_id('login-username-label')
        self.assertEqual(input_label.text, 'Username:')

    def test_login_button_value(self):
        """Test login page value for submit button."""
        self.browser.get(BROWSER_URL+'/login-form')
        button = self.browser.find_element(By.ID, 'login-submit-btn')
        self.assertEqual(button.text, 'LOG-IN!')

    def test_back_to_main_btn(self):
        """Test login page back to main page button."""
        self.browser.get(BROWSER_URL+'/login-form')
        self.browser.find_element(By.ID, 'login-to-main-btn').click()
        actual_url = self.browser.current_url
        self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/')

    def test_valid_user_login_btn(self):
        """Test existing user login submission."""
        self.browser.get(BROWSER_URL+'/login-form')

        username = self.browser.find_element(By.NAME, 'username')
        username.send_keys("test_human")
        password = self.browser.find_element(By.NAME, 'password')
        password.send_keys("iamnothuman")

        self.browser.find_element(By.ID, 'login-submit-btn').click()
        self.wait

        alert = self.browser.find_element(By.CLASS_NAME, 'alert')
        if alert.text == "You've successfully logged in!":
            actual_url = self.browser.current_url
            self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/services-login')

        else:
            print(alert.text)

    def test_invalid_user_login_btn(self):
        """Test non-existing user login submission."""
        self.browser.get(BROWSER_URL+'/login-form')

        username = self.browser.find_element(By.NAME, 'username')
        username.send_keys("ricksmith")
        password = self.browser.find_element(By.NAME, 'password')
        password.send_keys("burp")

        self.browser.find_element(By.ID, 'login-submit-btn').click()
        self.wait

        alert = self.browser.find_element(By.CLASS_NAME, 'alert')
        if alert.text == "That username doesn't exist!":
            actual_url = self.browser.current_url
            self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/login-form')
        else:
            print(alert.text)

    def test_wrongpass_user_login_btn(self):
        """Test existing user wrong password login submission."""
        self.browser.get(BROWSER_URL+'/login-form')

        username = self.browser.find_element(By.NAME, 'username')
        username.send_keys("test_human")
        password = self.browser.find_element(By.NAME, 'password')
        password.send_keys("iamhuman")

        self.browser.find_element(By.ID, 'login-submit-btn').click()
        self.wait

        alert = self.browser.find_element(By.CLASS_NAME, 'alert')
        if alert.text == "The password is incorrect.":
            actual_url = self.browser.current_url
            self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/login-form')
        else:
            print(alert.text)


class TestSubscriptionsLogin(TestMixin, unittest.TestCase):
    """Class to test the subscriptions login page."""

    def test_title(self):
        """Test subscriptions page title."""
        self.browser.get(BROWSER_URL+'/services-login')
        self.assertEqual(self.browser.title, 'Music Services Login')

    def test_header(self):
        """Test subscriptions page header."""
        self.browser.get(BROWSER_URL+'/services-login')
        main_header = self.browser.find_element_by_id('services-header').text
        self.assertIn('Services', main_header)

    def test_spotify_login_button_value(self):
        """Test subscriptions page value for Spotify login button."""
        self.browser.get(BROWSER_URL+'/services-login')
        button = self.browser.find_element(By.ID, 'spotify-login-btn')
        self.assertEqual(button.text, ' SPOTIFY')

    def test_back_to_main_btn(self):
        """Test subscriptions page back to main page button."""
        self.browser.get(BROWSER_URL+'/services-login')
        self.browser.find_element(By.ID, 'services-to-main-btn').click()
        actual_url = self.browser.current_url
        self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/')

    def test_spotify_auth_page_btn(self):
        """Test Spotify auth page redirect button."""
        self.browser.get(BROWSER_URL+'/services-login')

        self.browser.find_element(By.ID, 'spotify-login-btn').click()
        self.wait

        actual_url = self.browser.current_url
        self.assertIn('accounts.spotify', actual_url)

    def test_subscription_login_finish_btn(self):
        """Test finish logging into subscriptions button."""
        self.browser.get(BROWSER_URL+'/services-login')

        self.browser.find_element(By.ID, 'finished-logins-btn').click()
        self.wait

        actual_url = self.browser.current_url
        self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/searchlist-playlist')


if __name__ == "__main__":
    unittest.main()
