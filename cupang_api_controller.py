import requests
import time

import hmac
import hashlib
import binascii
import os
import requests
import json
import os

now_path = os.path.dirname(os.path.realpath(__file__))
file = open(f'{now_path}\\metadata\\setting.json',
            'r', encoding='utf-8')
config_dict = json.load(file)

print(config_dict)
REQUEST_METHOD = "POST"
DOMAIN = "https://api-gateway.coupang.com"
URL = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink"
ACCESS_KEY = config_dict["CUPANG_ACCESS_KEY"]
SECRET_KEY = config_dict["CUPANG_SECRET_KEY"]
class CupangPatnersController():
    def __init__(self):
        self.ACCESS_KEY = ACCESS_KEY
        self.SECRET_KEY = SECRET_KEY
        self.authorization = self.generateHmac(REQUEST_METHOD, URL)


    def get_category_product_list(self,categoryid):
        bodyDict = dict()
        bodyDict['limit']=30
        bodyDict['subId']='shopcollector'

        url = f"https://api-gateway.coupang.com/v2/providers/affiliate_open_api/apis/openapi/products/bestcategories/{str(categoryid)}?limit=50"
        authorization =  self.generateHmac('GET', url)
        response =  requests.request(method="GET", url=url,
                                    headers={
                                        "Authorization": authorization,
                                        "Content-Type": "application/json"
                                    },
        )
        print(response)
        result = json.loads(response.text)
        print(result)
        return result


    def get_cupang_link(self,REQUEST):
        url = "{}{}".format(DOMAIN, URL)
        response = requests.request(method=REQUEST_METHOD, url=url,
                                    headers={
                                        "Authorization": self.authorization,
                                        "Content-Type": "application/json"
                                    },
                                    data=json.dumps(REQUEST)
                                    )
        result = json.loads(response.text)
        return result

    def generateHmac(self,method, url):
        path, *query = url.split("?")
        dateGTM = time.strftime('%y%m%d',time.gmtime())
        timeGTM = time.strftime('%H%M%S',time.gmtime())

        datetime = dateGTM + 'T' + timeGTM + 'Z'
        message = datetime + method + path + (query[0] if query else "")

        signature = hmac.new(bytes(self.SECRET_KEY, "utf-8"),
                            message.encode("utf-8"),
                            hashlib.sha256).hexdigest()

        return "CEA algorithm=HmacSHA256, access-key={}, signed-date={}, signature={}".format(self.ACCESS_KEY, datetime, signature)

