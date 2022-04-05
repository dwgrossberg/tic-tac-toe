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
            console.log('you win');
        } else if (check[3] !== '' && check[3] === check[4] && check[4] === check[5]) {
            console.log('you win');
        } else if (check[6] !== '' && check[6] === check[7] && check[7] === check[8]) {
            console.log('you win');
        } else if (check[0] !== '' && check[0] === check[3] && check[3] === check[6]) {
            console.log('you win');
        } else if (check[1] !== '' && check[1] === check[4] && check[4] === check[7]) {
            console.log('you win');
        } else if (check[2] !== '' && check[2] === check[5] && check[5] === check[8]) {
            console.log('you win');
        } else if (check[0] !== '' && check[0] === check[4] && check[4] === check[8]) {
            console.log('you win');
        } else if (check[2] !== '' && check[2] === check[4] && check[4] === check[6]) {
            console.log('you win');
        } else {
            console.log('no winner yet');
        }
 
    
    }
    

    return {
        checkForWinner
        
        
    }
})();

const displayController = (() => {
    const gameBoardDOM = document.getElementById('game-board');
    const displayToDOM = () => {
        for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            let gamePiece = document.createElement('div');
            gamePiece.classList.add('game-piece');
            gamePiece.dataset.id = `${i + 1}`
            gamePiece.innerText = gameBoard.gameBoardArray[i];
            gameBoardDOM.appendChild(gamePiece);
        }
    }
    const addMark = () => {
        const gamePieces = document.getElementsByClassName('game-piece');
        let counter = 0;
        Array.from(gamePieces).forEach(div => div.addEventListener('mousedown', () => {
            let gamePieceID = div.dataset.id;
            if (counter % 2 === 0 && div.innerText === '') {
                gameBoard.inputMove(player1.marker, gamePieceID);
                div.innerText = gameBoard.gameBoardArray[gamePieceID - 1];
                counter++;
                console.log(counter);
            } else if (counter % 2 !== 0 && div.innerText === '') {
                gameBoard.inputMove(player2.marker, gamePieceID);
                div.innerText = gameBoard.gameBoardArray[gamePieceID - 1];
                counter++;
                console.log(counter);

            }
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

const player1 = Player('O');
const player2 = Player('X');

