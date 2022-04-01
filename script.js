

const gameBoard = (() => {
    let gameboardArray = [];
    const inputMove = (marker, space) => {
        gameboardArray[space] = marker;
        console.log(gameboardArray);
    };

    return {
        inputMove
    };
})();

gameBoard.inputMove('X', 5);

const gameFlow = (() => {
    
})();

const Player = (name) => {
    const printName = () => {
        console.log(`Your marker is ${name}`);
    };
    
    return {
        printName
    };
};

const jBone = Player('jBone');
jBone.printName();

