const data = {
    'A': [
        [1, 1, 20, 20],
        [1, 2, 5, 20],
        [1, 3, 20, 20],
        [1, 4, 16, 20],
        [1, 5, 20, 20],
        [2, 1, 5, 20],
        [2, 2, 20, 20],
        [2, 3, 1, 20],
        [2, 4, 12, 20],
        [2, 5, 20, 20],
        [3, 1, 20, 20],
        [3, 2, 5, 20],
        [3, 3, 20, 20],
        [3, 4, 16, 20],
        [3, 5, 20, 20],
        [4, 1, 5, 20],
        [4, 2, 20, 20],
        [4, 3, 1, 20],
        [4, 4, 12, 20],
        [4, 5, 20, 20]
    ],
    'B': [
        [1, 1, 20, 20],
        [1, 2, 5, 20],
        [1, 3, 2, 20],
        [1, 4, 16, 20],
        [1, 5, 19, 20],
        [2, 1, 5, 20],
        [2, 2, 3, 20],
        [2, 3, 1, 20],
        [2, 4, 0, 20],
        [2, 5, 0, 20],
        [3, 1, 0, 20],
        [3, 2, 5, 20],
        [3, 3, 20, 20],
        [3, 4, 14, 20],
        [3, 5, 20, 20]
    ],
    'C': [
        [1, 1, 20, 20],
        [1, 2, 5, 20],
        [1, 3, 4, 20],
        [1, 4, 16, 20],
        [1, 5, 20, 20],
        [2, 1, 18, 20],
        [2, 2, 20, 20],
        [2, 3, 1, 20],
        [2, 4, 0, 20],
        [2, 5, 0, 20],
        [3, 1, 4, 20],
        [3, 2, 15, 20],
        [3, 3, 19, 20],
        [3, 4, 2, 20],
        [3, 5, 4, 20],
        [4, 1, 0, 20],
        [4, 2, 0, 20],
        [4, 3, 0, 20],
        [4, 4, 0, 20],
        [4, 5, 0, 20],
        [5, 1, 0, 20],
        [5, 2, 0, 20],
        [5, 3, 1, 20],
        [5, 4, 2, 20],
        [5, 5, 2, 20],
        [5, 5, 17, 20],
        [6, 5, 11, 20]
    ],
    'D': [
        [1, 1, 0, 20],
        [1, 2, 20, 20],
        [1, 3, 20, 20],
        [1, 4, 11, 20],
        [1, 5, 0, 20],
        [2, 1, 3, 20],
        [2, 2, 1, 20],
        [2, 3, 7, 20],
        [2, 4, 3, 20],
        [2, 5, 3, 20],
        [3, 1, 7, 20],
        [3, 2, 20, 20],
        [3, 3, 13, 20],
        [3, 4, 2, 20],
        [3, 5, 0, 20]
    ],
    'F': [
        [1, 1, 0, 20],
        [1, 2, 0, 20],
        [1, 3, 0, 20],
        [1, 4, 0, 20],
        [1, 5, 1, 20],
        [2, 1, 2, 20],
        [2, 2, 0, 20],
        [2, 3, 0, 20],
        [2, 4, 0, 20],
        [2, 5, 3, 20],
        [3, 1, 0, 20],
        [3, 2, 1, 20],
        [3, 3, 0, 20],
        [3, 4, 0, 20],
        [3, 5, 7, 20]
    ],
    'G': [
        [1, 1, 5, 20],
        [1, 2, 5, 20],
    ],
    'H': [
        [1, 1, 3, 20],
        [1, 2, 0, 20],
        [1, 3, 1, 20],
        [1, 4, 16, 20],
        [1, 5, 20, 20],
        [2, 1, 7, 20],
        [2, 2, 5, 20],
        [2, 3, 2, 20],
        [2, 4, 2, 20],
        [2, 5, 3, 20],
        [3, 1, 9, 20],
        [3, 2, 1, 20],
        [3, 3, 0, 20]
    ],
    'N': [
        [1, 1, 0, 20],
        [1, 2, 2, 20],
        [1, 3, 1, 20],
        [1, 4, 4, 20],
        [1, 5, 4, 20],
        [2, 1, 8, 20],
        [2, 2, 9, 20],
        [2, 3, 10, 20],
        [2, 4, 0, 20],
        [2, 5, 0, 20],
        [3, 1, 0, 20],
        [3, 2, 16, 20],
        [3, 3, 7, 20],
        [3, 4, 10, 20],
        [3, 5, 12, 20]
    ],
};

var currentLot = 'A';
var displayHolder;
var currentReserve;

const changeLot = newLot => {
    currentLot = newLot;

    // displayHolder.innerHTML = ``;

    redrawLot();

    ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'N'].forEach(lot => {
        if(lot == newLot)
            document.querySelector(`.lot-nav[data-lot=${lot}]`).classList.add('active');
        else
            document.querySelector(`.lot-nav[data-lot=${lot}]`).classList.remove('active');
    });
}

const assembleNav = () => {
    let div = document.createElement('div');
    div.id = 'lot-nav-box';
    
    ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'N'].forEach(lot => {
        const navDiv = document.createElement('div');
        navDiv.innerText = lot;

        navDiv.classList.add('lot-nav');
        navDiv.dataset.lot = lot;
        navDiv.onclick = event => {
            changeLot(event.target.dataset.lot);
        };

        if(lot == currentLot) {
            navDiv.classList.add('active');
        }

        div.appendChild(navDiv);
    });

    return div;
};

async function getSlotData(parkingLot) {
    console.log(`http://54.197.36.101:8080/pdata/type=1&lot=${currentLot}`);
    let response = await fetch(`http://54.197.36.101:8080/pdata/type=1&lot=${currentLot}`, {
        method: 'GET',
        mode: 'no-cors'
    });
    console.log(response);
    return response.json();
}

async function redrawLot () {

    //let retrieved = await getSlotData();
    // let max = retrieved.rowmax;
    // data[currentLot] = [];
    // for(let i = 0; i < retrieved.available; ++i) {
    //     data[currentLot].push([1, 1, retrieved.available[i], max]);
    // }

    let oldRows = document.getElementsByClassName('parking-row');
    while(oldRows.length) {
        oldRows[0].remove();
    }

    let rows = data[currentLot];
    if(!rows) return;
    for(var row of rows) {
        
        let rowEle = document.createElement('div');
        rowEle.classList.add('parking-row');
        
        let takenEle = document.createElement('div');
        let freeEle = document.createElement('div');

        takenEle.classList.add('taken');
        freeEle.classList.add('free');

        let coeff = row[2]/row[3];
        let freePercent = coeff * 100;
        let takenPercent = 100 - freePercent;

        if(row[3] - row[2] > 0) takenEle.innerHTML = `<div class='label'>${row[3] - row[2]}</div>`;
        if(row[2] > 0) freeEle.innerHTML = `<div class='label'>${row[2]}</div>`;

        takenEle.style.width = `${takenPercent}%`;
        freeEle.style.width = `${freePercent}%`;
        rowEle.appendChild(takenEle);
        rowEle.appendChild(freeEle);

        document.getElementById('parking-row-container').appendChild(rowEle);

        let rowCopy = row;
        rowEle.onclick = e => {
            if(rowCopy[2] <= 0) 
                return;
            if(currentReserve)
                currentReserve[2]++;
            // if(currentReserve == rowCopy) return;
            rowCopy[2]--;
            currentReserve = rowCopy;
            (async () => { 
                redrawLot();
            })();
        };
    }
}

document.addEventListener("DOMContentLoaded", function(){
    
    displayHolder = document.getElementById('main_display');
    
    const rowHolder = document.createElement('div');
    rowHolder.id = 'parking-row-container';
    displayHolder.appendChild(rowHolder);
    
    displayHolder.appendChild(assembleNav());

    (async () => { 
        redrawLot();
    })();
});