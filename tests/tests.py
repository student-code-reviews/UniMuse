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

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.wait = WebDriverWait(self.browser, 5)
    
    def tearDown(self):
        self.browser.quit()

    def verify_url(self, actual_url, expected_url):
       """ Compare 2 arguments """
       unittest.TestCase.assertEqual(self, actual_url, expected_url,
                                      "Actual url: " + actual_url + " is not equal to expected url: " + expected_url)


class TestIndex(TestMixin, unittest.TestCase):

    def test_title(self):
        self.browser.get(BROWSER_URL)
        self.assertEqual(self.browser.title, 'UniMuse')

    def test_header(self):
        self.browser.get(BROWSER_URL)
        main_header = self.browser.find_element_by_id('main-header').text
        self.assertIn('Welcome', main_header)

    def test_main_btn_value(self):
        self.browser.get(BROWSER_URL)
        new_user_signup = self.browser.find_element_by_id('main-signup-button')
        self.assertEqual(new_user_signup.text, 'New User')
    
    def test_new_user_btn(self):
        self.browser.get(BROWSER_URL)
        self.browser.find_element(By.ID, 'main-signup-button').click()

        actual_url = self.browser.current_url
        self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/sign-up-form')

    def test_login_btn(self):
        self.browser.get(BROWSER_URL)
        self.browser.find_element(By.ID, 'main-login-button').click()

        actual_url = self.browser.current_url
        self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/login-form')


class TestMainSignUp(TestMixin, unittest.TestCase):

    def test_title(self):
        self.browser.get(BROWSER_URL+'/sign-up-form')
        self.assertEqual(self.browser.title, 'Sign-Up!')

    def test_header(self):
        self.browser.get(BROWSER_URL+'/sign-up-form')
        main_header = self.browser.find_element_by_id('signup-header').text
        self.assertIn('Sign-Up', main_header)

    def test_signup_input_label(self):
        self.browser.get(BROWSER_URL+'/sign-up-form')
        input_label = self.browser.find_element_by_id('sign-up-username-label')
        self.assertEqual(input_label.text, 'Username:')

    def test_signup_button_value(self):
        self.browser.get(BROWSER_URL+'/sign-up-form')
        button = self.browser.find_element(By.ID, 'submit-new-user')
        self.assertEqual(button.get_attribute('value'), 'Sign-Up!')

    def test_back_to_main_btn(self):
        self.browser.get(BROWSER_URL+'/sign-up-form')
        self.browser.find_element(By.ID, 'signup-to-main-btn').click()
        actual_url = self.browser.current_url
        self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/index')

    def test_new_user_create_btn(self):
        self.browser.get(BROWSER_URL+'/sign-up-form')

        username = self.browser.find_element(By.NAME, 'um-new-username')
        username.send_keys("mortysmith")
        password = self.browser.find_element(By.NAME, 'um-new-password')
        password.send_keys("ilovejessica")

        self.browser.find_element(By.ID, 'submit-new-user').click()
        self.wait

        alert = self.browser.find_element(By.CLASS_NAME, 'alert')
        if alert.text == 'Sign-up Successful!':
            actual_url = self.browser.current_url
            self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/index')

        elif alert.text == 'That username is already taken!':
            actual_url = self.browser.current_url
            self.verify_url(actual_url=actual_url, expected_url=f'{BROWSER_URL}/sign-up-form')


if __name__ == "__main__":
    unittest.main()
