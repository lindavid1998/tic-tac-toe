const Player = (name) => {
    let score = 0;
    return {name, score}
}

const game = (() => {
    var players = [];
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
    var p1;
    var p2;

    document.querySelector('.player-form').addEventListener('submit', (e) => {
        // Add players to game
        e.preventDefault();
        const formData = new FormData(e.target)
        const formProps = Object.fromEntries(formData)

        p1 = Player(formProps['player-one']);
        p2 = Player(formProps['player-two']);
        players.push(p1, p2)

        document.querySelector('.player-form').reset()

        // Start game
        play()
    })

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
        // createBoard()
    }

    const mark = (e) => {
        playerOneTurn ? symbol = 'X' : symbol = 'O'

        if (e.target.textContent === '') {
            e.target.textContent = symbol 
            array[e.target.getAttribute('id') - 1] = symbol

            if (checkWin(symbol)) {
                // console.log(`${symbol} is the winner`)
                playerOneTurn ? endGame(p1) : endGame(p2)
            }
            playerOneTurn = !playerOneTurn
        }  
    }
    
    const play = () => {
        createBoard()
        let slots = document.querySelectorAll('.slot')
        slots.forEach(slot => slot.addEventListener('click', mark))
    }

    const convertArrToIndices = (symbol) => {
        output = []
        for (let i = 0; i < array.length; i++) {
            if (array[i] === symbol) output.push(i)
        }
        return output
    }

    const checkWin = (symbol) => {
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

    const endGame = (winner) => {
        // TO DO
        // winner -> Player object

        // TO DO - remove event listeners from slots
        let slots = document.querySelectorAll('.slot')
        slots.forEach(slot => slot.removeEventListener('click', mark))

        // display winner
        let result = document.createElement('h2')
        result.textContent = `Game over. The winner is ${winner.name}!`
        document.body.appendChild(result)

        // adds to player score
        winner.score++;

        // add button to rematch
        let resetButton = document.createElement('button')
        resetButton.textContent = 'Rematch!'
        resetButton.addEventListener('click', reset)
        document.querySelector("#buttons").appendChild(resetButton)

        // add button to start a new game
        let newGameButton = document.createElement('button')
        newGameButton.textContent = 'New Game'
        document.querySelector("#buttons").appendChild(newGameButton)
    }

    return {players}

})();