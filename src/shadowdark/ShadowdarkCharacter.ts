import { Dice } from '@/dice'
import { expandObjectKeys } from '@/helpers'
import { abilityModifiers } from './data'

class ShadowdarkCharacter {
  private abilities: IShadowdarkAbilities = {
    strength: { score: 10, modifier: 0 },
    dexterity: { score: 10, modifier: 0 },
    constitution: { score: 10, modifier: 0 },
    intelligence: { score: 10, modifier: 0 },
    wisdom: { score: 10, modifier: 0 },
    charisma: { score: 10, modifier: 0 },
  }

  constructor() {}

  public generate = () => {
    this.abilities = this.generateAbilityScores()
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

  private generateAbilityScores = () => {
    const abilityScoreRolls = this.rollAbilityScores()

    const abilityModifiersMap = expandObjectKeys(abilityModifiers)

    const abilitiesWithModifiers = abilityScoreRolls.map( abilityScore => {
      const modifier = abilityModifiersMap[abilityScore.toString()]

      return {
        score: abilityScore,
        modifier,
      }
    })

    const [
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    ] = abilitiesWithModifiers;


    return {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    }
  }

  private rollAbilityScores = (): number[] => {
    const scores = Array(6)
      .fill(undefined)
      .map(() => Dice.roll(6, 3))

    if (!scores.some(score => score >= 14)) {
      return this.rollAbilityScores()
    }

    return scores
  }
  
}

export default ShadowdarkCharacter
