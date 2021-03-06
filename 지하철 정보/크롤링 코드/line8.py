import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
import datetime

driver=webdriver.Chrome('C:/Users/suzie/Downloads/chromedriver_win32/chromedriver.exe')     #크롬드라이버 깔고 chromedriver.exe위치 이것처럼 써넣어야함

dt = datetime.datetime.now()
filename = '8호선' + dt.strftime("%Y_%m_%d")
f = open(filename + '.csv', 'w', encoding='cp949')

station_name_final=[]
facil_list_final=[]
station_num=[]

for i in range(11,28):                                  #종착부터 천호역, 길동에서 상일동, 둔촌동에서 마천, 마지막 강동(갈림길)
    url='https://place.map.kakao.com/SES28'+str(i)
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
    if i<9:
        st="80"+str(i+1)
        f.write(station_num[i]+","+station_name_final[i]+","+facil_list_final[count]+","+facil_list_final[count+1]+","+facil_list_final[count+2]+","+facil_list_final[count+3]+","+st+"\n")
        count=count+4
    else:
        st="8"+str(i+1)
        f.write(station_num[i]+","+station_name_final[i]+","+facil_list_final[count]+","+facil_list_final[count+1]+","+facil_list_final[count+2]+","+facil_list_final[count+3]+","+st+"\n")
        count=count+4

driver.close()
