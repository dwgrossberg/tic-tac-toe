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
        } else if (check[0] !== '' && check[1] !== '' && check[2] !== '' && check[3] !== '' && check[4] !== '' && check[5] !== '' && check[6] !== '' && check[7] !== ''  && check[8] !== '') {
            whoIsWinner('tie');
        } else {
            console.log('no winner yet');
        }
 
    }
    let player1Score = 0;
    let player2Score = 0;
    const whoIsWinner = (gamePiece) => {
        if (gamePiece === 'tie') {
            console.log('Tie game!');
            displayController.displayWinner('tie');
        } else if (gamePiece === player1.marker) {
            displayController.displayWinner(player1.marker);
            player1Score += 1;
            displayController.updateScore(player1Score, player2Score);
            console.log(player1.name + ' wins!', player1Score);
        } else {
            displayController.displayWinner(player2.marker);
            player2Score += 1;
            displayController.updateScore(player1Score, player2Score);
            console.log(player2.name + ' wins!', player2Score);
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
            updateScore(0, 0);
        }
    }
    const gamePieces = document.getElementsByClassName('game-piece');
    let counter = 0;
    const addGamePiece = (e) => {
        let gamePiece = e.target;
        let gamePieceID = e.target.dataset.id;
        let img = document.createElement('img');
        if (counter % 2 === 0 && gamePiece.innerText === '') {
            gameBoard.inputMove(player1.marker, gamePieceID);
            img.src = player1.icon;
            gamePiece.appendChild(img);
            counter++;
        } else if (counter % 2 !== 0 && gamePiece.innerText === '') {
            gameBoard.inputMove(player2.marker, gamePieceID);
            img.src = player2.icon;
            gamePiece.appendChild(img);
            counter++;
        }
    }
    const addMark = () => {
        Array.from(gamePieces).forEach(div => div.addEventListener('mousedown', addGamePiece));
    }
    const updateScore = (player1Score, player2Score) => {
        const player1ScoreDOM = document.getElementById('score1');
        const player2ScoreDOM = document.getElementById('score2');
        player1ScoreDOM.innerText = player1Score;
        player2ScoreDOM.innerText = player2Score;
    }
    const displayWinner = (winner) => {
        gameBoardDOM.classList.add(winner);
        Array.from(gamePieces).forEach(div => div.removeEventListener('mousedown', addGamePiece));
        window.addEventListener('mousedown', clearBoard, {once : true})
    }
    const clearBoard = () => {
        window.addEventListener('mousedown', () => {
            let winner = gameBoardDOM.classList[0];
            gameBoardDOM.classList.remove(winner);
            for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
                gameBoard.gameBoardArray[i] = '';
            };
            Array.from(gamePieces).forEach(div => {
                div.innerText = '';
            });
            console.log(gameBoard.gameBoardArray);
            counter = 0;
            addMark();
        }, {once : true});
    }

    return {
        displayToDOM,
        addMark,
        displayWinner,
        updateScore
    }
})();

displayController.displayToDOM();
displayController.addMark();

const Player = (gamePiece) => {
    const marker = gamePiece;
    const name = `Player ${gamePiece}`;
    const icon = `img/Player${gamePiece}.png`;

    return {
        marker,
        name,
        icon
    };
};

const player1 = Player('O');
const player2 = Player('X');

