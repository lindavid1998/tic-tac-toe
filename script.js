const Player = (name) => {
    return {name}
}

const board = () => {
    var array = Array(9).fill(' ');
    var playerOne = 'X';
    var playerTwo = 'O';

    const displayBoard = (array) => {
        // TO DO
    }

    const reset = () => {
        array = Array(9).fill(' ')
    }

    const mark = (id, symbol) => {
        if (array[id] !== ' ') {
            array[id] = symbol // Update array
            updateBoard(id) // Update board display
        }
    }

    const updateBoard = (id) => {
        // TO DO
    }

    const checkWin = () => {
        // TO DO
    }

    const play = () => {
        // TO DO
    }

}