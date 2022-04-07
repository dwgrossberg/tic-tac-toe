

const Player = (gamePiece) => {
    const marker = gamePiece;
    const name = `Player ${gamePiece}`;
    const player1Name = document.getElementById('player-O-name');
    const player2Name = document.getElementById('player-X-name');
    const setName = (newName, oldName) => {
        if (oldName === 'Player O') {
            player1Name.innerText = newName;
            player1.name = newName;
        } else if (oldName === 'Player X') {
            player2Name.innerText = newName;
            player2.name = newName;
        }
    }
    const updatePlayerName = (newName, oldName) => {
        if (oldName === 'Player O') {
            player1.name = newName;
            console.log(oldName + ' updated Player name to ' + newName);
        } else if (oldName === 'Player X') {
            player2.name = newName;
            console.log(oldName + ' updated Player name to ' + newName);
        }
    }
    const icon = `img/Player${gamePiece}.png`;

    return {
        marker,
        name,
        setName,
        updatePlayerName,
        icon
    };
};

const player1 = Player('O');
const player2 = Player('X');



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
    const resetScore = () => {
        player1Score = 0;
        player2Score = 0;
    }
    

    return {
        checkForWinner,
        resetScore
    }
})();

const displayController = (() => {
    const gameBoardDOM = document.getElementById('game-board');
    const displayToDOM = () => {
        player1.setName('Player O', 'Player O');
        player2.setName('Player X', 'Player X');
        updateScore(0, 0);
        for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            let gamePiece = document.createElement('div');
            gamePiece.classList.add('game-piece');
            gamePiece.dataset.id = `${i + 1}`
            gamePiece.innerText = gameBoard.gameBoardArray[i];
            gameBoardDOM.appendChild(gamePiece);
        }
    }
    const gamePieces = document.getElementsByClassName('game-piece');
    let counter = 0;
    const addGamePiece = (e) => {
        let gamePiece = e.target;
        let gamePieceID = e.target.dataset.id;
        let img = document.createElement('img');
        if (counter % 2 === 0 && !gamePiece.firstChild) {
            gameBoard.inputMove(player1.marker, gamePieceID);
            img.src = player1.icon;
            gamePiece.appendChild(img);
            counter++;
        } else if (counter % 2 !== 0 && !gamePiece.firstChild) {
            gameBoard.inputMove(player2.marker, gamePieceID);
            img.src = player2.icon;
            gamePiece.appendChild(img);
            counter++;
        }
    }
    const addMark = () => {
        Array.from(gamePieces).forEach(div => div.addEventListener('mousedown', addGamePiece));
    }
    const updatePlayerName = () => {
        const player1Name = document.getElementById('player-O-name');
        const player2Name = document.getElementById('player-X-name');
        const playerNames = [player1Name, player2Name];        
        // mutation observer to watch for changes to playerNames
        const config = { characterData: true, attributes: true, childList: true, subtree: true };
        const callback = function(mutationsList, observer) {
            for(const mutation of mutationsList) {
                console.log(mutation.target.parentNode.id, mutation.target.textContent);
                if (mutation.target.parentNode.id === 'player-O-name') {
                    player1.updatePlayerName(mutation.target.textContent, 'Player O');
                } else if (mutation.target.parentNode.id === 'player-X-name') {
                    player1.updatePlayerName(mutation.target.textContent, 'Player X');
                }
            }
        }
        const observer = new MutationObserver(callback);
        observer.observe(player1Name, config);
        observer.observe(player2Name, config);
    }
    const player1Icon = document.getElementById('player-O-icon');
    const player2Icon = document.getElementById('player-X-icon');
    const updatePlayerIcon = () => {
        const player1IconOptions = document.getElementById('player-O-icon-options');
        const player2IconOptions = document.getElementById('player-X-icon-options');
        const player1IconImgs = document.getElementsByClassName('player-O-icon-imgs');
        const player2IconImgs = document.getElementsByClassName('player-X-icon-imgs');
        // Add pop-up window to display new icon options
        player1Icon.addEventListener('mousedown', () => {
            if (player1IconOptions.style.opacity === '') {
                player1IconOptions.style.opacity = '1';
            } else {
                player1IconOptions.style.opacity = '';
            }
        });
        player2Icon.addEventListener('mousedown', () => {
            if (player2IconOptions.style.opacity === '') {
                player2IconOptions.style.opacity = '1';
            } else {
                player2IconOptions.style.opacity = '';
            }
        });
        // Update the Player object new icon value
        Array.from(player1IconImgs).forEach(img => img.addEventListener('mousedown', () => {
            let newSrc = img.src;
            img.src = player1.icon;
            player1.icon = newSrc;
            player1Icon.src = newSrc;
            player1IconOptions.style.opacity = '';
        }));
        Array.from(player2IconImgs).forEach(img => img.addEventListener('mousedown', () => {
            let newSrc = img.src;
            img.src = player2.icon;
            player2.icon = newSrc;
            player2Icon.src = newSrc;
            player2IconOptions.style.opacity = '';
        }));

    }
    const updateScore = (player1Score, player2Score) => {
        const player1ScoreDOM = document.getElementById('score1');
        const player2ScoreDOM = document.getElementById('score2');
        player1ScoreDOM.innerText = player1Score;
        player2ScoreDOM.innerText = player2Score;
    }
    const header = document.getElementById('header');
    const pWinner = document.createElement('p');
    pWinner.setAttribute('id', 'p-winner');
    const displayWinner = (winner) => {
        const winnerDiv = document.getElementById('winner');
        gameBoardDOM.classList.add(winner);
        if (winner === 'O') {
            pWinner.innerText = player1.name + ' wins!';
            header.style.backgroundImage = 'url(' + player1.icon + ')';
        } else if (winner === 'X') {
            pWinner.innerText = player2.name + ' wins!';
            header.style.backgroundImage = 'url(' + player2.icon + ')';
        } else if (winner === 'tie') {
            pWinner.innerText = 'Tie game!';
            header.style.backgroundImage = 'url(img/tie.png)';            
        }
        winnerDiv.appendChild(pWinner);
        Array.from(gamePieces).forEach(div => div.removeEventListener('mousedown', addGamePiece));
        window.addEventListener('mousedown', clearBoard, {once : true})
    }
    const clearBoard = () => {
        window.addEventListener('mousedown', () => {
            console.log(gameBoardDOM.classList[0], gameBoardDOM.classList[1]);
            gameBoardDOM.classList.remove(gameBoardDOM.classList[0], gameBoardDOM.classList[1]);
            pWinner.remove();
            for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
                gameBoard.gameBoardArray[i] = '';
            };
            Array.from(gamePieces).forEach(div => {
                div.innerText = '';
            });
            console.log(gameBoard.gameBoardArray);
            header.classList.remove('tie');
            counter = 0;
            addMark();
        }, {once : true});
    }
    const reset = () => {
        const resetDOM = document.getElementById('reset');
        resetDOM.addEventListener('mousedown', () => {
            gameFlow.resetScore();
            updateScore(0, 0);
            clearBoard();
            header.style.backgroundImage = '';
            player1.setName('Player O', 'Player O');
            player2.setName('Player X', 'Player X');
            player1.icon = 'img/PlayerO.png';
            player1Icon.src = 'img/PlayerO.png';
            player2.icon = 'img/PlayerX.png';
            player2Icon.src = 'img/PlayerX.png';
        });
    }

    return {
        displayToDOM,
        addMark,
        displayWinner,
        updateScore,
        updatePlayerName,
        updatePlayerIcon,
        reset
    }
})();

displayController.displayToDOM();
displayController.addMark();
displayController.reset();
displayController.updatePlayerName();
displayController.updatePlayerIcon();























