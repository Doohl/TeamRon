const mockData = {
    'A': [
        [1, 1, true],
        [1, 2, true],
        [1, 3, true],
        [1, 4, true],
        [1, 5, true],
        [2, 1, true],
        [2, 2, true],
        [2, 3, true],
        [2, 4, true],
        [2, 5, true]
    ],
};


const assembleNav = () => {
    let div = document.createElement('div');
    div.id = 'lot-nav-box';
    
    ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'N'].forEach(lot => {
        const navDiv = document.createElement('div');
        navDiv.innerText = lot;

        navDiv.classList.add('lot-nav');
        navDiv.dataset.lot = lot;
        navDiv.onclick = event => {
            console.log('test');
        };

        div.appendChild(navDiv);
    });

    return div;
};

document.addEventListener("DOMContentLoaded", function(){

    console.log('test');
    
    const displayHolder = document.getElementById('main_display');
    
    displayHolder.appendChild(assembleNav());
});