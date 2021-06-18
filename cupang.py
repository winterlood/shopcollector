import hmac
import hashlib
import binascii
import os
import time
import requests
import json
from time import gmtime, strftime

now_path = os.path.dirname(os.path.realpath(__file__))
file = open(f'{now_path}/metadata/setting.json',
            'r', encoding='utf-8')
config_dict = json.load(file)


ACCESS_KEY = config_dict["CUPANG_ACCESS_KEY"]
SECRET_KEY = config_dict["CUPANG_SECRET_KEY"]
 
def generateHmac(method, url, api_secret_key, api_access_key):
    path, *query = url.split('?')
    os.environ['TZ'] = 'GMT+0'
    dt_datetime = strftime('%y%m%d', gmtime()) + 'T' + strftime('%H%M%S', gmtime()) + 'Z'  # GMT+0
    msg = dt_datetime + method + path + (query[0] if query else '')
    signature = hmac.new(bytes(api_secret_key, 'utf-8'), msg.encode('utf-8'), hashlib.sha256).hexdigest()
 
    return 'CEA algorithm=HmacSHA256, access-key={}, signed-date={}, signature={}'.format(api_access_key, dt_datetime, signature)
 
def get_cuplink(linkList):
    subId='shopcollector'

    REQUEST = dict()
    REQUEST['coupangUrls'] = linkList
    REQUEST['subId'] = subId

    request_method = 'POST'
    domain = 'https://api-gateway.coupang.com'
    api_url = '/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink'    

    authorization = generateHmac(request_method, api_url, SECRET_KEY, ACCESS_KEY)
    coupang_url = '{}{}'.format(domain, api_url)
    response = requests.request(method=request_method,
                                url=coupang_url,
                                headers={'Authorization': authorization, 'Content-Type': 'application/json'},
                                data=json.dumps(REQUEST),
                                timeout=20
                                )
    print(response)
    print(response.text)
    # 쿠팡 API 호출[IF rCode]
    if (response.json()['rCode'] != '0'):
        print('쿠팡 API 호출 오류[' + str(response.json()['rCode']) + ']')
    
    # 쿠팡 API 호출[result_data]'
    result_data = response.json()['data']
    return result_data         
    

def cupang_search(categoryId,limit): 
    # 쿠팡 API 호출[url 설정]
    subId='shopcollector'
    request_method = 'GET'
    domain = 'https://api-gateway.coupang.com'
    api_url = '/v2/providers/affiliate_open_api/apis/openapi/v1/products/bestcategories/' + str(categoryId) + '?limit=' + str(limit)+'&subId='+str(subId)
    
    # 쿠팡 API 호출[response]
    authorization = generateHmac(request_method, api_url, SECRET_KEY, ACCESS_KEY)
    coupang_url = '{}{}'.format(domain, api_url)
    response = requests.request(method=request_method,
                                url=coupang_url,
                                headers={'Authorization': authorization, 'Content-Type': 'application/json'}
                                )
    
    # 쿠팡 API 호출[IF rCode]
    if (response.json()['rCode'] != '0'):
        print('쿠팡 API 호출 오류[' + str(response.json()['rCode']) + ']')
    
    # 쿠팡 API 호출[result_data]'
    result_data = response.json()['data']
    return result_data