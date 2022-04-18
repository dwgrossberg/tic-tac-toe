

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
        gameBoardArray[space] = marker;
        console.log(gameBoardArray);
        gameFlow.checkForWinner();
    };

    return {
        inputMove,
        gameBoardArray
    };
})();

const gameFlow = (() => {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]    

    const checkWin = (board, player) => {
        let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winCombos.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = { index: index, player: player };
                break;
            }
        }
        return gameWon;
    }

    const emptySpaces = () => {
        return gameBoard.gameBoardArray.map((item, index) => {
            console.log(item, index);
            if (item.length < 1) {
                console.log(index);
                return index;
            } 
            }).filter(item => item || item === 0);
    }

    const checkTie = () => {
        if (emptySpaces().length == 0) {
            return true;
        }
        return false;
    }    

    const checkForWinner = () => {
        if (checkWin(gameBoard.gameBoardArray, player1.marker)) {
            whoIsWinner(player1.marker);
            displayController.displayWinningPieces(winCombos[checkWin(gameBoard.gameBoardArray, player1.marker).index]);
        } else if (checkWin(gameBoard.gameBoardArray, player2.marker)) {
            whoIsWinner(player2.marker);
            displayController.displayWinningPieces(winCombos[checkWin(gameBoard.gameBoardArray, player2.marker).index]);
        } else if (checkWin(gameBoard.gameBoardArray, playerCPU.marker)) {
            whoIsWinner(playerCPU.marker);
            displayController.displayWinningPieces(winCombos[checkWin(gameBoard.gameBoardArray, playerCPU.marker).index]);
        } else if (checkTie() === true) {
            whoIsWinner('tie');
        } else {
            console.log('No winner yet');
        }
    }

    let player1Score = 0;
    let player2Score = 0;

    const whoIsWinner = (gamePiece) => {
        if (gamePiece === 'tie') {
            console.log('Tie game!');
            displayController.displayWinner('tie');
        } else if (gamePiece === player1.marker) {
            player1Score += 1;
            displayController.displayWinner(player1.marker);
            displayController.updateScore(player1Score, player2Score);
            console.log(player1.name + ' wins!', player1Score);
        } else if (gamePiece === player2.marker) {
            player2Score += 1;
            displayController.displayWinner(player2.marker);
            displayController.updateScore(player1Score, player2Score);
            console.log(player2.name + ' wins!', player2Score);
        } else if (gamePiece === playerCPU.marker) {
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

    const randomMove = () => {
        let randomSpot = Math.floor(Math.random()*gameBoard.gameBoardArray.length);
        console.log('CPU random index: ' + randomSpot);
        for (let i = 0; i < 100; i++) {
            if (gameBoard.gameBoardArray[randomSpot] !== '') {
                console.log('CPU roll again');
                randomSpot = Math.floor(Math.random()*gameBoard.gameBoardArray.length);
                console.log('CPU random index: ' + randomSpot);
            } 
        }
        return randomSpot;
    }

    let turnCounter = 0;
    const resetTurnCounter = () => {
        turnCounter = 0;
    }

    const cpuGamePlay = () => {        
        const easyHardButton = document.getElementById('easy-hard-button');
        let gamePieces = document.querySelectorAll('div[data-id]');
        let gamePiece;
        if (easyHardButton.checked === true) {
            let smartMove = smartishCPU();
            console.log('smartCPU move index: ' + smartMove);
            gamePiece = gamePieces[smartMove];
            gameBoard.inputMove(playerCPU.marker, smartMove);
        } else {
            let randomSpot = randomMove();
            gamePiece = gamePieces[randomSpot];
            gameBoard.inputMove(playerCPU.marker, randomSpot);
        }
        let img = document.createElement('img');
        img.src = playerCPU.icon;
        gamePiece.appendChild(img);
        if (checkWin(gameBoard.gameBoardArray, playerCPU.marker) !== null || checkWin(gameBoard.gameBoardArray, player1.marker) !== null || checkTie() === true) {
            displayController.stopCPUMarking();
        }
    }

    const smartishCPU = () => {
        let newBoard = [];
        for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            if (gameBoard.gameBoardArray[i] === '') {
                newBoard.push(i);
            } else {
                newBoard.push(gameBoard.gameBoardArray[i]);
            }
        }
        
        let emptyMoves = emptySpaces();
        const boardCopy = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        console.log(emptyMoves);

        if (turnCounter === 0) {
            if (gameBoard.gameBoardArray[4] === '') {
                turnCounter++;
                return 4;
            } else if (gameBoard.gameBoardArray[0] === '' && gameBoard.gameBoardArray[4] !== '') {
                turnCounter++;
                return 0;
            }
        } else if (turnCounter >= 1) {
            for (index in emptyMoves) {
                console.log(emptyMoves[index]);
                let newBoard = [];
                for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
                    if (gameBoard.gameBoardArray[i] === '') {
                        newBoard.push(i);
                    } else {
                        newBoard.push(gameBoard.gameBoardArray[i]);
                    }
                }
                // run each marker through each empty space
                // check if there is a potential winner
                newBoard[emptyMoves[index]] = playerCPU.marker;
                console.log(emptyMoves[index], newBoard);

            }
            
        
            return randomMove();

        }
    }

    
    const smartCPU = () => {
        const winCombosCopy = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ]    
        let newBoard = [];
        for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            if (gameBoard.gameBoardArray[i] === '') {
                newBoard.push(i);
            } else {
                newBoard.push(gameBoard.gameBoardArray[i]);
            }
        }
        console.log('Turn counter: ' + turnCounter);
        let winSet = [];
        let map;
        // The first move is a simple if / else choice, with the cpu always playing second
        if (turnCounter === 0) {
            if (gameBoard.gameBoardArray[4] === '') {
                turnCounter++;
                return 4;
            } else if (gameBoard.gameBoardArray[0] === '' && gameBoard.gameBoardArray[4] !== '') {
                turnCounter++;
                return 0;
            }
        } else if (turnCounter >= 1) {
            // Loop through win combos to get winning sets
            for (let [index, win] of winCombosCopy.entries()) {
                console.log(index, win);
                // Loop through winning sets to get winning move indexes
                for (move in win) {
                    // Identify winning sets that contain a player's marker
                    if (typeof newBoard[win[move]] !== 'number') {
                        let winMove = {};
                        winMove.marker = newBoard[win[move]];
                        winMove.index = win[move];
                        winSet.push(winMove);
                    }
                    // Remove duplicate objects from the winSet array
                    let filtedWinSet = winSet.filter((tag, index, array) => array.findIndex(t => t.marker == tag.marker && t.index == tag.index) == index);
                    for (let i = 0; i < filtedWinSet.length; i++) {
                        // If filter win index matches a winning move, insert move to test win combos
                        if (filtedWinSet[i].index === win[move]) {
                            win[move]= filtedWinSet[i].marker;
                            if (winCombosCopy.some(elem => elem !== 'number')) {
                                console.log(win);
                                map = win.reduce(function(prev, cur) {
                                    prev[cur] = (prev[cur] || 0) + 1;
                                    return prev;
                                }, {});
                                // store the empty index numbers
                               
                                for (i in map) {
                                    console.log('index: ' + i);
                                    index = i;
                                }
                                

                                if (map.CPU === 2 && map.O === undefined) {
                                    // find the array item that is a number and return it as an index 
                                    let index = win.filter(i => typeof i === 'number');
                                    console.log('playerCPU 2', win, index[0]);
                                    return index[0];
                                } else if (map.O === 2 && map.CPU === undefined) {
                                    console.log(map.CPU);
                                    let index = win.filter(i => typeof i === 'number');
                                    console.log('playerO 2', win, index[0]);
                                    return index[0];
                                } else if (map.CPU === 1 && map.O === undefined) {
                                    let index = win.filter(i => typeof i === 'number');
                                    console.log('playerCPU 1 && playerO none', index);
                                    return index[0];
                                } else if (map.CPU === undefined && map.O === undefined) {
                                    console.log('open array', index);
                                    let index = win.filter(i => typeof i === 'number');
                                    return index[0];
                                }
                                  


                            }
                        }
                    }
                }
                
                
                
            }
            
            
            
            turnCounter++;
            return randomMove();
        }
    

    }
    

    function minimax(oldBoard, player) {
        let newBoard = [];
        for (let i = 0; i < oldBoard.length; i++) {
            if (oldBoard[i] === '') {
                newBoard.push(i + 1);
            } else {
                newBoard.push(oldBoard[i]);
            }
        }
        var availSpots = emptySquares();
    
        if (checkWin(newBoard, player1.marker)) {
            return { score: -10 };
        } else if (checkWin(newBoard, playerCPU.marker)) {
            return { score: 10 };
        } else if (availSpots.length === 0) {
            return { score: 0 };
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;
    
            if (player == playerCPU) {
                var result = minimax(newBoard, player1);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, playerCPU);
                move.score = result.score;
            }
    
            newBoard[availSpots[i]] = move.index;
    
            moves.push(move);
        }
    
        var bestMove;
        if (player === aiPlayer) {
            var bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
    
        return moves[bestMove];
    }

    return {
        checkForWinner,
        checkWin,
        checkTie,
        resetScore,
        resetTurnCounter,
        cpuGamePlay,
        emptySpaces
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
            gamePiece.innerText = '';
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
        gameFlow.emptySpaces();
        let gamePiece = e.target;
        let gamePieceID = e.target.dataset.id;
        let img = document.createElement('img');
        if (gameBoard.gameBoardArray[gamePiece.dataset.id - 1] === '') {
            gameBoard.inputMove(player1.marker, gamePieceID - 1);
            img.src = player1.icon;
            gamePiece.appendChild(img);
            if (gameFlow.checkWin(gameBoard.gameBoardArray, player1.marker) === null && gameFlow.checkTie() === false) {
                gameFlow.cpuGamePlay();
            } else {
                stopCPUMarking();
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
            gameBoard.inputMove(player1.marker, gamePieceID - 1);
            img.src = player1.icon;
            gamePiece.appendChild(img);
            counter++;
        } else if (counter % 2 !== 0 && gameBoard.gameBoardArray[gamePiece.dataset.id - 1] === '') {
            gameBoard.inputMove(player2.marker, gamePieceID - 1);
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
    const displayWinningPieces = (array) => {
        Array.from(gamePieces).forEach(piece => {
            if (piece.dataset.id === String(array[0] + 1) || piece.dataset.id === String(array[1] + 1) || piece.dataset.id === String(array[2] + 1)) {
                piece.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            } else {
                piece.style.backgroundColor = 'rgba(122, 115, 117, .75)';
            }
        });
    }

    const clearGamePieces = () => {
        gameFlow.resetTurnCounter();
        for (let i = 0; i < gameBoard.gameBoardArray.length; i++) {
            gameBoard.gameBoardArray[i] = '';
        };
        Array.from(gamePieces).forEach(div => {
            div.innerText = '';
        });
    }

    const playTypeButton = document.getElementById('play-type-button');

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
            if (playTypeButton.checked) {
                stopCPUMarking();
                addMark();  
            } else {
                stopMarking();
                addCPUMark();
            }
        }, {once : true});
    }

    const easyHard = document.getElementById('easy-hard');
    const easyHardButton = document.getElementById('easy-hard-button');
    const reset = () => {
        const resetDOM = document.getElementById('reset');
        resetDOM.addEventListener('mousedown', () => {
            gameFlow.resetScore();
            updateScore(0, 0);
            clearBoard();
            if (easyHardButton.checked === true) {
                easyHardButton.checked = false;
            }
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

    easyHardButton.addEventListener('change', () => {
        console.log('Hard mode activated');
        clearGamePieces();
        console.log(gameBoard.gameBoardArray);

    })

    const changePlayType = () => {
        playTypeButton.addEventListener('change', () => {
            if (playTypeButton.checked === true) {
                clearGamePieces();
                gameFlow.resetScore();
                updateScore(0, 0);
                player1IconOptions.style.opacity = '';
                player2IconOptions.style.opacity = '';
                easyHard.style.opacity = '0';
                easyHard.style.pointerEvents = 'none';
                console.log('2-player');
                player2.setName('Player X', 'Player X');
                playerCPUIcon.setAttribute('id', 'player-X-icon');
                player2Icon = document.getElementById('player-X-icon');
                player2Icon.style.cursor = 'pointer';
                player2Icon.src = player2.icon;
                player2Icon.style.pointerEvents = 'auto';     
                cpuGameDisplay();
                console.log(gameBoard.gameBoardArray);
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
                easyHard.style.opacity = '1';
                easyHard.style.pointerEvents = 'auto';
                easyHardButton.checked = false;
                cpuGameDisplay();
                console.log(gameBoard.gameBoardArray);
            }
        });
    }

    return {
        displayToDOM,
        cpuGameDisplay,
        addMark,
        stopCPUMarking,
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


