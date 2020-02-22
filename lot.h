#pragma once
#include <iostream>
#include <string>
#include <stdlib.h>
#include <vector>
#include <time.h>

using namespace std;
class Lot
{
private:
	string lotName;
	int rows; //number of rows
	int rowMax; //max amount of cars per row, assuming each row has uniform size
	vector<int> rowCurrent; //spots open in current row
	vector<vector<bool>> isOccupied; //if spot is occupied

public:
	Lot(string name, int rows, int rowMax); //constructor for empty slot
	Lot(string name, int rows, int rowMax, int rowCurrent); //constructor for including slots already filled

	int spotsRemainingRow(); //return spots in row
	int spotsRemaningLot(); //return spots in lot

	void randomFill();
	void generateLot();

	void incrementRowCurrent();
	void decrimentRowCurrent();


};

