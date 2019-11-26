import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
import datetime

driver=webdriver.Chrome('C:/Users/kha03/chromedriver.exe')     #크롬드라이버 깔고 chromedriver.exe위치 이것처럼 써넣어야함

dt = datetime.datetime.now()
filename = '신분당선' + dt.strftime("%Y_%m_%d")
f = open(filename + '.csv', 'w', encoding='cp949')

station_name_final=[]
facil_list_final=[]

for i in range(1,7):       #강남부터 정자역까지
    url='https://place.map.kakao.com/SES340'+str(i) 
    driver.get(url)
    time.sleep(3)

    station = driver.find_elements_by_css_selector(".tit_station")
    station_name=station[0].text.split('선',1)

    facil_list=driver.find_element_by_class_name("list_sfacility").find_elements_by_tag_name("li")
    
    for i in range(1,2):
        print('<역이름: ',station_name[i],'>','\n')
        station_name_final.append(station_name[i])
  
    for facil in facil_list:
        print(facil.text+'\n\n')
        facil_list_final.append(facil.text)

url='https://place.map.kakao.com/SES34M179' #미금역 
driver.get(url)
time.sleep(3)

station = driver.find_elements_by_css_selector(".tit_station")
station_name=station[0].text.split('선',1)

facil_list=driver.find_element_by_class_name("list_sfacility").find_elements_by_tag_name("li")
    
for i in range(1,2):
    print('<역이름: ',station_name[i],'>','\n')
    station_name_final.append(station_name[i])
  
for facil in facil_list:
    print(facil.text+'\n\n')
    facil_list_final.append(facil.text)


for i in range(7,13):          #동천부터 광교역까지
    if i<10:
        url='https://place.map.kakao.com/SES340'+str(i)
    else:
        url='https://place.map.kakao.com/SES34'+str(i)
    
    driver.get(url)
    time.sleep(3)

    station = driver.find_elements_by_css_selector(".tit_station")
    station_name=station[0].text.split('선',1)

    facil_list=driver.find_element_by_class_name("list_sfacility").find_elements_by_tag_name("li")
    
    for i in range(1,2):
        print('<역이름: ',station_name[i],'>','\n')
        station_name_final.append(station_name[i])
  
    for facil in facil_list:
        print(facil.text+'\n\n')
        facil_list_final.append(facil.text)

count=0
for i in range(len(station_name_final)):
    f.write(station_name_final[i]+","+facil_list_final[count]+","+facil_list_final[count+1]+","+facil_list_final[count+2]+","+facil_list_final[count+3]+"\n")
    count=count+4

driver.close()
