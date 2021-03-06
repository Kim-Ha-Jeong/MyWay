import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
import datetime

driver=webdriver.Chrome('C:/Users/suzie/Downloads/chromedriver_win32/chromedriver.exe')     #크롬드라이버 깔고 chromedriver.exe위치 이것처럼 써넣어야함

dt = datetime.datetime.now()
filename = '분당선' + dt.strftime("%Y_%m_%d")
f = open(filename + '.csv', 'w', encoding='cp949')

station_name_final=[]
facil_list_final=[]
station_num=[]

url='https://place.map.kakao.com/SES23M213' 
driver.get(url)
time.sleep(3)

station = driver.find_elements_by_css_selector(".tit_station")
station_name=station[0].text.split('선',1)

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

for i in range(46,51):       #왕십리부터 선정릉역까지
    url='https://place.map.kakao.com/SES18'+str(i) 
    driver.get(url)
    time.sleep(3)

    station = driver.find_elements_by_css_selector(".tit_station")
    station_name=station[0].text.split('선',1)

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

for i in range(23,29):          #선릉부터 대모산입구역까지
    url='https://place.map.kakao.com/SES10'+str(i)
    driver.get(url)
    time.sleep(3)

    station = driver.find_elements_by_css_selector(".tit_station")
    station_name=station[0].text.split('선',1)

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

for i in range(30,32):          #수서부터 복정역까지
    url='https://place.map.kakao.com/SES10'+str(i)
    driver.get(url)
    time.sleep(3)

    station = driver.find_elements_by_css_selector(".tit_station")
    station_name=station[0].text.split('선',1)

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

for i in range(51,74):       #가천대부터 수원역까지
    url='https://place.map.kakao.com/SES18'+str(i) 
    driver.get(url)
    time.sleep(3)

    station = driver.find_elements_by_css_selector(".tit_station")
    station_name=station[0].text.split('선',1)

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
    if i<9:
        f.write(station_num[i]+","+station_name_final[i]+","+facil_list_final[count]+","+facil_list_final[count+1]+","+facil_list_final[count+2]+","+facil_list_final[count+3]+","+"B0"+str(i+1)+","+"\n")
        count=count+4
    else:
        f.write(station_num[i]+","+station_name_final[i]+","+facil_list_final[count]+","+facil_list_final[count+1]+","+facil_list_final[count+2]+","+facil_list_final[count+3]+","+"B"+str(i+1)+","+"\n")
        count=count+4
driver.close()
