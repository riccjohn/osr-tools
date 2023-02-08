class Dice {
  public static roll = (dieSize: number, numberOfDice: number = 1): number => {
    const rolls = new Array(numberOfDice)
      .fill(undefined)
      .map(() => Dice.randomNumber(dieSize))

    return rolls.reduce((acc, curr) => acc + curr, 0)
  }

  private static randomNumber = (max: number): number => {
    return Math.floor(Math.random() * max + 1)
  }
}

export default Dice
