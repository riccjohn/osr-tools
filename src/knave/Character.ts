import { KnaveDescription, KnaveGear } from '@/knave'
import { Dice, Randomization } from '@/dice'

class Character {
  public armor: IArmor
  public copperPieces: number
  public gender: IGender
  public items: IGear[]
  public itemSlots: number
  public level: number
  public maxHp: number
  public traits: ITraits
  public weapon: IWeapon

  private abilities: IAbilities

  constructor() {
    this.abilities = {
      charisma: { bonus: 3, defense: 13 },
      constitution: { bonus: 3, defense: 13 },
      dexterity: { bonus: 3, defense: 13 },
      intelligence: { bonus: 3, defense: 13 },
      strength: { bonus: 3, defense: 13 },
      wisdom: { bonus: 3, defense: 13 },
    }

    this.armor = {
      count: 0,
      defense: 0,
      name: '',
      quality: 0,
      slots: 0,
      type: 'armor',
    }
    this.copperPieces = 0
    this.gender = 'non-binary'
    this.items = [{ name: '', count: 0, type: 'food', slots: 0 }]
    this.itemSlots = 0
    this.level = 0
    this.maxHp = 0
    this.traits = this.generateTraits()
    this.weapon = {
      count: 1,
      damage: 'd6',
      hand: 1,
      name: '',
      quality: 0,
      slots: 1,
      type: 'weapon',
    }
  }

  public generate = (): void => {
    this.level = 1
    this.abilities = this.generateAbilities()
    this.copperPieces = this.rollForCopperPieces()
    this.gender = this.randomGender()
    this.itemSlots = this.constitution.defense
    this.maxHp = this.rollHitPoints()

    const gear = new KnaveGear(this.itemSlots)

    this.items = gear.items
    this.armor = gear.armor
    this.weapon = gear.weapon
  }

  public get abilityScores() {
    return this.abilities
  }

  public get charisma() {
    return this.abilities.charisma
  }

  public get constitution() {
    return this.abilities.constitution
  }

  public get dexterity() {
    return this.abilities.dexterity
  }

  public get intelligence() {
    return this.abilities.intelligence
  }

  public get strength() {
    return this.abilities.strength
  }

  public get wisdom() {
    return this.abilities.wisdom
  }

  // END PUBLIC METHODS

  private rollForCopperPieces = () => {
    return Dice.roll(6, 3) + 20
  }

  private rollHitPoints = () => {
    return Dice.roll(8)
  }

  private generateAbilities = (): IAbilities => {
    const [charisma, constitution, dexterity, intelligence, strength, wisdom] =
      Array(6).fill(undefined).map(this.rollAbilityScore)

    const abilities = {
      charisma: { bonus: charisma, defense: charisma + 10 },
      constitution: { bonus: constitution, defense: constitution + 10 },
      dexterity: { bonus: dexterity, defense: dexterity + 10 },
      intelligence: { bonus: intelligence, defense: intelligence + 10 },
      strength: { bonus: strength, defense: strength + 10 },
      wisdom: { bonus: wisdom, defense: wisdom + 10 },
    }

    return abilities
  }

  private rollAbilityScore = (): number => {
    const rolls = new Array(3).fill(undefined).map(() => Dice.roll(6))
    return Math.min(...rolls)
  }

  private randomGender = (): IGender => {
    const genders: IGender[] = [
      'cis-male',
      'cis-female',
      'non-binary',
      'transgender',
      'two-spirit',
      'genderqueer',
      'gender-fluid',
      'gender-neutral',
    ]

    return Randomization.getRandomItem(genders)
  }

  private generateTraits = (): ITraits => {
    return new KnaveDescription().traits
  }
}

export default Character
