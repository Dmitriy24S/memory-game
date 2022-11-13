const gameBoard = document.getElementById('game-board')
const numOfGameTiles = 12
const gameBoardTiles = []
const options = ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6']
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

const createTiles = () => {
  for (let index = 0; index < numOfGameTiles; index++) {
    const newGameTile = document.createElement('div')
    newGameTile.classList.add('game-tile')
    newGameTile.dataset.id = options[index]
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

  // select Tile -> css flip Tile class, show text/value
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
    console.log('TileS MATCH')

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

    // if all Tiles are done -> game over
    if (allPlayableGameTiles.length === 0) {
      setTimeout(() => {
        alert('You win')
      }, 800)
    }
  } else {
    // if Tiles not match
    console.log('no match', selectedTiles)
    // not match -> give time to flip 2nd Tile -> reset selected Tiles -> hide text context, remove css flip style (unflip Tile), update score

    setTimeout(() => {
      //   Array.from(allGameTiles).forEach((tile) => {
      selectedTiles.forEach((tile) => {
        tile.textContent = ''
        tile.classList.remove('active')
      })
      selectedTiles = []
      score--
      scoreElement.textContent = score
    }, 800)
    // TODO: bug: if selected 2 wrong Tiles + quickly select reset game -> score updates after timeout after already being reset to 0 -> to -1 score
  }
}

function resetGame() {
  console.log('reset game')
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
}

// Initialize game on 1st load
createTiles()
createBoard()
