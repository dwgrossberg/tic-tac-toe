

const Gameboard = (() => {
    let gameboardArray = [];
    const inputMove = (marker, space) => {
        gameboardArray[space] = marker;
        console.log(gameboardArray);
    };

    return {
        inputMove
    };
})();

Gameboard.inputMove('X', 5);