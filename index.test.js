import { Ship, Gameboard } from './src'
const ship2 = new Ship('test', 2)
const gameboard = new Gameboard()

it('hit the ship add ', () => {
  ship2.hit()
  expect(ship2.timeHit).toBe(1)
})

it('sunk the ship if it all been hit', () => {
  ship2.hit()
  ship2.hit()
  expect(ship2.sunk).toBe(true)
})
it('sunk the ship if it all been hit', () => {
  ship2.hit()
  ship2.hit()
  expect(ship2.sunk).toBe(true)
})
it('GameBoard shold have tow dimensional array size 10*10', () => {
  gameboard.initialize()
  expect(gameboard.gameArray).toStrictEqual(
    Array(10).fill(Array(10).fill(undefined))
  )
})

describe('GameBoard.placeShip shold place the ship in the correct cordinations', () => {
  beforeEach(() => {
    gameboard.initialize()
  })
  it('GameBoard.placeShip shold place the ship in the correct cordinations', () => {
    gameboard.placeShip(gameboard.shipList[4], [0, 1], 'h')
    expect(gameboard.gameArray[0][1].name).toBe('Cruiser')
  })
  it('GameBoard.placeShip shold place the ship in the correct cordinations start', () => {
    gameboard.placeShip(gameboard.shipList[4], [1, 1], 'h')
    expect(gameboard.gameArray[1][1].name).toBe('Cruiser')
  })
  it('GameBoard.placeShip shold place the ship in the correct cordinations end', () => {
    gameboard.placeShip(gameboard.shipList[4], [1, 1], 'h')
    expect(gameboard.gameArray[1][2].name).toBe('Cruiser')
  })
  it('GameBoard.placeShip shold place the ship in the correct cordinations random between start and end', () => {
    gameboard.placeShip(gameboard.shipList[2], [1, 1], 'h')
    expect(gameboard.gameArray[1][3].name).toBe('Aircraft-Carrier')
  })
  it('GameBoard.placeShip shold place the ship in the correct cordinations random between start and end vertical', () => {
    gameboard.placeShip(gameboard.shipList[2], [1, 1])
    expect(gameboard.gameArray[3][1].name).toBe('Aircraft-Carrier')
  })
  it('GameBoard.placeShip shold place the ship in the correct cordinations random between start and end vertical', () => {
    gameboard.placeShip(gameboard.shipList[2], [1, 1])
    expect(gameboard.gameArray[5][1].name).toBe('Aircraft-Carrier')
  })
  it('return error message if try to but in an ocupoed space', () => {
    gameboard.placeShip(gameboard.shipList[2], [1, 1])
    gameboard.placeShip(gameboard.shipList[3], [2, 1])
    expect(gameboard.placeShip(gameboard.shipList[3], [2, 1])).toBe(
      'error message'
    )
  })
  it('return error message if try to but in an ocupoed space', () => {
    gameboard.placeShip(gameboard.shipList[2], [1, 1], 'h')
    gameboard.placeShip(gameboard.shipList[3], [2, 1], 'h')
    expect(gameboard.placeShip(gameboard.shipList[3], [2, 1])).toBe(
      'error message'
    )
  })
  it('return error message if try to but in a place that doesn,t fit horizental', () => {
    gameboard.initialize()

    expect(gameboard.placeShip(gameboard.shipList[3], [9, 1], 'h')).toBe(
      'error message'
    )
  })
  it('return error message if try to but in a place that doesn,t fit vertical', () => {
    gameboard.initialize()
    expect(gameboard.placeShip(gameboard.shipList[3], [1, 9])).toBe(
      'error message'
    )
  })
})
describe('test the receiveAttake fn', () => {
  beforeEach(() => {
    gameboard.initialize()
  })
  it('hit the ship tow times', () => {
    gameboard.placeShip(gameboard.shipList[2], [1, 1])
    gameboard.receiveAttack(1, 1)
    gameboard.receiveAttack(2, 1)
    const shipOject = gameboard.gameArray[2][1]
    expect(shipOject.hitPlaces).toEqual([
      [1, 1],
      [2, 1],
    ])
  })
  it('hit the ship', () => {
    gameboard.placeShip(gameboard.shipList[2], [1, 1])
    gameboard.receiveAttack(0, 0)
    expect(() => gameboard.receiveAttack(0, 0)).toThrow(Error)
  })
  it('hit the ship already hitted', () => {
    gameboard.placeShip(gameboard.shipList[2], [1, 1])
    gameboard.receiveAttack(1, 1)
    expect(() => gameboard.receiveAttack(1, 1)).toThrow(Error)
  })

  it('hit the ship', () => {
    gameboard.placeShip(gameboard.shipList[2], [1, 1])
    gameboard.receiveAttack(1, 1)

    expect(gameboard.gameArray[1][1]).toBe(gameboard.shipList[2])
  })
})
