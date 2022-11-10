const Player = (name) => {
    let score = 0;
    return {name, score}
}

const game = (() => {
    var players = [];
    var playerOneTurn = true;
    var array = Array(9).fill('');
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
        e.preventDefault();
        const formData = new FormData(e.target)
        const formProps = Object.fromEntries(formData)
        document.querySelector('.player-form').reset()

        p1 = Player(formProps['player-one']);
        p2 = Player(formProps['player-two']);
        players.push(p1, p2)

        play()
    })

    const createBoard = () => {
        let board = document.createElement('div');
        board.classList.add('board');
        document.body.appendChild(board);

        document.querySelector('.turn').classList.remove('hidden')
        
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
        displayTurn()
    }

    const reset = () => {
        document.querySelector('.board').remove()
        document.querySelector('.winner').remove()
        document.querySelector('#rematch').classList.add('hidden')
        document.querySelector('#new-game').classList.add('hidden')
        array = Array(9).fill('')
    }

    const displayTurn = () => {
        let turn = document.querySelector('.turn')
        if (playerOneTurn) {
            turn.textContent = `It is ${p1.name}'s turn`
        } else {
            turn.textContent = `It is ${p2.name}'s turn`
        }
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
            displayTurn()
        }  

    }
    
    const play = () => {
        createBoard()
        displayTurn()
        let slots = document.querySelectorAll('.slot')
        slots.forEach(slot => slot.addEventListener('click', mark))
        document.querySelector('.player-form').classList.add('hidden')
    }

    document.querySelector("#rematch").addEventListener('click', () => {
        reset()
        play()
    })
    document.querySelector("#new-game").addEventListener('click', () => {
        reset()
        document.querySelector('.player-form').classList.remove('hidden')
        document.querySelector('#play').classList.remove('hidden')
    })


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

        // remove event listeners from slots
        let slots = document.querySelectorAll('.slot')
        slots.forEach(slot => slot.removeEventListener('click', mark))

        // display winner
        let result = document.createElement('h2')
        result.classList.add('winner')
        result.textContent = `Game over. The winner is ${winner.name}!`
        document.body.appendChild(result)
        
        // adds to player score
        winner.score++;
        // console.log(players)

        // toggle elements
        document.querySelector('.turn').classList.add('hidden')
        document.querySelector('#rematch').classList.remove('hidden')
        document.querySelector('#new-game').classList.remove('hidden')
    }

    return {players}

})();