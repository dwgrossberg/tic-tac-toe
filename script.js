const gameBoard = (() => {
    let gameBoardArray = ['', '', '', '', '', '', '', '', '']
    const inputMove = (marker, space) => {
        gameBoardArray[space - 1] = marker;
        console.log(gameBoardArray);
        gameFlow.checkForWinner();
    };

    return {
        inputMove,
        gameBoardArray
    };
})();

const gameFlow = (() => {
    const checkForWinner = () => {
        const check = gameBoard.gameBoardArray;
        if (check[0] !== '' && check[0] === check[1] && check[1] === check[2]) {
            whoIsWinner(check[0]);
        } else if (check[3] !== '' && check[3] === check[4] && check[4] === check[5]) {
            whoIsWinner(check[3]);
        } else if (check[6] !== '' && check[6] === check[7] && check[7] === check[8]) {
            whoIsWinner(check[6]);
        } else if (check[0] !== '' && check[0] === check[3] && check[3] === check[6]) {
            whoIsWinner(check[0]);
        } else if (check[1] !== '' && check[1] === check[4] && check[4] === check[7]) {
            whoIsWinner(check[1]);
        } else if (check[2] !== '' && check[2] === check[5] && check[5] === check[8]) {
            whoIsWinner(check[2]);
        } else if (check[0] !== '' && check[0] === check[4] && check[4] === check[8]) {
            whoIsWinner(check[0]);
        } else if (check[2] !== '' && check[2] === check[4] && check[4] === check[6]) {
            whoIsWinner(check[2]);
        // } else if () {

        } else {
            console.log('no winner yet');
        }
 
    }

    const whoIsWinner = (gamePiece) => {
        if (gamePiece === player1.marker) {
            alert(player1.name + ' wins!');
            displayController.clearBoard();
        } else {
            alert(player2.name + ' wins!');
            displayController.clearBoard();
        }
    }
    

    return {
        checkForWinner
        
    }
})();

const displayController = (() => {
    const displayToDOM = () => {
        for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            const gameBoardDOM = document.getElementById('game-board');
            let gamePiece = document.createElement('div');
            gamePiece.classList.add('game-piece');
            gamePiece.dataset.id = `${i + 1}`
            gamePiece.innerText = gameBoard.gameBoardArray[i];
            gameBoardDOM.appendChild(gamePiece);
        }
    }
    const gamePieces = document.getElementsByClassName('game-piece');
    const addMark = () => {
        let counter = 0;
        Array.from(gamePieces).forEach(div => div.addEventListener('mousedown', () => {
            let gamePieceID = div.dataset.id;
            if (counter % 2 === 0 && div.innerText === '') {
                gameBoard.inputMove(player1.marker, gamePieceID);
                div.innerText = gameBoard.gameBoardArray[gamePieceID - 1];
                counter++;
            } else if (counter % 2 !== 0 && div.innerText === '') {
                gameBoard.inputMove(player2.marker, gamePieceID);
                div.innerText = gameBoard.gameBoardArray[gamePieceID - 1];
                counter++;
            }
        }));
    }

    const clearBoard = () => {
        for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            gameBoard.gameBoardArray[i] = '';
        };
        Array.from(gamePieces).forEach(div => {
            div.innerText = '';
        });
        console.log(gameBoard.gameBoardArray);
    }

    return {
        displayToDOM,
        addMark,
        clearBoard
    }
})();

displayController.displayToDOM();
displayController.addMark();

const Player = (gamePiece) => {
   const marker = gamePiece;
   const name = `Player ${gamePiece}`; 

    return {
        marker,
        name
    };
};

const player1 = Player('O');
const player2 = Player('X');

