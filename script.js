
const Player = (name, marker) => {

    return {name, marker};

}

    const playerOne = Player("Player One", "X");
    const playerTwo = Player("Player Two", "O");


// Gameboard
const gameBoard = (function() {

    let board = ['', '', '', '', '', '', '', '', ''];
    const winningCombination = [[0,1,2], [0,4,8], [0,3,6], [1,4,7], [2,4,6], [2,5,8], [3,4,5], [6,7,8]];
    //Caching DOM 
    return {board, winningCombination};

})();


const gamePlay = (function() {

    const gridParent = document.querySelector('.c-grid'); 
    const gridItems = Array.from(document.querySelectorAll('.c-grid__item'));
    const playerWinner = document.querySelector('h4');
    const modal = document.querySelector('.modal');
    const button = document.querySelector('button');
    let playerTurn = 0;

    function addMarker(e) {
        
        // playerOne turn
        if(playerTurn % 2 === 0) {

            e.target.textContent = playerOne.marker;
            gameBoard.board[e.target.id] = playerOne.marker;
            playerTurn++;
            if(checkWinner()) {

                modal.style.display = "flex";
                playerWinner.textContent = `${playerOne.name} Win!`;

            }    

            }
    
        // playerTwo turn
        else if(playerTurn % 2 !== 0) {

            e.target.textContent = playerTwo.marker;
            gameBoard.board[e.target.id] = playerTwo.marker;
            playerTurn++;

            if(checkWinner()) {

                modal.style.display = "flex";
                playerWinner.textContent = `${playerTwo.name} Win!`;
                
            }

        }

        // check if the game is draw
        if(playerTurn == 9 && !checkWinner()) {

            modal.style.display = "flex";
            playerWinner.textContent = `Tie Dye`;

        }

    }
    
    function render() {

    gridItems.forEach(item => {

        item.addEventListener('click', addMarker, { once: true});
        
    });

    }
    render();   


    function checkWinner() {

       for(const condition of gameBoard.winningCombination) {

            let [a, b, c] = condition;

            if(gameBoard.board[a] && (gameBoard.board[a] == gameBoard.board[b] && gameBoard.board[a] == gameBoard.board[c]))

            {

                return [a, b, c];

            }

        }
        
    }

    function restartGame() {

        button.addEventListener('click', function() {

            gameBoard.board = ['', '', '', '', '', '', '', '', ''];
            gridItems.forEach(gridItem => {

                gridItem.textContent = "";

            });

            modal.style.display = "none";
            playerTurn = 0;
            render();  
        });

    }
    restartGame();

})();


   
    
