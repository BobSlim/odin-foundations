import { Gameboard } from "./battleship";
import vector from "./vector";

const Vector = vector()
const randomInt = (max) => {
    return Math.floor(Math.random()*max)
}

export const Player = () => {
    const board = Gameboard()
    /**
     * @type Player
     */
    let enemy
    const randomCoords = () => {
        return [randomInt(9), randomInt(9)]
    }

    const placeRemainingShips = () => {
        const remainingShips = board.ships.filter(x => !x.isPlaced)
        while(remainingShips.length > 0){
            const ship = remainingShips.shift()
            placeShipRandomly(ship)
        }
    }

    const placeShipRandomly = (ship) => {
        while (!ship.isPlaced){
            const coords = randomCoords()
            const randomDirection = Vector.directionArray[randomInt(3)]
            if(board.checkShipPlace(coords, randomDirection, ship.name)){
                board.placeShip(coords, randomDirection, ship.name)
            }
        }
    }

    const setEnemy = (enemyRef) => {
        enemy = enemyRef
        return enemy
    }

    const attackEnemy = (coords) => {
        if(!coords){coords = getRandomShot()}
        enemy.board.receiveAttack(coords)
    }

    const getRandomShot = () => {
        const openCells = enemy.board.getBoard().flat().filter(x => !x.hit)
        return openCells[randomInt(openCells.length - 1)].coords
    }

    return {
        board,
        placeRemainingShips,
        setEnemy,
        attackEnemy,
        }
}

export const Game = () => {
    const player1 = Player()
    const player2 = Player()
    const players = [player1, player2]
    player1.setEnemy(player2)
    player2.setEnemy(player1)
    const startGame = () => {
        for(let player of players){
            player.placeRemainingShips()
        }
    }
}