from selenium import webdriver
import matplotlib.pyplot as plt
import numpy as np
from matplotlib import rc
import time

url = 'https://map.naver.com/v5/entry/place/15896039?c=14286569.2890653,4210057.9169119,13,0,0,0,dh&placePath=%2Freview%2Fugc&entry=plt'
driver = webdriver.Chrome("/Users/leeinho/PycharmProjects/pythonProject/chromedriver")
driver.get(url)
time.sleep(2)
driver.switch_to.frame('entryIframe')

while True:
    try:
        time.sleep(2)
        btn = driver.find_element('xpath', '//*[@id="app-root"]/div/div/div/div[7]/div/div[2]/div[2]/a').click()
    except:
        break

lists = driver.find_elements('xpath', '//*[@id="app-root"]/div/div/div/div[7]/div/div[2]/div/ul/li')
arr = [0 for _ in range(12)]

for i in lists:
    item = i.find_element('xpath', 'a/div[1]/span[3]/span').text
    item = int(item.split(" ")[1][:-1])
    arr[item-1] += 1

driver.close()
rc('font', family='AppleGothic')

plt.rcParams['axes.unicode_minus'] = False
x = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
plt.bar(np.arange(len(arr)), arr)
plt.xticks(np.arange(len(arr)), x)
plt.title("title")
plt.xlabel("월")
plt.ylabel("리뷰 수")
plt.show()