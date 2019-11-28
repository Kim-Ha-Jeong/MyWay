import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
import datetime

driver=webdriver.Chrome('C:/Users/suzie/Downloads/chromedriver_win32/chromedriver.exe')     #크롬드라이버 깔고 chromedriver.exe위치 이것처럼 써넣어야함

dt = datetime.datetime.now()
filename = '4호선' + dt.strftime("%Y_%m_%d")
f = open(filename + '.csv', 'w', encoding='cp949')

station_name_final=[]
facil_list_final=[]
station_num=[]

for i in range(9,35):       #당고개부터 남태령역까지
    if i<10:
        url='https://place.map.kakao.com/SES040'+str(i)
    else:
        url='https://place.map.kakao.com/SES04'+str(i) 
    driver.get(url)
    time.sleep(3)

    station = driver.find_elements_by_css_selector(".tit_station")
    station_name=station[0].text.split('호선',1)

    facil_list=driver.find_element_by_class_name("list_sfacility").find_elements_by_tag_name("li")
    for i in range(0,1):
        print('호선명: ',station_name[i],'\n')
        station_num.append(station_name[i])
    
    for i in range(1,2):
        print('<역이름: ',station_name[i],'>','\n')
        station_name_final.append(station_name[i])
  
    for facil in facil_list:
        print(facil.text+'\n\n')
        facil_list_final.append(facil.text)


for i in range(50,59):          #선바위부터 금정역까지
    url='https://place.map.kakao.com/SES14'+str(i)
    driver.get(url)
    time.sleep(3)

    station = driver.find_elements_by_css_selector(".tit_station")
    station_name=station[0].text.split('호선',1)

    facil_list=driver.find_element_by_class_name("list_sfacility").find_elements_by_tag_name("li")

    for i in range(0,1):
        print('호선명: ',station_name[i],'\n')
        station_num.append(station_name[i])
    
    for i in range(1,2):
        print('<역이름: ',station_name[i],'>','\n')
        station_name_final.append(station_name[i])

    for facil in facil_list:
        print(facil.text+'\n\n')
        facil_list_final.append(facil.text)


url='https://place.map.kakao.com/SES1751'       #산본
driver.get(url)
time.sleep(3)

station = driver.find_elements_by_css_selector(".tit_station")
station_name=station[0].text.split('호선',1)

facil_list=driver.find_element_by_class_name("list_sfacility").find_elements_by_tag_name("li")

for i in range(0,1):
    print('호선명: ',station_name[i],'\n')
    station_num.append(station_name[i])
    
for i in range(1,2):
    print('<역이름: ',station_name[i],'>','\n')
    station_name_final.append(station_name[i])

for facil in facil_list:
    print(facil.text+'\n\n')
    facil_list_final.append(facil.text)

url='https://place.map.kakao.com/SES1763'       #수리산
driver.get(url)
time.sleep(3)

station = driver.find_elements_by_css_selector(".tit_station")
station_name=station[0].text.split('호선',1)

facil_list=driver.find_element_by_class_name("list_sfacility").find_elements_by_tag_name("li")

for i in range(0,1):
    print('호선명: ',station_name[i],'\n')
    station_num.append(station_name[i])
    
for i in range(1,2):
    print('<역이름: ',station_name[i],'>','\n')
    station_name_final.append(station_name[i])

for facil in facil_list:
    print(facil.text+'\n\n')
    facil_list_final.append(facil.text)

for i in range(52,63):          #대야미부터 오이도역까지
    url='https://place.map.kakao.com/SES17'+str(i)
    driver.get(url)
    time.sleep(3)

    station = driver.find_elements_by_css_selector(".tit_station")
    station_name=station[0].text.split('호선',1)

    facil_list=driver.find_element_by_class_name("list_sfacility").find_elements_by_tag_name("li")

    for i in range(0,1):
        print('호선명: ',station_name[i],'\n')
        station_num.append(station_name[i])
    
    for i in range(1,2):
        print('<역이름: ',station_name[i],'>','\n')
        station_name_final.append(station_name[i])

    for facil in facil_list:
        print(facil.text+'\n\n')
        facil_list_final.append(facil.text)

count=0
for i in range(len(station_name_final)):
    f.write(station_num[i]+","+station_name_final[i]+","+facil_list_final[count]+","+facil_list_final[count+1]+","+facil_list_final[count+2]+","+facil_list_final[count+3]+"\n")
    count=count+4

driver.close()
