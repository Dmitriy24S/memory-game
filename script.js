const gameBoard = document.getElementById('game-board')
const gameBoardTiles = []
// const numOfGameTiles = 12
const possibleTileValue = ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6']
const scoreElement = document.getElementById('score')
let score = 0
scoreElement.textContent = score
let selectedTiles = []
let allPlayableGameTiles = document.getElementsByClassName('game-tile')
// console.log('all game tiles', allGameTiles)
// HTMLCollection(9) [div.game-tile, div.game-tile, div.game-tile, div.game-tile, div.game-tile, div.game-tile, div.game-tile, div.game-tile, div.game-tile]
// {
//     "0": {},
//     "1": {},
//     "2": {},
//     "3": {},
//     "4": {},
//     "5": {},
//     "6": {},
//     "7": {},
//     "8": {}
// }
const resetBtn = document.getElementById('reset-btn')
resetBtn.addEventListener('click', resetGame)
let timeoutNoCardMatchResult
const resultText = document.querySelector('.result')

const createTiles = () => {
  for (let index = 0; index < possibleTileValue.length; index++) {
    const newGameTile = document.createElement('div')
    newGameTile.classList.add('game-tile')
    newGameTile.dataset.id = possibleTileValue[index]
    newGameTile.addEventListener('click', () => {
      paintTileOnClick(newGameTile)
    })
    gameBoardTiles.push(newGameTile)
  }
  // randomize Tiles/card positions
  gameBoardTiles.sort((a, b) => Math.random() - 0.5)
}

const createBoard = () => {
  gameBoardTiles.forEach((tile) => {
    gameBoard.append(tile)
  })
}

function paintTileOnClick(el) {
  // return if already active
  if (el.classList.contains('active')) return

  // select Tile -> css flip Tile class, show text/value // prevents 3rd click while 2 tiles already active (prevent spam click)
  if (selectedTiles.length < 2) {
    el.classList.toggle('active')
    el.textContent = el.dataset.id
    selectedTiles.push(el)

    // after selected 2 Tiles -> check them
    if (selectedTiles.length === 2) {
      checkTiles()
    }
  }
}

function checkTiles() {
  // if Tiles match
  if (selectedTiles[0].dataset.id === selectedTiles[1].dataset.id) {
    console.log('Tiles MATCH', selectedTiles)

    // add completed css style
    selectedTiles.forEach((Tile) => {
      Tile.classList.add('done')
    })

    // filter out played Tiles that matched
    allPlayableGameTiles = Array.from(allPlayableGameTiles).filter((item) => {
      return (
        item.dataset.id !== selectedTiles[0].dataset.id ||
        item.dataset.id !== selectedTiles[1].dataset.id
      )
    })

    // clear selected Tiles cache, update score
    selectedTiles = []
    score++
    scoreElement.textContent = score

    // if all Tiles are done -> game over (delay to flip last tile/card)
    if (allPlayableGameTiles.length === 0) {
      console.log('game over')
      setTimeout(() => {
        // alert('You win')
        resultText.textContent = 'You Won!'
      }, 800)
    }
  } else {
    // if Tiles not match
    console.log('no match', selectedTiles)
    // not match -> give time to flip 2nd Tile -> reset selected Tiles -> hide text context, remove css flip style (unflip Tile), update score

    // setTimeout(() => {
    //   Array.from(allGameTiles).forEach((tile) => {
    //   selectedTiles.forEach((tile) => {
    //     tile.textContent = ''
    //     tile.classList.remove('active')
    //   })
    //   selectedTiles = []
    //   score--
    //   scoreElement.textContent = score
    // }, 800)

    // fixed: bug: if selected 2 wrong Tiles + quickly select reset game -> score updates after timeout after already being reset to 0 -> to -1 score
    timeoutNoCardMatchResult = setTimeout(() => {
      //   Array.from(allGameTiles).forEach((tile) => {
      selectedTiles.forEach((tile) => {
        tile.textContent = ''
        tile.classList.remove('active')
      })
      selectedTiles = []
      score--
      scoreElement.textContent = score
    }, 800)
  }
}

const clearTimeoutNoCardMatchResult = () => {
  console.log(timeoutNoCardMatchResult)
  clearTimeout(timeoutNoCardMatchResult)
  console.log('clearing timeout NoCardMatchResult')
}

function resetGame() {
  console.log('reset game')
  // clear timeout/delay -> prevent score after reset from 0 to -1
  clearTimeoutNoCardMatchResult()
  // get all tiles (played and unplayed)
  let allGameTiles = document.getElementsByClassName('game-tile')
  // reset all tiles style (flip back) and hide text content
  Array.from(allGameTiles).forEach((tile) => {
    tile.textContent = ''
    tile.classList.remove('active')
    tile.classList.remove('done')
  })
  // clear cache of selected Tiles
  selectedTiles = []
  // new randomized order of already created/existing tiles array
  gameBoardTiles.sort((a, b) => Math.random() - 0.5)
  //  append new order of tiles to game board
  createBoard()
  // reset score
  score = 0
  scoreElement.textContent = score
  resultText.textContent = ''
}

// Initialize game on 1st load
createTiles()
createBoard()

//
//
//
//
//
//
//

// #######################
//        Game v2
// #######################

// Game board
const gameBoard2 = document.getElementById('game-board-two')
// Game score
let score2 = 0
const scoreElement2 = document.getElementById('score-two')
scoreElement2.textContent = score2
// Possibles tile values
const possibleTileValue2 = ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6']
possibleTileValue2.sort(() => 0.5 - Math.random())
// No tile match timeout (score, color change)
let timeoutNoCardMatchResult2
// Reset btn
const resetBtn2 = document.getElementById('reset-btn-two')
resetBtn2.addEventListener('click', resetGame2)
// Game result text
const resultText2 = document.querySelector('.result-two')

let selectedTiles2 = []
let selectedTilesId2 = [] // ! ?
let correctTiles = []

const createGameBoard2 = () => {
  for (let index = 0; index < possibleTileValue2.length; index++) {
    const tile = document.createElement('div')
    tile.dataset.id = index
    tile.classList.add('game-tile-two')
    tile.addEventListener('click', flipTile)
    gameBoard2.appendChild(tile)
  }
}

function flipTile() {
  //   console.log('start flip tile selectedTiles2', selectedTiles2)
  if (selectedTiles2.length === 2) return // prevents 3rd click while 2 tiles already active (prevent spam click)
  if (this.classList.contains('active-two')) return // if already active -> prevent click
  const cardId = this.dataset.id
  selectedTiles2.push(possibleTileValue2[cardId])
  selectedTilesId2.push(cardId) // ! ?
  this.textContent = possibleTileValue2[cardId] // show tile value from random sorted array
  this.classList.add('active-two')
  if (selectedTiles2.length === 2) {
    // setTimeout(checkForMatch, 500)
    timeoutNoCardMatchResult2 = setTimeout(checkForMatch, 500)
  }
}

function checkForMatch() {
  let gameTiles = document.querySelectorAll('.game-tile-two')
  console.log('possibleTileValue2 sorted?', possibleTileValue2, 'gameTiles', gameTiles)
  // possibleTileValue2 sorted? (12) ['2', '4', '1', '2', '1', '6', '5', '3', '6', '4', '3', '5']
  const optionOneId = selectedTilesId2[0]
  const optionTwoId = selectedTilesId2[1]
  // 1 option
  console.log('gameTiles[optionOneId]', optionOneId, gameTiles[optionOneId])
  console.log(
    'possibleTileValue2[optionOneId]',
    optionOneId,
    possibleTileValue2[optionOneId]
  )
  //  2 option
  console.log('gameTiles[optionTwoId]', optionTwoId, gameTiles[optionTwoId])
  console.log(
    'possibleTileValue2[optionTwoId]',
    optionTwoId,
    possibleTileValue2[optionTwoId]
  )
  //   possibleTileValue2 sorted? (12) ['3', '6', '3', '2', '4', '2', '5', '6', '5', '1', '1', '4']
  //   gameTiles[optionOneId]          3      <div class=​"game-tile" data-id=​"1">​</div>​ flex
  //   possibleTileValue2[optionOneId] 3 id?  2 -textcontet
  //   gameTiles[optionTwoId]          2      <div class=​"game-tile" data-id=​"2">​</div>​ flex
  //   possibleTileValue2[optionTwoId] 2 id?  3 -textcontet

  if (possibleTileValue2[optionOneId] === possibleTileValue2[optionTwoId]) {
    console.log('correct match')
    correctTiles.push(selectedTiles2)
    gameTiles[optionOneId].classList.add('done')
    gameTiles[optionTwoId].classList.add('done')
    score2++
    scoreElement2.textContent = score2
  } else {
    console.log('not match')
    // flip back / hide text content, --score
    gameTiles[optionOneId].textContent = ''
    gameTiles[optionTwoId].textContent = ''
    gameTiles[optionOneId].classList.remove('active-two')
    gameTiles[optionTwoId].classList.remove('active-two')
    score2--
    scoreElement2.textContent = score2
  }
  selectedTiles2 = []
  selectedTilesId2 = []

  // No more tiles -> game over
  if (correctTiles.length === possibleTileValue2.length / 2) {
    resultText2.textContent = 'Congratulations! You found them all!'
  }
}

function resetGame2() {
  console.log('reset game')
  // clear timeout/delay -> prevent score after reset from 0 to -1
  clearTimeoutNoCardMatchResult2()
  // reset all tiles style (flip back) and hide text content
  let gameTiles = document.querySelectorAll('.game-tile-two')
  gameTiles.forEach((tile) => {
    tile.textContent = ''
    tile.classList.remove('active-two')
    tile.classList.remove('done')
  })
  // clear cache of selected Tiles
  selectedTiles2 = []
  selectedTilesId2 = []
  correctTiles = []
  // new randomized order of already created/existing tiles array
  possibleTileValue2.sort(() => Math.random() - 0.5) // ! auto updates tiles? no need new createBoard() etc? -> (array in js updated -> tile value on tile get AFTER click from already newly sorted array)
  // reset score
  score2 = 0
  scoreElement2.textContent = score2
  resultText2.textContent = ''
}

// const clearTimeoutNoCardMatchResult2 = () => {
function clearTimeoutNoCardMatchResult2() {
  console.log(timeoutNoCardMatchResult2)
  clearTimeout(timeoutNoCardMatchResult2)
  console.log('clearing timeout NoCardMatchResult2')
}

// Start game v2 on 1st load
createGameBoard2()
