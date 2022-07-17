from selenium import webdriver
import time

url = 'https://place.map.kakao.com/8603402'
driver = webdriver.Chrome("/Users/leeinho/PycharmProjects/pythonProject/chromedriver")
driver.get(url)
time.sleep(2)

while True:
    try:
        time.sleep(2)
        btn = driver.find_element('xpath', '//*[@id="mArticle"]/div[4]/div[2]/a/span[1]')
        if btn.text == '리뷰 접기':
            break
        else:
            btn.click()
    except:
        break
lists = driver.find_elements('xpath', '//*[@id="mArticle"]/div[4]/div[2]/ul/li')
arr = [0 for _ in range(12)]

for i in lists:
    item = i.find_element('xpath', 'span[1]/span[3]').text
    item = int(item.split(".")[1])
    arr[item-1] += 1

print(arr)
driver.close()
