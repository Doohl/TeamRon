const data = {
    'A': [
    //     [1, 1, 20, 20],
    //     [1, 2, 5, 20],
    //     [1, 3, 20, 20],
    //     [1, 4, 16, 20],
    //     [1, 5, 20, 20],
    //     [2, 1, 5, 20],
    //     [2, 2, 20, 20],
    //     [2, 3, 1, 20],
    //     [2, 4, 12, 20],
    //     [2, 5, 20, 20],
    //     [3, 1, 20, 20],
    //     [3, 2, 5, 20],
    //     [3, 3, 20, 20],
    //     [3, 4, 16, 20],
    //     [3, 5, 20, 20],
    //     [4, 1, 5, 20],
    //     [4, 2, 20, 20],
    //     [4, 3, 1, 20],
    //     [4, 4, 12, 20],
    //     [4, 5, 20, 20]
    ]
};

var currentLot = 'A';
var displayHolder;

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
    let response = await fetch(`http://54.197.36.101:8080/type=1&lot=${currentLot}`);
    return response.json();
}

async function redrawLot () {

    let retrieved = await getSlotData();
    let max = retrieved.rowmax;
    data[currentLot] = [];
    for(let i = 0; i < retrieved.available; ++i) {
        data[currentLot].push([1, 1, retrieved.available[i], max]);
    }

    let oldRows = document.getElementsByClassName('parking-row');
    while(oldRows.length) {
        oldRows[0].remove();
    }

    let rows = data[currentLot];
    if(!rows) return;
    rows.forEach(row => {
        
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
    });
}

document.addEventListener("DOMContentLoaded", function(){
    
    displayHolder = document.getElementById('main_display');
    
    const rowHolder = document.createElement('div');
    rowHolder.id = 'parking-row-container';
    displayHolder.appendChild(rowHolder);
    
    displayHolder.appendChild(assembleNav());

    (async () => { 
        await redrawLot();
    })();
});