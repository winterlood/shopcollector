from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.expected_conditions import visibility_of_element_located
from selenium.webdriver.common.by import By
from selenium.common.exceptions import UnexpectedAlertPresentException
from bs4 import BeautifulSoup
import json
import pyperclip
import time
import os
import random
TIMEOUT = 5
now_path = os.path.dirname(os.path.realpath(__file__))
file = open(f'{now_path}\\metadata\\config.json',
            'r', encoding='utf-8')
config_dict = json.load(file)

class SeleniumController():
    def __init__(self, url,input_keyword):
        options = webdriver.ChromeOptions()
        userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36"
        options.add_argument(f'user-agent={userAgent}')
        options.add_experimental_option("excludeSwitches", ["enable-logging"])
        options.add_argument("--window-size=800,1000")
        options.add_argument("--disable-gpu")
        options.add_argument("--allow-insecure-localhost")

        self.input_keyword = input_keyword
        self.browser = webdriver.Chrome(
            f'{now_path}\\chromedriver.exe', chrome_options=options)
        self.alert_controller = Alert(self.browser)
        self.browser.get(url)
        time.sleep(1)

    def refresh(self):
        while True:
            try:
                self.browser.refresh()
                break
            except Exception:
                pass

    def open_browser(self, link):
        print("브라우저 연결 시도")
        print("연결 대상 : ", link)
        self.browser.get(link)
        self.browser.implicitly_wait(5)

    def close_browser(self):
        print("브라우저 종료 시도")
        self.browser.close()

    def get_driver(self):
        return self.browser

    def terminate(self):
        self.browser.quit()

    def fcn(self, class_name, target_elm=None):
        if target_elm is None:
            return self.browser.find_elements_by_class_name(class_name)
        else:
            return target_elm.find_elements_by_class_name(class_name)

    def fxp(self, xpath, target_elm=None):
        if target_elm is None:
            return self.browser.find_element_by_xpath(xpath)
        else:
            return target_elm.find_element_by_xpath(xpath)

    def ftn(self, tag_name, target_elm=None):
        if target_elm is None:
            return self.browser.find_elements_by_tag_name(tag_name)
        else:
            return target_elm.find_elements_by_tag_name(tag_name)

    def fid(self, id, target_elm=None):
        if target_elm is None:
            return self.browser.find_element_by_id(id)
        else:
            return target_elm.find_element_by_id(id)

    def copy_input(self, xpath, input):
        pyperclip.copy(input)
        self.browser.find_element_by_xpath(xpath).click()
        ActionChains(self.browser).key_down(Keys.CONTROL).send_keys(
            'v').key_up(Keys.CONTROL).perform()
        time.sleep(1)

    def scroll_to_end(self):
        SCROLL_PAUSE_SEC = 3
        last_height = self.browser.execute_script("return document.body.scrollHeight")
        while True:
            self.browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(SCROLL_PAUSE_SEC)
            new_height = self.browser.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

    def open_new_tag(self,url):
        self.browser.execute_script("window.open('');")
        self.browser.switch_to.window(self.browser.window_handles[1])
        self.browser.get(url)

    def close_new_tab(self):
        self.browser.close()
        self.browser.switch_to.window(self.browser.window_handles[0])
