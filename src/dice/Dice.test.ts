import Dice from './Dice'

describe('Dice', () => {
  describe('roll', () => {
    test('generates a number between 1 and the die size', () => {
      const rolls = new Array(20).fill(undefined).map(() => Dice.roll(20))
      expect(rolls.every(roll => roll > 0 && roll <= 20)).toBeTruthy()
    })

    test('will roll a single die', () => {
      const roll = Dice.roll(20, 1)
      expect(roll).toBeGreaterThan(0)
      expect(roll).toBeLessThanOrEqual(20)
    })

    test('will roll and add multiple dice', () => {
      const rolls = Dice.roll(20, 21)
      expect(rolls).toBeGreaterThan(20)
      expect(rolls).toBeLessThanOrEqual(420)
    })
  })
})
