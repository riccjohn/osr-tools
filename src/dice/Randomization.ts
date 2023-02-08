class Randomization {
  public static getRandomItem = <T>(list: T[]): T => {
    const length = list.length
    const randomIndex = Math.floor(Math.random() * length)
    return list[randomIndex]
  }
}

export default Randomization
