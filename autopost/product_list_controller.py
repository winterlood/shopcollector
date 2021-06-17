import requests
from bs4 import BeautifulSoup
import re
import traceback
import os
now_path = os.path.dirname(os.path.realpath(__file__))

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36"
}

def get_product_list_by_condition(keyword,price_minimum,review_minimum):
    REQUEST = dict()

    resultList = []
    extract_idx = 1
    # 키워드별 상품 검색
    try:
        for idx in range(1, 17):
            url = f"""https://www.coupang.com/np/search?q={keyword}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page={idx}&rocketAll=false&searchIndexingToken=1=4&backgroundColor="""
            result = requests.get(url, headers=headers)
            soup_obj = BeautifulSoup(result.content, "html.parser")
            div = soup_obj.findAll("div", {"class": "name"})
            lis = soup_obj.find("ul", {"id": "productList"}).findAll("li")

            for li in lis:
                try:
                    product = li.find("div", {"class": "name"})
                    price = li.find("em", {"class": "sale"}).find(
                        "strong", {"class": "price-value"}
                    )
                    price_text = re.sub(
                        '[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]', '', price.text.strip())

                    if int(price_minimum) > int(price_text):
                        continue

                    link = f"""https://www.coupang.com{li.find("a")["href"]}"""
                    detail_result = requests.get(link, headers=headers)
                    detail_soup_obj = BeautifulSoup(detail_result.content, "html.parser")
                    review_count = detail_soup_obj.find(
                        'span', {"class": 'count'}).get_text().split('개')[0]
                    review_count = re.sub(
                        '[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]', '', review_count)
                    if int(review_minimum) > int(review_count):
                        continue

                    # print("PRODUCT : \t" + product.text.strip() +
                    #     "\n" + "PRICE : \t" + price.text.strip())
                    # print("REVIEW : \t", review_count)

                    print(f'>>> {extract_idx}개 추출완료 ...')
                    extract_idx = extract_idx+1
                    resultList.append(link)
                except Exception as e:
                    print(e)


                # 조건에 맞는 상품임
                # REQUEST['coupangUrls'] = []
                # REQUEST['coupangUrls'].append(link)
                # cupangPatnersController = CupangPatnersController()
                # response = cupangPatnersController.get_cupang_link(REQUEST)
                # res_data = response['data']
                # for data_item in res_data:
                #     short_url = data_item['shortenUrl']
                #     print("LINK : \t", short_url)
                #     resultList.append(short_url)
                # print('\n')



    except Exception:
        traceback.print_exc()
        pass
    finally:
        return resultList
