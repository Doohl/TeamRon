import json
import mysql.connector
import socketserver
import random
from http.server import BaseHTTPRequestHandler
from flask import Flask, request
from flask_restful import Resource, Api
from json import dumps
from flask.ext.jsonpify import jsonify

app = Flask(__name__)
api = Api(app)

''' backend to database (sql) '''
mydb = mysql.connector.connect(
    host = "52.20.44.43",
    user = "admin",
    passwd = "best,ron1",
    database = "ron_db"
)

mycursor = mydb.cursor()

class Lot:
    def __init__ (self, name, rows, rowmax, available):
        self.__name = name
        self.__rows=rows
        self.__rowmax = rowmax
        self.Available = available
        '''for x in range(0, self.__rows):
            rowSpotsTaken.append(0)'''

        
def getLotData(lotName):
    query = "select * from park where lot_name = '" + lotName + "';"
    mycursor.execute(query)
    myresult = mycursor.fetchall()
    count = 0
    avail = []
    for i in myresult:
        count = count +1
        rowmax = i[3]
        avail.append(i[2])
    return (count, rowmax, avail)

def updateStatus(Lname, Rnum, Free):

    
    if(Free):
        query = "update park set available = available - 1 where lot_name = '" + Lname + "' and row_number = " + Rnum + ';'
        mycursor.execute(query)

    else:
        query = "update park set available = available + 1 where lot_name = '" + Lname + "' and row_number = " + Rnum + ';'
        mycursor.execute(query)

from random import randint

def populateTable():
    query = "select count(*) from park;"
    mycursor.execute(query)
    total = mycursor.fetchall()
    for i in range(total):
        query = "update park set available = " + randint(1,5)*2 + "where lot_name in ('A','B','C','D','F','G','H','I','J','N');" 

''' get request for frontend '''
def wait():
    print ("test")

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        wait()

        self.send_response(200)
        
        app.run(port='8080')


class data(Resource):
    def workpath(p):
        p = p.split("&")
        type = int(p[0][-1])
        if type == 1:
            LName = p[1].split('=')[1]
            lot_name = LName
            rows, rowmax, available = getLotData(lot_name)
            return {'rows' : rows, 'rowmax' : rowmax, 'available' : available}

        

        else:
            Lname = p[1].split('=')[1]
            Rnum = p[2].split('=')[1]
            Free = p[3].split('=')[1]
            updateStatus(Lname, Rnum, Free)

api.add_resource(data, '/parkingdata')


if __name__ == "__main__":
    '''lot_name = "A"
    rows, rowmax, available = getLotData(lot_name)
    print(rows, rowmax,available)'''
    httpd = socketserver.TCPServer(("", 8080), MyHandler)
    httpd.serve_forever()
    obj = Lot(lot_Name,rows,rowmax,available)
    populateTable()
    


'''need to make backend, includes class and functions for backend to work
also need to connect our backend to database & backend to frontend
but apparently it is easy cuz python lol.
convert python to json (backend to frontend) example:
# a Python object (dict):
x = {
  "name": "John",
  "age": 30,
  "city": "New York"
}
# convert into JSON:
y = json.dumps(x)
# the result is a JSON string:
print(y)'''
