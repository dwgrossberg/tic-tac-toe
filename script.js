

const gameBoard = (() => {
    let gameboardArray = ['', '', '', '', '', '', '', '', '']
    const inputMove = (marker, space) => {
        gameboardArray[space - 1] = marker;
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
            gamePiece.classList.add('game-piece');
            gamePiece.dataset.id = `${i + 1}`
            gamePiece.innerText = gameBoard.gameboardArray[i];
            gameBoardDOM.appendChild(gamePiece);
        }
    }
    const addMark = () => {
        const gamePieces = document.getElementsByClassName('game-piece');
        Array.from(gamePieces).forEach(div => div.addEventListener('mousedown', () => {
            let gamePieceID = div.dataset.id;
            gameBoard.inputMove('O', gamePieceID);
            div.innerText = gameBoard.gameboardArray[gamePieceID - 1];
        }));
    }

    return {
        displayToDOM,
        addMark
    }

})();

displayController.displayToDOM();
displayController.addMark();

const Player = (name) => {
    const marker = name;
    
    return {
        marker
    };
};

const X = Player('X');
const O = Player('O');
console.log(X.marker);
console.log(O.marker);

