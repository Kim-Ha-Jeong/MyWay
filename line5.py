#pip install selenium 해야함
#5호선인데 아직 갈라지는 부분? 그 올공가는 방향이랑 다른방향으로 갈라지는 거 안했음..ㅎㅎ

import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver

driver=webdriver.Chrome('C:/Users/suzie/Downloads/chromedriver_win32/chromedriver.exe')     #크롬드라이버 깔고 chromedriver.exe위치 이것처럼 써넣어야함
for i in range(11,49):
    url='https://place.map.kakao.com/SES25'+str(i)
    driver.get(url)
    time.sleep(3)

    station = driver.find_elements_by_css_selector(".tit_station")
    station_name=station[0].text.split('선')

    facil_list=driver.find_element_by_class_name("list_sfacility").find_elements_by_tag_name("li")
    
    for i in range(len(station_name)-1,len(station_name)):
        print('<역이름: ',station_name[i],'>','\n')
  
    for facil in facil_list:
        print(facil.text+'\n\n')
    