class Character {
  public level
  public maxHp

  constructor() {
    this.level = 1
    this.maxHp = 0
  }

  public generate() {
    this.level = 1
    this.maxHp = 5
  }
}

export default Character
