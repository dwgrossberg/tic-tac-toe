

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

const gameFlow = (() => {
    let marker;
    let markerVS;
    let player1;
    let player2;
    const setPlayers = () => {
        const playerA = document.getElementById('player-a');
        const playerB = document.getElementById('player-b');
        const players = [playerA, playerB];
        players.forEach(player => player.addEventListener('mousedown', () => {
            if (marker === undefined) {
                marker = player.innerText;
                if (marker === 'X') {
                    markerVS = 'O';
                } else {
                    markerVS = 'X';
                }
                player1 = Player(marker);
                player2 = Player(markerVS);
                console.log(marker, player1, player2);
            }
        }, {once : true}));
    }

    return {
        setPlayers,
        marker,
        player1,
        player2
    }
    // determine winners and losers and where to point them
})();

gameFlow.setPlayers();

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

            if (gamePieceID % 2 === 0) {
                gameBoard.inputMove(gameFlow.marker, gamePieceID);
                div.innerText = gameBoard.gameboardArray[gamePieceID - 1];
            } else {
                gameBoard.inputMove('O', gamePieceID);
                div.innerText = gameBoard.gameboardArray[gamePieceID - 1];
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



