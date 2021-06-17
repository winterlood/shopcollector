import time
import random
import json
import pyperclip
import time
import requests
import shutil
import re
import os
from bs4 import BeautifulSoup
import traceback
now_path = os.path.dirname(os.path.realpath(__file__))


# Custom Class
from cupang_api_controller import *

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36"
}

def get_price(soup):
    container = soup.find('span',{'class':'total-price'})
    return str(container.getText()).replace('\n','')

def get_delivery_kind(soup):
    badge_tag = soup.find('img',{'class','delivery-badge-img'})
    if badge_tag == None:
        return 'NONE'

    badge_image = badge_tag['src']
    if 'rocket-fresh' in badge_image:
        return 'ROCKET_FRESH'

    if 'rocket_logo' in badge_image:
        return 'ROCKET_BAESONG'

def get_shorten_link(target_link):
    time.sleep(2)
    cup_api_controller = CupangPatnersController()
    REQUEST = dict()
    REQUEST['coupangUrls'] = []
    REQUEST['coupangUrls'].append(target_link)
    response = cup_api_controller.get_cupang_link(REQUEST)
    res_data = response['data']
    for data_item in res_data:
        short_url = data_item['shortenUrl']
        return short_url
     

def get_product_detail_info(crawlList):
    result_list = []
    target_len = len(crawlList)
    for idx,target_link in enumerate(crawlList):
        try:
            print('\n')
            print(f">>> [{idx}/{target_len}] 추출 시작 ...")
            result = requests.get(target_link,headers=headers)
            soup = BeautifulSoup(result.content, "html.parser")

            product_title = str(soup.find('h2',{'class':'prod-buy-header__title'}).getText()).replace('\n','')

            product_image_row = str(soup.find('img',{'class':'prod-image__detail'})['src'])
            product_image = f'https:{product_image_row}'


            product_price = get_price(soup)

            product_delivery_kind = get_delivery_kind(soup)

            product_shorten_link = get_shorten_link(target_link)

            print(f">>>     상품명(PRODUCT_TITLE) : {product_title}")
            print(f">>>     상품이미지(PRODUCT_IMAGE) : {product_image}")
            print(f">>>     상품가격(PRODUCT_PRICE) : {product_price}")
            print(f">>>     상품배송유형(PRODUCT_DELIVERY_KIND) : {product_delivery_kind}")
            print(f">>>     상품단축링크(PRODUCT_SHORTEN_LINK) : {product_shorten_link}")
            cur_result_dict = dict()
            cur_result_dict['PRODUCT_TITLE'] = product_title
            cur_result_dict['PRODUCT_IMAGE'] = product_image
            cur_result_dict['PRODUCT_PRICE'] = product_price
            cur_result_dict['PRODUCT_DELIVERY_KIND'] = product_delivery_kind
            cur_result_dict['PRODUCT_SHORTEN_LINK'] = product_shorten_link

            result_list.append(cur_result_dict)
        except Exception as e:
            print(e)


    return result_list
        
      


# README !
# 아래(190번 Line)는 TEST 용 코드입니다.
# 통합 테스트중에는 반드시 190번 Line을 주석처리하거나, 삭제하시기 바랍니다.
# 현 파일 (product_detail_controller.py)를 직접 실행시켜 상품 정보 크롤러만의 동작을 확인하실 수 있습니다.
#
#  2021-03-06 @winterlood
# print("RUN!")
# get_product_detail_info(['https://www.coupang.com/vp/products/2250691647?vendorItemId=71832255380&sourceType=HOME_PERSONALIZED_ADS&searchId=feed-1616310826297-personalized_ads&isAddedCart=','https://www.coupang.com/vp/products/1745268794?itemId=2971748092&vendorItemId=70960158692&isAddedCart=','https://www.coupang.com/vp/products/261192458?itemId=816702952&vendorItemId=5077941266&sourceType=CAMPAIGN&campaignId=82&categoryId=115573&isAddedCart='])


