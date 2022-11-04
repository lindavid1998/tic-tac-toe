const Player = (name) => {
    return {name}
}

const board = (() => {
    var array = Array(9).fill(' ');
    var playerOne = 'X';
    var playerTwo = 'O';

    const createBoard = () => {
        let board = document.createElement('div');
        board.classList.add('board');
        document.body.appendChild(board);
        slotNum = 1;

        for (let i = 0; i < 3; i++) {
            let row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j < 3; j++) {
                let slot = document.createElement('div')
                slot.setAttribute('id',String(slotNum))
                row.appendChild(slot)
                slotNum++;
            }
            board.appendChild(row)
        }
    }

    const reset = () => {
        array = Array(9).fill(' ')
        createBoard()
    }

    const mark = (id, symbol) => {
        // TO DO 
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

    return {createBoard, reset}

})();

board.createBoard()