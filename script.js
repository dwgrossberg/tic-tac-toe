

const gameBoard = (() => {
    let gameboardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const inputMove = (marker, space) => {
        gameboardArray[space] = marker;
        console.log(gameboardArray);
    };

    return {
        inputMove,
        gameboardArray
    };
})();

gameBoard.inputMove('X', 5);

const gameFlow = (() => {
    // determine winners and losers and where to point them
})();

const displayController = (() => {
    const gameBoardDOM = document.getElementById('game-board');
    const displayToDOM = () => {
        for (let i = 0; i < gameBoard.gameboardArray.length; i++) {
            let gamePiece = document.createElement('div');
            gamePiece.innerText = gameBoard.gameboardArray[i];
            gameBoardDOM.appendChild(gamePiece);
        }
    }

    return {
        displayToDOM
    }

})();

displayController.displayToDOM();

const Player = (name) => {
    const marker = () => {
        console.log(`Your marker is ${name}`);
    };
    
    return {
        marker
    };
};

const X = Player('X');
const O = Player('O');
X.marker();
O.marker();

