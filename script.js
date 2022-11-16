const Player = (name) => {
    let score = 0;
    return {name, score}
}

const display = (() => {
    const createBoard = () => {
        let board = document.createElement('div');
        board.classList.add('board');

        let endGameButtons = document.querySelector('.end-game-buttons')
        document.querySelector('.game').insertBefore(board, endGameButtons)

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
        showTurn()
    }

    const showTurn = () => {        
        let str = `It is player's turn (sym)`

        let player = document.createElement('span')
        player.style.color = game.getColor();
        // playerOneTurn ? player.textContent = `${p1.name}` : player.textContent = `${p2.name}`
        player.textContent = game.getCurrentPlayer().name;
        str = str.replace('player', player.outerHTML)

        let marker = document.createElement('span')
        marker.style.color = game.getColor();
        marker.textContent = game.getSymbol()
        str = str.replace('sym', marker.outerHTML)

        document.querySelector('.turn').innerHTML = str
    }

    const updateScoreboard = () => {
        let players = game.getPlayers()
        scores = document.querySelector('.scores')
        for (let i = 0; i < players.length; i++) {
            if (!document.querySelector(`#${players[i].name}`)) {
                let player = document.createElement('div')
                player.id = `${players[i].name}`
                player.textContent = `${players[i].name} - ${players[i].score}`
                scores.appendChild(player)         
            } else {
                document.querySelector(`#${players[i].name}`).textContent = `${players[i].name} - ${players[i].score}`
            }
        }
    }

    const mark = (e) => {
        if (e.target.textContent === '') {
            let symbol = game.getSymbol();
            e.target.textContent = symbol; 
            e.target.style.color = game.getColor();
            game.updateArray(e.target.getAttribute('id') - 1, symbol)
            
            if (game.checkWin(symbol)) {
                game.endGame(game.getCurrentPlayer())
            } else if (game.checkTie()) {
                game.endGame(false)
            }

            game.switchTurns()
            showTurn()
        }  
    }

    const showWinningCombo = () => {
        winningCombo = game.getWinningCombo();
        for (let i = 0; i < winningCombo.length; i++) {
            document.getElementById(`${winningCombo[i] + 1}`).style.color = "rgb(93 255 95)";
        }
    }

    return {
        createBoard,
        updateScoreboard,
        showTurn,
        showWinningCombo,
        mark
    }

})();

const game = (() => {
    var players = [];
    var playerOneTurn = true;
    var array = Array(9).fill('');
    var p1;
    var p2;
    var winningCombo = [];

    const getColor = () => {
        return playerOneTurn ? '#f2be8d' : '#ba6c65'
    }

    const getSymbol = () => {
        return playerOneTurn ? 'X' : 'O'
    }

    const getCurrentPlayer = () => {
        return playerOneTurn ? p1 : p2
    }

    const getPlayers = () => {
        return players
    }

    const getWinningCombo = () => {
        return winningCombo
    }

    const switchTurns = () => {
        playerOneTurn = !playerOneTurn
    }

    const isPlayerOneTurn = () => {
        return playerOneTurn
    }

    const updateArray = (index, symbol) => {
        array[index] = symbol;
    }

    const play = () => {
        display.createBoard()
        display.showTurn()
        let slots = document.querySelectorAll('.slot')
        slots.forEach(slot => slot.addEventListener('click', display.mark))
        document.querySelector('.player-form').classList.add('hidden')
    }

    const reset = () => {
        document.querySelector('.board').remove()
        document.querySelector('.result').textContent = ''
        document.querySelector('#rematch').classList.add('hidden')
        document.querySelector('#new-game').classList.add('hidden')
        array = Array(9).fill('')
    }

    const convertArrToIndices = (symbol) => {
        output = []
        for (let i = 0; i < array.length; i++) {
            if (array[i] === symbol) output.push(i)
        }
        return output
    }

    const checkTie = () => {
        if (array.filter(element => (element === '')).length === 0) {
            return true
        }
    }

    const checkWin = (symbol) => {
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

        if (array.filter(element => (element === '')).length > 4) {
            return false
        }

        var indices = convertArrToIndices(symbol)
        for (let i = 0; i < winningCombinations.length; i++) {
            count = 0;
            for (let j = 0; j < winningCombinations[i].length; j++) {
                if (indices.includes(winningCombinations[i][j])) {
                    winningCombo.push(winningCombinations[i][j])
                    count++
                }
            }
            if (count === 3) return true
            winningCombo = []
        }
        return false
    }

    const endGame = (winner) => {
        let slots = document.querySelectorAll('.slot')
        slots.forEach(slot => slot.removeEventListener('click', display.mark))

        result = document.querySelector('.result')
        if (!winner) {
            result.textContent = `Game over. It's a tie!`
        } else {
            document.querySelector('.scores p').classList.add('hidden')
            result.textContent = `Game over. The winner is ${winner.name}!`
            winner.score++;
            display.updateScoreboard()
            display.showWinningCombo()
        }

        document.querySelector('.turn').classList.add('hidden')
        document.querySelector('#rematch').classList.remove('hidden')
        document.querySelector('#new-game').classList.remove('hidden')
    }

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
    
    document.querySelector("#rematch").addEventListener('click', () => {
        reset()
        play()
    })

    document.querySelector("#new-game").addEventListener('click', () => {
        reset()
        document.querySelector('.player-form').classList.remove('hidden')
        document.querySelector('#play').classList.remove('hidden')
    })

    return {
        getPlayers,
        getColor,
        getSymbol,
        getCurrentPlayer,
        getWinningCombo,
        switchTurns,
        checkWin,
        checkTie,
        updateArray,
        endGame,
        isPlayerOneTurn
    }

})();