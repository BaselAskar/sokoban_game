
/*   This is the base file for the Sokoban assignment - include this one in your HTML page, before you add the main script file*/

/*   Enum of CSS Classes for the static elements   */
var Tiles = {
    Wall: "tile-wall",
    Space: "tile-space",
    Goal: "tile-goal"
};

/*   Enum of CSS Classes for the moving elements   */
var Entities = {
    Character: "entity-player",
    Block: "entity-block",
    BlockDone: "entity-block-goal"
};

/*  Legend
    W = Wall
    B = Movable block
    P = Player starting position
    G = Goal area for the blocks
*/
var tileMap01 = {
    width: 19,
    height: 16,
    mapGrid: [
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], ['B'], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], ['W'], ['W'], ['W'], [' '], [' '], ['B'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], ['W'], [' '], [' '], ['B'], [' '], ['B'], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [['W'], ['W'], ['W'], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
    [['W'], [' '], [' '], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
    [['W'], [' '], ['B'], [' '], [' '], ['B'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], ['G'], ['G'], ['W']],
    [['W'], ['W'], ['W'], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], [' '], ['W'], ['P'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
    [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
    [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']]
    ]
};

let isWin = false;

const gameBord = document.getElementById('game-bord');
const plp = {
    x: 11,
    y: 11,
}


const buildMap = function(bord,mapGrid){
    bord.innerHTML = '';

    for (let x=0;x < mapGrid.length;x++){
        for (let y=0;y < mapGrid[x].length;y++){
            const html = `
                <div class='${mapGrid[x][y].join(' ')}'></div>
            `;
    
            bord.insertAdjacentHTML('beforeend',html);
        }
    }

}


buildMap(gameBord,tileMap01.mapGrid);


const move = function(pPos,nextPos,afterNextPos){
    // const arrUp = tileMap01.mapGrid[plp.x][plp.y - 1];
    if (nextPos.includes('W') || 
    (nextPos.includes('B') && (afterNextPos.includes('W') || afterNextPos.includes('B')))
    ){
        throw 'STOP';
    }


    if (pPos.length > 1){
        pPos.pop();
    }
    else{
        pPos[0] = ' ';
    }


    
    if (nextPos.includes('B')){
        if (afterNextPos.includes(' ')){
            afterNextPos[0] = 'B';
        }
        else{
            afterNextPos.push('B');
        }
        
        nextPos[nextPos.indexOf('B')] = 'P';
    }
    else {
        if (nextPos.includes(' ')){
            nextPos[0] = 'P';
        }
        else{
            nextPos.push('P');
        }
    }

    

    buildMap(gameBord,tileMap01.mapGrid);

    
}


window.addEventListener('keydown',(e) => {

    if (isWin) return;

    let pPosArr,nextPosArr,afterNextPosArr;


    switch(e.key){
        case 'ArrowUp':
            pPosArr = tileMap01.mapGrid[plp.x][plp.y];
            nextPosArr = tileMap01.mapGrid[plp.x - 1][plp.y];
            afterNextPosArr = tileMap01.mapGrid[plp.x - 2][plp.y];
            try{
                move(pPosArr,nextPosArr,afterNextPosArr);
                plp.x -= 1;
            }
            catch(m){

            }
            break;

        case 'ArrowDown':
            pPosArr = tileMap01.mapGrid[plp.x][plp.y];
            nextPosArr = tileMap01.mapGrid[plp.x + 1][plp.y];
            afterNextPosArr = tileMap01.mapGrid[plp.x + 2][plp.y];
            try{
                move(pPosArr,nextPosArr,afterNextPosArr);
                plp.x += 1;
            }
            catch(m){

            }
            break;

        case 'ArrowLeft':
            pPosArr = tileMap01.mapGrid[plp.x][plp.y];
            nextPosArr = tileMap01.mapGrid[plp.x][plp.y - 1];
            afterNextPosArr = tileMap01.mapGrid[plp.x][plp.y - 2];
            try{
                move(pPosArr,nextPosArr,afterNextPosArr);
                plp.y -= 1;
            }
            catch(m){

            }
            break;

        case 'ArrowRight':
            pPosArr = tileMap01.mapGrid[plp.x][plp.y];
            nextPosArr = tileMap01.mapGrid[plp.x][plp.y + 1];
            afterNextPosArr = tileMap01.mapGrid[plp.x][plp.y + 2];
            try{
                move(pPosArr,nextPosArr,afterNextPosArr);
                plp.y += 1;
            }
            catch(m){

            }
            break;

        default:
            break;
    }
});


// window.removeEventListener('keydown');

