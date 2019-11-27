import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
import datetime

driver=webdriver.Chrome('C:/Users/장세영/Desktop/HG/chromedriver.exe')     #크롬드라이버 깔고 chromedriver.exe위치 이것처럼 써넣어야함

dt = datetime.datetime.now()
filename = '1호선' + dt.strftime("%Y_%m_%d")
f = open(filename + '.csv', 'w', encoding='cp949')

station_name_final=[]
facil_list_final=[]
station_num=[]

#서울역 ~ 동묘앞역
for i in range(0,10):                                
    url='https://place.map.kakao.com/SES015'+str(i)
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


#남영역 ~ 신도림역
for i in range(2,8):
    if(i<8): url='https://place.map.kakao.com/SES100'+str(i)
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

#회기역 ~ 창동역
for i in range(15,23):
    url='https://place.map.kakao.com/SES10'+str(i)
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

#구로역 ~ 광명역
for i in range(1,30):                                #지축역부터 오금역까지
    if(i<10) : url='https://place.map.kakao.com/SES170'+str(i)
    elif(i<30) : url='https://place.map.kakao.com/SES17'+str(i)
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

#봉명역 ~ 당정역
for i in range(32,39):                                #지축역부터 오금역까지
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


#개봉역 ~ 도원역
for i in range(1,18):                                #지축역부터 오금역까지
    if(i<10) : url='https://place.map.kakao.com/SES180'+str(i)
    else : url='https://place.map.kakao.com/SES18'+str(i)
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

#온수역 ~ 도화역
for i in range(21,24):                                #지축역부터 오금역까지
    url='https://place.map.kakao.com/SES18'+str(i)
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


#방학역 ~ 의정부역
for i in range(1,7):                                #지축역부터 오금역까지
    if(i<7) : url='https://place.map.kakao.com/SES190'+str(i)
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

#방학역 ~ 의정부역
for i in range(8,19):                                #지축역부터 오금역까지
    if(i<10) : url='https://place.map.kakao.com/SES190'+str(i)
    else : url='https://place.map.kakao.com/SES19'+str(i)
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