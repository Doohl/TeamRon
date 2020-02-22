import json
import mysql.connector
import requests

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
        
    def updateAvailableAdd (self, row):
        self.Available[row-1] = self.Available[row-1]+1
    def updateAvailableSub (self, row):
        if(self.Available[row-1]!=0):
            self.Available[row-1] = self.Available[row-1]-1
        
def getLotData(lotName):
    query = "select * from park where lot_name = '" + lotName + "'"
    mycursor.execute(query)
    myresult = mycursor.fetchall()
    count = 0
    avail = []
    for i in myresult:
        count = count +1
        rowmax = i[3]
        avail.append(i[2])
    return (count, rowmax, avail)

''' get request for frontend '''
URL = "https://best-ron.s3.amazonaws.com/index.html"

r = requests.get(url = URL)

data = r.json()


if __name__ == "__main__":
    lot_name = "A"
    rows, rowmax, available = getLotData(lot_name)
    print(rows, rowmax,available)
    obj = Lot(lotName,rows,rowmax,available)
    


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
