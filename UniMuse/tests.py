from selenium import webdriver
import unittest

BROWSER_URL = 'http://localhost:5000/'

class TestUniMuse(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
    
    def tearDown(self):
        self.browser.quit()

    def test_main_title(self):
        self.browser.get(BROWSER_URL)
        self.assertEqual(self.browser.title, '')
    
    def test_new_user(self):
        self.browser.get(BROWSER_URL)

        btn_new_user = self.browser.find_element_by_id('')
        btn_new_user.click()

        