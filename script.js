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

        document.querySelector('.game').appendChild(board)
        // document.body.appendChild(board);

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

    const updateScores = () => {
        scores = document.querySelector('.scores')
        for (let i = 0; i < players.length; i++) {
            if (!document.querySelector(`#${players[i].name}`)) {
                let player = document.createElement('div')
                player.id = `${players[i].name}`
                player.textContent = `${players[i].name} - ${players[i].score}`
                scores.appendChild(player)

                // if want to split name and score:
                // let name = document.createElement('div')
                // name.textContent = `${players[i].name}`
                // let score = document.createElement('div')
                // score.textContent = `${players[i].score}`

                // player.appendChild(name)
                // player.appendChild(score)
                
            } else {
                document.querySelector(`#${players[i].name}`).textContent = `${players[i].name} - ${players[i].score}`
            }
        }
    }

    const reset = () => {
        document.querySelector('.board').remove()
        document.querySelector('.result').remove()
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
                playerOneTurn ? endGame(p1) : endGame(p2)
            }

            if (checkTie()) {
                endGame(false)
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

    const checkTie = () => {
        // if the number of marked slots = 9, then stop game
        if (array.filter(element => (element === '')).length === 0) {
            return true
        }
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
        // winner is object, false if no winner
        
        // remove event listeners from slots
        let slots = document.querySelectorAll('.slot')
        slots.forEach(slot => slot.removeEventListener('click', mark))

        let result = document.createElement('h2')
        result.classList.add('result')

        
        if (!winner) {
            result.textContent = 'Tie!'
        } else {
            document.querySelector('.scores p').classList.add('hidden')
            result.textContent = `Game over. The winner is ${winner.name}!`
            winner.score++;
            updateScores()
        }

        // display result on DOM
        document.querySelector('.game').appendChild(result)        

        // toggle elements
        document.querySelector('.turn').classList.add('hidden')
        document.querySelector('#rematch').classList.remove('hidden')
        document.querySelector('#new-game').classList.remove('hidden')
    }

    return {players}

})();