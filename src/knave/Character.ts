import { KnaveDescription, KnaveGear } from '@/knave'
import { Dice } from '@/dice'

class Character {
  public armor: IArmor = {
    count: 0,
    defense: 0,
    name: '',
    quality: 0,
    slots: 0,
    type: 'armor',
  }
  public copperPieces: number = 0
  public items: IGear[] = [{ name: '', count: 0, type: 'food', slots: 0 }]
  public itemSlots: number = 13
  public level: number = 1
  public maxHp: number = 4
  public traits: ITraits = {
    physique: '',
    face: '',
    skin: '',
    hair: '',
    clothing: '',
    virtue: '',
    vice: '',
    speech: '',
    background: '',
    misfortune: '',
  }
  public weapon: IWeapon = {
    count: 1,
    damage: 'd6',
    hand: 1,
    name: '',
    quality: 0,
    slots: 1,
    type: 'weapon',
  }

  private abilities: IAbilities = {
    charisma: { bonus: 3, defense: 13 },
    constitution: { bonus: 3, defense: 13 },
    dexterity: { bonus: 3, defense: 13 },
    intelligence: { bonus: 3, defense: 13 },
    strength: { bonus: 3, defense: 13 },
    wisdom: { bonus: 3, defense: 13 },
  }

  constructor() {}

  public generate = (): void => {
    this.level = 1
    this.abilities = this.generateAbilities()
    this.copperPieces = this.rollForCopperPieces()
    this.itemSlots = this.constitution.defense
    this.maxHp = this.rollHitPoints()

    const gear = new KnaveGear(this.itemSlots)

    this.traits = this.generateTraits()
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

  private generateTraits = (): ITraits => {
    return new KnaveDescription().traits
  }
}

export default Character
