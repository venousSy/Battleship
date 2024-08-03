class Ship {
  constructor(name, lenght) {
    this.lenght = lenght
    this.timeHit = 0
    this.sunk = false
    this.name = name
    this.hitPlaces = []
  }
  hit(r, c) {
    this.timeHit += 1
    this.addHit(r, c)
    this.isSunk()
  }
  isSunk() {
    if (this.lenght == this.timeHit) {
      this.sunk = true
    }
  }
  addHit(r, c) {
    const hitCordinate = [r, c]

    this.hitPlaces.push(hitCordinate)
  }
}
class Gameboard {
  constructor() {
    this.gameArray = null
    this.shipList = []
  }

  initializeBlankGameBoard() {
    this.gameArray = [
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
    ]
  }
  fillShipList() {
    this.shipList.push(new Ship('Destroyer', 3))
    this.shipList.push(new Ship('Battleship', 4))
    this.shipList.push(new Ship('Aircraft-Carrier', 5))
    this.shipList.push(new Ship('Submarine', 3))
    this.shipList.push(new Ship('Cruiser', 2))
  }
  initialize() {
    this.fillShipList()
    this.initializeBlankGameBoard()
  }
  placeShip(ship, start, diraction) {
    let horizental
    diraction == 'h' ? (horizental = true) : (horizental = false)
    if (horizental == true) {
      // check if there is enough space
      if (10 - ship.lenght < start[0]) {
        return 'error message'
      }
      // check if the place already ocupied
      for (let i = 0; i < ship.lenght; i++) {
        if (this.gameArray[start[0]][start[1] + i]) {
          console.log('error')
          return 'error message'
        }
      }
      for (let i = 0; i < ship.lenght; i++) {
        this.gameArray[start[0]][start[1] + i] = ship
      }
    } else {
      // check if there is enough space
      if (10 - ship.lenght < start[1]) {
        return 'error message'
      }
      // check if the place already ocupied
      for (let i = 0; i < ship.lenght; i++) {
        if (this.gameArray[start[0] + i][start[1]]) {
          return 'error message'
        }
      }
      for (let i = 0; i < ship.lenght; i++) {
        this.gameArray[start[0] + i][start[1]] = ship
      }
    }
  }
  receiveAttack(y, x) {
    const hitCordinates = this.gameArray[y][x]
    if (hitCordinates == undefined) {
      this.gameArray[y][x] = 'x'
    } else if (hitCordinates == 'x') {
      throw new Error('wrong entry place')
    } else {
      hitCordinates.hit(y, x)
      console.log(hitCordinates)
    }
  }
}

export { Ship, Gameboard }
