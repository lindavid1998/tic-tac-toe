const Player = (name) => {
    let score = 0;
    return {name, score}
}

const board = (() => {
    var array = Array(9).fill('');
    var playerOneTurn = true;
    var winningCombinations = [
        [0, 1, 2],
        [0, 3, 6],
        [2, 5, 8],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [3, 4, 5],
        [1, 4, 7]
    ];

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
                slot.classList.add('slot')
                row.appendChild(slot)
                slotNum++;
            }
            board.appendChild(row)
        }
    }

    const reset = () => {
        document.querySelector('.board').remove()
        array = Array(9).fill('')
        createBoard()
    }

    const markBoard = (e) => {
        // TO DO 
        if (playerOneTurn) {
            symbol = 'X'
        } else {
            symbol = 'O'
        }

        if (e.target.textContent === '') {
            e.target.textContent = symbol 
            array[e.target.getAttribute('id') - 1] = symbol
            playerOneTurn = !playerOneTurn
        }

        console.log(symbol)
        console.log(checkWin(symbol))

        if (checkWin(symbol)) {
            console.log(`${symbol} is the winner`)
            // terminate game
            endGame()
        }
        
    }

    const play = () => {
        createBoard()
        let slots = document.querySelectorAll('.slot')
        slots.forEach(slot => slot.addEventListener('click', markBoard))
    }

    const convertArrToIndices = (symbol) => {
        output = []
        for (let i = 0; i < array.length; i++) {
            if (array[i] === symbol) output.push(i)
        }
        return output
    }

    const checkWin = (symbol) => {
        // TO DO

        if (array.filter(element => (element === '')).length > 4) {
            return false
        }

        var indices = convertArrToIndices(symbol)

        for (let i = 0; i < winningCombinations.length; i++) {
            count = 0;
            for (let j = 0; j < winningCombinations[i].length; j++) {
                if (indices.includes(winningCombinations[i][j])) {
                    count++
                }
            }
            if (count === 3) return true
        }
        return false
    }

    const endGame = () => {
        // TO DO
        // removes event listeners from slots
        let slots = document.querySelectorAll('.slot')
        slots.forEach(slot => slot.removeEventListener('click', markBoard))
        console.log('game over!')

        // adds to player score
        
    }

    return {play, reset}

})();

board.play()