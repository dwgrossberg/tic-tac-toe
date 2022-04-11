

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
            player2Name.setAttribute('contenteditable', 'true');
            player2Name.style.border = 'dotted 1px #7A7375';
            player2Name.style.cursor = 'auto';
            
        } else if (oldName === 'Player CPU') {
            player2Name.innerText = newName;
            player2.name = newName;
            player2Name.removeAttribute('contenteditable');
            player2Name.style.border = 'solid 1px #7A7375';
            player2Name.style.cursor = 'not-allowed';
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
const playerCPU = Player('CPU');

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
    const check = gameBoard.gameBoardArray;
    const checkForWinner = () => {
        console.log('hi');
        if (check[0] !== '' && check[0] === check[1] && check[1] === check[2]) {
            whoIsWinner(check[0]);
            displayController.displayWinningPieces(0, 1, 2);
            return true;
        } else if (check[3] !== '' && check[3] === check[4] && check[4] === check[5]) {
            whoIsWinner(check[3]);
            displayController.displayWinningPieces(3, 4, 5);
            return true;
        } else if (check[6] !== '' && check[6] === check[7] && check[7] === check[8]) {
            whoIsWinner(check[6]);
            displayController.displayWinningPieces(6, 7, 8);
            return true;
        } else if (check[0] !== '' && check[0] === check[3] && check[3] === check[6]) {
            whoIsWinner(check[0]);
            displayController.displayWinningPieces(0, 3, 6);
            return true;
        } else if (check[1] !== '' && check[1] === check[4] && check[4] === check[7]) {
            whoIsWinner(check[1]);
            displayController.displayWinningPieces(1, 4, 7);
            return true;
        } else if (check[2] !== '' && check[2] === check[5] && check[5] === check[8]) {
            whoIsWinner(check[2]);
            displayController.displayWinningPieces(2, 5, 8);
            return true;
        } else if (check[0] !== '' && check[0] === check[4] && check[4] === check[8]) {
            whoIsWinner(check[0]);
            displayController.displayWinningPieces(0, 4, 8);
            return true;
        } else if (check[2] !== '' && check[2] === check[4] && check[4] === check[6]) {
            whoIsWinner(check[2]);
            displayController.displayWinningPieces(2, 4, 6);
            return true;
        } else if (check[0] !== '' && check[1] !== '' && check[2] !== '' && check[3] !== '' && check[4] !== '' && check[5] !== '' && check[6] !== '' && check[7] !== ''  && check[8] !== '') {
            whoIsWinner('tie');
            return true;
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
            console.log(player1Score, player2Score);
            player1Score += 1;
            displayController.displayWinner(player1.marker);
            displayController.updateScore(player1Score, player2Score);
            console.log(player1.name + ' wins!', player1Score);
        } else if (gamePiece === player2.marker) {
            console.log(player1Score, player2Score);
            player2Score += 1;
            displayController.displayWinner(player2.marker);
            displayController.updateScore(player1Score, player2Score);
            console.log(player2.name + ' wins!', player2Score);
        } else if (gamePiece === playerCPU.marker) {
            console.log(player1Score, player2Score);
            player2Score += 1;
            displayController.displayWinner(playerCPU.marker);
            displayController.updateScore(player1Score, player2Score);
            console.log(playerCPU.name + ' wins!', player2Score);
        } 
    }
    const resetScore = () => {
        player1Score = 0;
        player2Score = 0;
    }
    const cpuGamePlay = () => {
        let randomMove = Math.floor(Math.random()*gameBoard.gameBoardArray.length);
        console.log(randomMove);
        for (let i = 0; i < 100; i++) {
            if (gameBoard.gameBoardArray[randomMove] !== '') {
                console.log('CPU roll again');
                randomMove = Math.floor(Math.random()*gameBoard.gameBoardArray.length);
                console.log(randomMove);
            } 
        }
        let gamePieces = document.querySelectorAll('div[data-id]');
        let gamePiece = gamePieces[randomMove];
        gameBoard.inputMove(playerCPU.marker, randomMove + 1);
        let img = document.createElement('img');
        img.src = playerCPU.icon;
        gamePiece.appendChild(img);
        }
        
    

    return {
        checkForWinner,
        resetScore,
        cpuGamePlay
    }
})();

const displayController = (() => {
    const gameBoardDOM = document.getElementById('game-board');
    const displayToDOM = () => {
        player1.setName('Player O', 'Player O');
        player2.setName('Player CPU', 'Player CPU');
        updateScore(0, 0);
        for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            let gamePiece = document.createElement('div');
            gamePiece.classList.add('game-piece');
            gamePiece.dataset.id = `${i + 1}`
            gamePiece.innerText = gameBoard.gameBoardArray[i];
            gameBoardDOM.appendChild(gamePiece);
        }
    }
    // Game setup for 1-player mode
    const gamePieces = document.getElementsByClassName('game-piece');
    let cpuCounter = 0;
    const cpuGameDisplay = () => {
        if (cpuCounter % 2 === 0) {
            stopMarking();
            addCPUMark();
            cpuCounter++;
        } else if (cpuCounter % 2 !== 0) {
            stopCPUMarking();
            addMark();
            cpuCounter++;
        }
    }
    const addCPUGamePiece = (e) => {
        let gamePiece = e.target;
        let gamePieceID = e.target.dataset.id;
        let img = document.createElement('img');
        console.log(gameBoard.gameBoardArray[gamePiece.dataset.id - 1]);
        if (gameBoard.gameBoardArray[gamePiece.dataset.id - 1] === '') {
            gameBoard.inputMove(player1.marker, gamePieceID);
            img.src = player1.icon;
            gamePiece.appendChild(img);
            if (gameFlow.checkForWinner() !== true) {
                gameFlow.cpuGamePlay();  
            } 
        }
    } 

    // Game setup for 2-player mode
    let counter = 0;
    const addGamePiece = (e) => {
        let gamePiece = e.target;
        let gamePieceID = e.target.dataset.id;
        let img = document.createElement('img');
        if (counter % 2 === 0 && gameBoard.gameBoardArray[gamePiece.dataset.id - 1] === '') {
            gameBoard.inputMove(player1.marker, gamePieceID);
            img.src = player1.icon;
            gamePiece.appendChild(img);
            counter++;
        } else if (counter % 2 !== 0 && gameBoard.gameBoardArray[gamePiece.dataset.id - 1] === '') {
            gameBoard.inputMove(player2.marker, gamePieceID);
            img.src = player2.icon;
            gamePiece.appendChild(img);
            counter++;
        }
    }
    const addMark = () => {
        Array.from(gamePieces).forEach(div => div.addEventListener('mousedown', addGamePiece));
    }
    const stopMarking = () => {
        Array.from(gamePieces).forEach(div => div.removeEventListener('mousedown', addGamePiece));
    }
    const addCPUMark = () => {
        Array.from(gamePieces).forEach(div => div.addEventListener('mousedown', addCPUGamePiece));
    }
    const stopCPUMarking = () => {
        Array.from(gamePieces).forEach(div => div.removeEventListener('mousedown', addCPUGamePiece));
    }
    const updatePlayerName = () => {
        const player1Name = document.getElementById('player-O-name');
        const player2Name = document.getElementById('player-X-name');
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
    let player2Icon;
    const playerCPUIcon = document.getElementById('player-CPU-icon');
    const player1IconOptions = document.getElementById('player-O-icon-options');
    const player2IconOptions = document.getElementById('player-X-icon-options');
    const updatePlayerIcon = () => {        
        const player1IconImgs = document.getElementsByClassName('player-O-icon-imgs');
        const player2IconImgs = document.getElementsByClassName('player-X-icon-imgs');
        // Add pop-up window to display new icon options
        player1Icon.addEventListener('mousedown', () => {
            if (player1IconOptions.style.opacity === '') {
                player1IconOptions.style.opacity = '1';
                player1IconOptions.style.pointerEvents = 'auto';     
            } else {
                player1IconOptions.style.opacity = '';
                player1IconOptions.style.pointerEvents = 'none';     
            }
        });
        playerCPUIcon.addEventListener('mousedown', (e) => {
            if (e.target.id === 'player-X-icon') {
                if (player2IconOptions.style.opacity === '') {
                    player2IconOptions.style.opacity = '1';
                    player2IconOptions.style.pointerEvents = 'auto';     
                } else {
                    player2IconOptions.style.opacity = '';
                    player2IconOptions.style.pointerEvents = 'none';     
                }
            }
        });
    
        // Update the Player object with new icon value
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
    // Display the winner of each game
    const container = document.getElementById('container');
    const r = document.querySelector(':root');
    const pWinner = document.createElement('p');
    const pClickAnywhere = document.createElement('p');
    pWinner.setAttribute('id', 'p-winner');
    pClickAnywhere.setAttribute('id', 'p-click-anywhere');
    pClickAnywhere.innerText = '(click anywhere to play again)';
    const displayWinner = (winner) => {
        const winnerDiv = document.getElementById('winner');
        if (winner === 'O') {
            pWinner.innerText = player1.name + ' wins!';
            container.style.backgroundImage = 'url(' + player1.icon + ')';
            r.style.setProperty('--game-board-color', '#D3D2D4');
        } else if (winner === 'X') {
            pWinner.innerText = player2.name + ' wins!';
            container.style.backgroundImage = 'url(' + player2.icon + ')';
            r.style.setProperty('--game-board-color', '#D3D2D4');
        } else if (winner === 'CPU') {
            pWinner.innerText = playerCPU.name + ' wins!';
            container.style.backgroundImage = 'url(' + playerCPU.icon + ')';
            r.style.setProperty('--game-board-color', '#D3D2D4');
        } else if (winner === 'tie') {
            pWinner.innerText = 'Tie game!';
            container.style.backgroundImage = 'url(img/tie.png)';            
        }
        winnerDiv.appendChild(pWinner);
        winnerDiv.appendChild(pClickAnywhere);
        stopMarking();
        window.addEventListener('mousedown', clearBoard, {once : true})
    }
    // Highlight the winning pieces' moves
    const displayWinningPieces = (piece1, piece2, piece3) => {
        Array.from(gamePieces).forEach(piece => {
            if (piece.dataset.id === String(piece1 + 1) || piece.dataset.id === String(piece2 + 1) || piece.dataset.id === String(piece3 + 1)) {
                piece.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            } else {
                // piece.style.opacity = '.25';
                piece.style.backgroundColor = 'rgba(122, 115, 117, .75)';
            }
        });
    }
    const clearGamePieces = () => {
        for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            gameBoard.gameBoardArray[i] = '';
        };
        Array.from(gamePieces).forEach(div => {
            div.innerText = '';
        });
    }
    const clearBoard = () => {
        window.addEventListener('mousedown', () => {
            r.style.setProperty('--game-board-color', '#8638A8');
            pWinner.remove();
            pClickAnywhere.remove();
            clearGamePieces();
            Array.from(gamePieces).forEach(piece => {
                piece.style.opacity = '1';
                piece.style.backgroundColor = '';
            });
            console.log(gameBoard.gameBoardArray);
            container.classList.remove('tie');
            container.style.backgroundImage = '';
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
            player1IconOptions.style.opacity = '';
            player2IconOptions.style.opacity = '';
            playTypeButton.checked = false;
            player1.setName('Player O', 'Player O');
            player2.setName('Player CPU', 'Player CPU');
            player1.icon = 'img/PlayerO.png';
            player1Icon.src = 'img/PlayerO.png';
            player2.icon = 'img/PlayerX.png';
            playerCPUIcon.src = 'img/PlayerCPU.png';
        });
    }
    const playTypeButton = document.getElementById('checkbox');
    const changePlayType = () => {
        playTypeButton.addEventListener('change', () => {
            if (playTypeButton.checked === true) {
                clearGamePieces();
                gameFlow.resetScore();
                updateScore(0, 0);
                player1IconOptions.style.opacity = '';
                player2IconOptions.style.opacity = '';  
                console.log('2-player');
                player2.setName('Player X', 'Player X');
                playerCPUIcon.setAttribute('id', 'player-X-icon');
                player2Icon = document.getElementById('player-X-icon');
                player2Icon.style.cursor = 'pointer';
                player2Icon.src = player2.icon;
                player2Icon.style.pointerEvents = 'auto';     
                cpuGameDisplay();
            }
            else {
                clearGamePieces();     
                gameFlow.resetScore();
                updateScore(0, 0);         
                player1IconOptions.style.opacity = '';
                player2IconOptions.style.opacity = ''; 
                console.log('1-player');
                player2.setName('Player CPU', 'Player CPU');
                playerCPUIcon.src = playerCPU.icon;
                playerCPUIcon.classList.add('playerCPU');
                playerCPUIcon.style.pointerEvents = 'none';   
                player2IconOptions.style.pointerEvents = 'none';
                cpuGameDisplay();
            }
        });
    }

    return {
        displayToDOM,
        cpuGameDisplay,
        addMark,
        displayWinner,
        displayWinningPieces,
        updateScore,
        updatePlayerName,
        updatePlayerIcon,
        reset,
        changePlayType
    }
})();

displayController.displayToDOM('Player CPU');
displayController.cpuGameDisplay();
displayController.reset();
displayController.updatePlayerName();
displayController.updatePlayerIcon();
displayController.changePlayType();


